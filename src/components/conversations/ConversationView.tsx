
import { useRef, useEffect, useState } from "react";
import { PaperclipIcon, SmileIcon, Send, Mic, Image, File, Paperclip, StopCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Contact, Message } from "@/types/conversations";
import { getChannelIcon } from "@/lib/conversationUtils";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { QuickReplies } from "@/data/quickReplies";

interface ConversationViewProps {
  contact?: Contact;
  messages: Message[];
  onSendMessage: (text: string) => void;
}

const ConversationView = ({ contact, messages, onSendMessage }: ConversationViewProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  
  // References for audio recording
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      if (recordingTimerRef.current) {
        window.clearInterval(recordingTimerRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleQuickReply = (replyText: string) => {
    setMessageText(replyText);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        
        // Close all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
        
        toast({
          title: t('conversation.audioRecorded'),
          description: t('conversation.audioReadyToSend')
        });
      };
      
      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      
      // Start recording timer
      let seconds = 0;
      recordingTimerRef.current = window.setInterval(() => {
        seconds += 1;
        setRecordingTime(seconds);
      }, 1000);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: t('conversation.microphoneError'),
        description: t('conversation.microphonePermissionDenied'),
        variant: "destructive"
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }
  };
  
  const cancelRecording = () => {
    stopRecording();
    setAudioURL(null);
    setRecordingTime(0);
    toast({
      title: t('conversation.recordingCancelled'),
      description: t('conversation.audioDiscarded')
    });
  };
  
  const sendAudioMessage = () => {
    if (audioURL) {
      // Here you would normally upload the audio file and then send a message with the audio URL
      // For this example, we'll just send a placeholder message
      onSendMessage(t('conversation.audioMessage'));
      setAudioURL(null);
      setRecordingTime(0);
      toast({
        title: t('conversation.audioSent'),
        description: t('conversation.audioMessageSent')
      });
    }
  };

  if (!contact) return <div className="h-full flex items-center justify-center">{t('conversation.noConversationFound')}</div>;

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center px-4 py-3 border-b border-border bg-card">
        <Avatar className="h-10 w-10">
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback>{contact.name[0]}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <div className="flex items-center gap-2">
            <p className="font-medium">{contact.name}</p>
            <div className="text-muted-foreground">
              {getChannelIcon(contact.channel, { size: 16 })}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {contact.phone || contact.email || t('conversation.online')}
          </p>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-muted/30">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.sender === "me"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card"
                }`}
              >
                <p>{message.text}</p>
                <div 
                  className={`text-xs mt-1 flex justify-end ${
                    message.sender === "me"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="border-t border-border p-3 bg-card">
        {audioURL ? (
          <div className="flex items-center gap-2 mb-3">
            <audio src={audioURL} controls className="h-10 flex-1" />
            <Button size="sm" variant="outline" onClick={() => setAudioURL(null)}>
              {t('conversation.cancel')}
            </Button>
            <Button size="sm" onClick={sendAudioMessage}>
              {t('conversation.send')}
            </Button>
          </div>
        ) : null}
        
        {isRecording ? (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 flex items-center gap-2">
              <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
              <span>{t('conversation.recording')}: {formatRecordingTime(recordingTime)}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={cancelRecording}
            >
              {t('conversation.cancel')}
            </Button>
            <Button 
              size="icon" 
              variant="destructive" 
              onClick={stopRecording}
            >
              <StopCircle className="h-5 w-5" />
            </Button>
          </div>
        ) : null}
        
        <div className="flex items-end gap-2">
          {/* Attachment dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <PaperclipIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start">
              <DropdownMenuItem>
                <Image className="h-4 w-4 mr-2" />
                <span>{t('conversation.image')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <File className="h-4 w-4 mr-2" />
                <span>{t('conversation.document')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Quick replies popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <SmileIcon className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" align="start" className="w-72">
              <div className="space-y-2">
                <h4 className="font-medium">{t('conversation.quickReplies')}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {QuickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto py-2 px-3 justify-start font-normal text-sm"
                      onClick={() => handleQuickReply(reply.text)}
                    >
                      {reply.label}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Text input */}
          <Textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('conversation.typeMessage')}
            className="min-h-[40px] resize-none flex-1"
            rows={1}
            disabled={isRecording}
          />
          
          <Button 
            onClick={isRecording ? stopRecording : messageText.trim() ? handleSendMessage : startRecording} 
            disabled={isRecording && messageText.trim().length > 0}
            size="icon" 
            className="rounded-full"
          >
            {messageText.trim() ? <Send className="h-5 w-5" /> : isRecording ? <StopCircle className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationView;
