
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { X, ChevronDown, Paperclip } from "lucide-react";
import { mockEmails } from "@/data/emails";
import { mockLabels } from "@/data/labels";
import { useTranslation } from "react-i18next";

interface ComposeEmailProps {
  isReply?: boolean;
  isForward?: boolean;
}

interface EmailForm {
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  body: string;
  labels: string[];
}

export function ComposeEmail({ isReply = false, isForward = false }: ComposeEmailProps) {
  const { emailId } = useParams<{ emailId: string }>();
  const [searchParams] = useSearchParams();
  const replyAll = searchParams.get("all") === "true";
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [recipients, setRecipients] = useState<{ to: string[]; cc: string[]; bcc: string[] }>({
    to: [],
    cc: [],
    bcc: []
  });

  const form = useForm<EmailForm>({
    defaultValues: {
      to: "",
      cc: "",
      bcc: "",
      subject: "",
      body: "",
      labels: []
    }
  });

  useEffect(() => {
    if (isReply || isForward) {
      if (!emailId) return;
      
      const originalEmail = mockEmails.find(email => email.id === emailId);
      if (!originalEmail) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Correo original no encontrado."
        });
        navigate("/emails/compose");
        return;
      }

      if (isReply) {
        // For replies, set the recipient to the original sender
        const from = originalEmail.from.match(/<(.+)>/) ? 
          originalEmail.from.match(/<(.+)>/)![1] : 
          originalEmail.from;
        
        setRecipients({
          to: [from],
          cc: replyAll && originalEmail.cc ? [...originalEmail.cc] : [],
          bcc: []
        });

        form.setValue("subject", `Re: ${originalEmail.subject.startsWith("Re:") ? originalEmail.subject.substring(4).trim() : originalEmail.subject}`);
        form.setValue("body", `\n\n\n--------------------------------\nDe: ${originalEmail.from}\nFecha: ${new Date(originalEmail.date).toLocaleString()}\nAsunto: ${originalEmail.subject}\n\n${originalEmail.body.replace(/<[^>]*>/g, '')}`);
      } else if (isForward) {
        form.setValue("subject", `Fwd: ${originalEmail.subject.startsWith("Fwd:") ? originalEmail.subject.substring(5).trim() : originalEmail.subject}`);
        form.setValue("body", `\n\n\n--------------------------------\nDe: ${originalEmail.from}\nFecha: ${new Date(originalEmail.date).toLocaleString()}\nAsunto: ${originalEmail.subject}\n\n${originalEmail.body.replace(/<[^>]*>/g, '')}`);
        setSelectedLabels([...originalEmail.labels]);
      }
    }
  }, [isReply, isForward, emailId, form, navigate, replyAll]);

  const addRecipient = (type: "to" | "cc" | "bcc", email: string) => {
    if (!email) return;
    
    setRecipients(prev => ({
      ...prev,
      [type]: [...prev[type], email]
    }));
    form.setValue(type, "");
  };

  const removeRecipient = (type: "to" | "cc" | "bcc", index: number) => {
    setRecipients(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleToggleLabel = (labelId: string) => {
    setSelectedLabels(prev => 
      prev.includes(labelId) 
        ? prev.filter(id => id !== labelId)
        : [...prev, labelId]
    );
  };

  const onSubmit = (data: EmailForm) => {
    // Combine the form data with the recipients
    const emailData = {
      ...data,
      to: recipients.to,
      cc: recipients.cc,
      bcc: recipients.bcc,
      labels: selectedLabels
    };
    
    console.log("Email to send:", emailData);
    
    toast({
      title: "Correo enviado",
      description: "Tu correo ha sido enviado correctamente."
    });
    
    navigate("/emails/inbox");
  };

  const saveDraft = () => {
    toast({
      title: "Borrador guardado",
      description: "Tu borrador ha sido guardado correctamente."
    });
    navigate("/emails/drafts");
  };

  return (
    <div className="h-full">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">
          {isReply ? "Responder a correo" : isForward ? "Reenviar correo" : "Nuevo correo"}
        </h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* To field */}
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between">
                    Para
                    <div className="flex space-x-2">
                      <button 
                        type="button" 
                        className={`text-xs ${recipients.cc.length > 0 ? 'text-primary' : 'text-muted-foreground'}`}
                        onClick={() => document.getElementById("cc-input")?.classList.toggle("hidden")}
                      >
                        CC
                      </button>
                      <button 
                        type="button" 
                        className={`text-xs ${recipients.bcc.length > 0 ? 'text-primary' : 'text-muted-foreground'}`}
                        onClick={() => document.getElementById("bcc-input")?.classList.toggle("hidden")}
                      >
                        BCC
                      </button>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <div>
                      <div className="flex flex-wrap gap-1 p-2 border rounded-md">
                        {recipients.to.map((email, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {email}
                            <button type="button" onClick={() => removeRecipient("to", index)}>
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        <Input 
                          {...field} 
                          className="border-0 flex-1 min-w-[100px] focus-visible:ring-0 p-0 text-sm"
                          placeholder={recipients.to.length === 0 ? "Añadir destinatarios" : ""}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === "Tab" || e.key === ";") {
                              e.preventDefault();
                              addRecipient("to", field.value);
                            }
                          }}
                          onBlur={() => addRecipient("to", field.value)}
                        />
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* CC field */}
            <FormField
              control={form.control}
              name="cc"
              render={({ field }) => (
                <FormItem id="cc-input" className={recipients.cc.length > 0 ? '' : 'hidden'}>
                  <FormLabel>CC</FormLabel>
                  <FormControl>
                    <div>
                      <div className="flex flex-wrap gap-1 p-2 border rounded-md">
                        {recipients.cc.map((email, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {email}
                            <button type="button" onClick={() => removeRecipient("cc", index)}>
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        <Input 
                          {...field} 
                          className="border-0 flex-1 min-w-[100px] focus-visible:ring-0 p-0 text-sm"
                          placeholder={recipients.cc.length === 0 ? "Añadir destinatarios en copia" : ""}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === "Tab" || e.key === ";") {
                              e.preventDefault();
                              addRecipient("cc", field.value);
                            }
                          }}
                          onBlur={() => addRecipient("cc", field.value)}
                        />
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* BCC field */}
            <FormField
              control={form.control}
              name="bcc"
              render={({ field }) => (
                <FormItem id="bcc-input" className={recipients.bcc.length > 0 ? '' : 'hidden'}>
                  <FormLabel>BCC</FormLabel>
                  <FormControl>
                    <div>
                      <div className="flex flex-wrap gap-1 p-2 border rounded-md">
                        {recipients.bcc.map((email, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {email}
                            <button type="button" onClick={() => removeRecipient("bcc", index)}>
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        <Input 
                          {...field} 
                          className="border-0 flex-1 min-w-[100px] focus-visible:ring-0 p-0 text-sm"
                          placeholder={recipients.bcc.length === 0 ? "Añadir destinatarios en copia oculta" : ""}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === "Tab" || e.key === ";") {
                              e.preventDefault();
                              addRecipient("bcc", field.value);
                            }
                          }}
                          onBlur={() => addRecipient("bcc", field.value)}
                        />
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Subject field */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asunto</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Asunto del correo" />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Body field */}
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Escribe tu mensaje aquí..." 
                      className="min-h-[300px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Labels */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Etiquetas
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {mockLabels.map(label => (
                  <Badge
                    key={label.id}
                    variant={selectedLabels.includes(label.id) ? "default" : "outline"}
                    className={`cursor-pointer ${selectedLabels.includes(label.id) ? `bg-${label.color}-500` : `text-${label.color}-500 border-${label.color}-200`}`}
                    onClick={() => handleToggleLabel(label.id)}
                  >
                    {label.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Attachments */}
            <div>
              <Button type="button" variant="outline" size="sm" className="gap-2">
                <Paperclip className="h-4 w-4" /> Adjuntar archivos
              </Button>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancelar
              </Button>
              <Button type="button" variant="secondary" onClick={saveDraft}>
                Guardar como borrador
              </Button>
              <Button type="submit">
                Enviar
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
