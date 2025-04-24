
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  Reply,
  ReplyAll,
  Forward,
  Trash2,
  Star,
  StarOff,
  Paperclip,
  Download,
  AlertTriangle,
  Tag
} from "lucide-react";
import { mockEmails } from "@/data/emails";
import { mockLabels } from "@/data/labels";
import { formatEmailDate } from "@/utils/emailUtils";
import type { Email } from "@/types/email";
import { useTranslation } from "react-i18next";

export function EmailDetail() {
  const { emailId } = useParams<{ emailId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [email, setEmail] = useState<Email | undefined>(
    mockEmails.find((e) => e.id === emailId)
  );
  
  useEffect(() => {
    if (!email) {
      toast({
        variant: "destructive",
        title: t("conversation.noConversationFound"),
        description: "El correo solicitado no existe o ha sido eliminado."
      });
      navigate("/emails/inbox");
    }
  }, [email, navigate, t]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleReply = () => {
    navigate(`/emails/reply/${emailId}`);
  };
  
  const handleReplyAll = () => {
    navigate(`/emails/reply/${emailId}?all=true`);
  };
  
  const handleForward = () => {
    navigate(`/emails/forward/${emailId}`);
  };
  
  const handleDelete = () => {
    toast({
      title: "Correo eliminado",
      description: "El correo ha sido movido a la papelera."
    });
    navigate(-1);
  };
  
  const handleToggleStar = () => {
    if (!email) return;
    
    // In a real app, we would update the server here
    setEmail({
      ...email,
      isStarred: !email.isStarred
    });
    
    toast({
      title: email.isStarred ? "Removed from starred" : "Added to starred",
      description: `"${email.subject}" ${email.isStarred ? "removed from" : "added to"} starred emails.`
    });
  };
  
  if (!email) {
    return null;
  }
  
  // Function to get email recipients for display
  const getRecipients = () => {
    let recipients = email.to.join(", ");
    
    if (email.cc && email.cc.length > 0) {
      recipients += `, CC: ${email.cc.join(", ")}`;
    }
    
    if (email.bcc && email.bcc.length > 0) {
      recipients += `, BCC: ${email.bcc.join(", ")}`;
    }
    
    return recipients;
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" onClick={handleGoBack}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Volver
        </Button>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleReply}>
            <Reply className="h-4 w-4 mr-2" /> Responder
          </Button>
          
          {email.cc && email.cc.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleReplyAll}>
              <ReplyAll className="h-4 w-4 mr-2" /> Responder a todos
            </Button>
          )}
          
          <Button variant="ghost" size="sm" onClick={handleForward}>
            <Forward className="h-4 w-4 mr-2" /> Reenviar
          </Button>
          
          <Button variant="ghost" size="sm" onClick={handleToggleStar}>
            {email.isStarred ? (
              <Star className="h-4 w-4 text-yellow-400" />
            ) : (
              <StarOff className="h-4 w-4" />
            )}
          </Button>
          
          <Button variant="ghost" size="sm" className="text-red-500" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" /> Eliminar
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto border rounded-md p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center">
              {email.folder === "spam" && (
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              )}
              {email.subject}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-2">
              {email.labels.map((labelId) => {
                const label = mockLabels.find((l) => l.id === labelId);
                return label ? (
                  <Badge 
                    key={label.id} 
                    variant="outline"
                    className={`text-${label.color}-500 border-${label.color}-200`}
                  >
                    {label.name}
                  </Badge>
                ) : null;
              })}
              {email.labels.length > 0 && (
                <Button variant="ghost" size="sm" className="h-6">
                  <Tag className="h-3 w-3 mr-1" />
                  Gestionar
                </Button>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-1">
              <span className="font-medium">De:</span> {email.from}
            </p>
            
            <p className="text-sm text-muted-foreground mb-1">
              <span className="font-medium">Para:</span> {getRecipients()}
            </p>
            
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Fecha:</span> {formatEmailDate(email.date, true)}
            </p>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="prose max-w-none mt-4" dangerouslySetInnerHTML={{ __html: email.body }} />
        
        {email.attachments && email.attachments.length > 0 && (
          <div className="mt-6">
            <Separator className="my-4" />
            <h3 className="font-medium flex items-center mb-2">
              <Paperclip className="h-4 w-4 mr-2" /> Archivos adjuntos ({email.attachments.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {email.attachments.map((attachment, index) => (
                <div 
                  key={index}
                  className="flex items-center p-2 border rounded-md"
                >
                  <div className="flex-1">
                    <p className="font-medium">{attachment.name}</p>
                    <p className="text-xs text-muted-foreground">{attachment.size}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
