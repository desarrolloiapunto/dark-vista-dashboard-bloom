
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface ChannelSettings {
  isActive: boolean;
  accessToken?: string;
  [key: string]: any;
}

export const useSettings = (channel: string) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<ChannelSettings>({
    isActive: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Storage key for settings in localStorage
  const storageKey = `channel_settings_${channel}`;

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if settings exist in localStorage
        const storedSettings = localStorage.getItem(storageKey);
        
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        }
      } catch (err) {
        console.error(`Error in useSettings:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [channel, storageKey]);

  const saveSettings = async (newSettings: ChannelSettings) => {
    try {
      setError(null);
      
      // Save settings to localStorage
      localStorage.setItem(storageKey, JSON.stringify(newSettings));
      
      setSettings(newSettings);
      toast({
        title: 'Settings Saved',
        description: `${channel} settings updated successfully`
      });
    } catch (err) {
      console.error(`Error saving ${channel} settings:`, err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    }
  };

  return { settings, loading, error, saveSettings };
};
