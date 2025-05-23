
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Copy, Check } from "lucide-react";

export const WebChatEmbed: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [embedSettings, setEmbedSettings] = useState({
    color: "#7c3aed",
    position: "right",
    welcomeMessage: "¡Hola! ¿En qué puedo ayudarte hoy?",
    botName: "Asistente",
    widgetId: Math.random().toString(36).substring(2, 10)
  });

  // Generate embed code based on settings
  const generateEmbedCode = () => {
    return `<!-- Start of Chat Widget -->
<script>
  (function(w, d, s, o) {
    w.ChatWidgetObject = o;
    w[o] = w[o] || function() {
      (w[o].q = w[o].q || []).push(arguments);
    };
    var js = d.createElement(s);
    js.async = 1;
    js.src = 'https://yourwebsite.com/webchat/widget.js';
    js.dataset.widgetId = '${embedSettings.widgetId}';
    js.dataset.color = '${embedSettings.color}';
    js.dataset.position = '${embedSettings.position}';
    js.dataset.welcomeMessage = '${embedSettings.welcomeMessage}';
    js.dataset.botName = '${embedSettings.botName}';
    d.getElementsByTagName('head')[0].appendChild(js);
  }(window, document, 'script', 'chatWidget'));
</script>
<!-- End of Chat Widget -->`;
  };

  // Handle copy button click
  const handleCopyClick = () => {
    navigator.clipboard.writeText(generateEmbedCode())
      .then(() => {
        setCopied(true);
        toast({
          title: t('workflows.embedCodeCopied'),
          duration: 3000,
        });
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('workflows.webChannelSettings')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="customize">
          <TabsList className="mb-4">
            <TabsTrigger value="customize">{t('workflows.customizeWidget')}</TabsTrigger>
            <TabsTrigger value="embed">{t('workflows.generateEmbedCode')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="customize" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="widget-color">{t('workflows.widgetColor')}</Label>
                <div className="flex gap-2">
                  <Input
                    id="widget-color"
                    type="color"
                    value={embedSettings.color}
                    onChange={(e) => setEmbedSettings({...embedSettings, color: e.target.value})}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={embedSettings.color}
                    onChange={(e) => setEmbedSettings({...embedSettings, color: e.target.value})}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="widget-position">{t('workflows.widgetPosition')}</Label>
                <Select 
                  value={embedSettings.position} 
                  onValueChange={(value) => setEmbedSettings({...embedSettings, position: value})}
                >
                  <SelectTrigger id="widget-position">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="welcome-message">{t('workflows.widgetWelcomeMessage')}</Label>
                <Textarea
                  id="welcome-message"
                  value={embedSettings.welcomeMessage}
                  onChange={(e) => setEmbedSettings({...embedSettings, welcomeMessage: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bot-name">{t('workflows.widgetIcon')}</Label>
                <Input
                  id="bot-name"
                  value={embedSettings.botName}
                  onChange={(e) => setEmbedSettings({...embedSettings, botName: e.target.value})}
                />
              </div>
            </div>
            
            <div className="pt-4">
              <div className="rounded-lg border p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-50"></div>
                <div className="relative z-10 flex items-center justify-center">
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: embedSettings.color }}
                  >
                    <span className="text-white font-bold text-lg">
                      {embedSettings.botName.substring(0, 1).toUpperCase()}
                    </span>
                  </div>
                </div>
                <p className="text-center mt-4 relative z-10 text-sm text-gray-600">
                  {t('workflows.webChannelDescription')}
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="embed" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="embed-code">{t('workflows.generateEmbedCode')}</Label>
              <Textarea
                id="embed-code"
                value={generateEmbedCode()}
                readOnly
                rows={10}
                className="font-mono text-sm"
              />
            </div>
            
            <Button onClick={handleCopyClick} className="w-full mt-2">
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  {t('workflows.embedCodeCopied')}
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  {t('workflows.copyEmbedCode')}
                </>
              )}
            </Button>
            
            <div className="border-t mt-4 pt-4">
              <h4 className="font-medium mb-2">Preview:</h4>
              <div className="bg-gray-100 p-4 rounded-md">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: embedSettings.color }}
                  >
                    <span className="text-white font-bold">
                      {embedSettings.botName.substring(0, 1).toUpperCase()}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-md shadow-sm">
                    <p className="text-sm">{embedSettings.welcomeMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WebChatEmbed;
