
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

export interface WebChatSettings {
  enabled: boolean;
  color: string;
  position: 'left' | 'right';
  welcomeMessage: string;
  botName: string;
  widgetId: string;
}

export const useWebChatEmbed = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<WebChatSettings>({
    enabled: false,
    color: "#7c3aed",
    position: "right",
    welcomeMessage: "¡Hola! ¿En qué puedo ayudarte hoy?",
    botName: "Asistente",
    widgetId: Math.random().toString(36).substring(2, 10)
  });

  // Save settings to localStorage or your backend
  const saveSettings = (newSettings: Partial<WebChatSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('webchat_settings', JSON.stringify(updatedSettings));
    
    toast({
      title: "Settings saved",
      description: "Web chat widget settings have been updated."
    });
    
    return updatedSettings;
  };

  // Generate embed code based on current settings
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
    js.dataset.widgetId = '${settings.widgetId}';
    js.dataset.color = '${settings.color}';
    js.dataset.position = '${settings.position}';
    js.dataset.welcomeMessage = '${settings.welcomeMessage}';
    js.dataset.botName = '${settings.botName}';
    d.getElementsByTagName('head')[0].appendChild(js);
  }(window, document, 'script', 'chatWidget'));
</script>
<!-- End of Chat Widget -->`;
  };

  // Load saved settings from localStorage
  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('webchat_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error("Error loading webchat settings:", error);
    }
  };

  return {
    settings,
    saveSettings,
    generateEmbedCode,
    loadSettings
  };
};

export default useWebChatEmbed;
