
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

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('user_settings')
          .select('settings')
          .eq('user_id', user.id)
          .eq('channel', channel)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
          console.error(`Error fetching ${channel} settings:`, error);
          setError(error.message);
        }

        if (data) {
          setSettings(data.settings);
        }
      } catch (err) {
        console.error(`Error in useSettings:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [channel]);

  const saveSettings = async (newSettings: ChannelSettings) => {
    try {
      setError(null);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Error',
          description: 'You must be logged in to save settings',
          variant: 'destructive'
        });
        return;
      }

      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          channel,
          settings: newSettings
        })
        .select();

      if (error) {
        toast({
          title: 'Error saving settings',
          description: error.message,
          variant: 'destructive'
        });
        setError(error.message);
        return;
      }

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
