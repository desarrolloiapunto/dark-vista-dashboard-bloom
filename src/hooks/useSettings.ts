
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useToast } from "@/components/ui/use-toast";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!, 
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

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

  useEffect(() => {
    const fetchSettings = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_settings')
        .select('settings')
        .eq('user_id', user.id)
        .eq('channel', channel)
        .single();

      if (error) {
        console.error(`Error fetching ${channel} settings:`, error);
        return;
      }

      if (data) {
        setSettings(data.settings);
      }
    };

    fetchSettings();
  }, [channel]);

  const saveSettings = async (newSettings: ChannelSettings) => {
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
      return;
    }

    setSettings(newSettings);
    toast({
      title: 'Settings Saved',
      description: `${channel} settings updated successfully`
    });
  };

  return { settings, saveSettings };
};
