
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState(user?.user_metadata?.username || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { username }
      });

      if (error) throw error;

      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          username,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (profileError) throw profileError;

      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      if (updateError) throw updateError;

      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (profileError) throw profileError;

      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="container max-w-2xl p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.user_metadata?.avatar_url} alt={username} />
                <AvatarFallback>{username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 rounded-full bg-primary p-1.5 text-primary-foreground hover:bg-primary/90 cursor-pointer"
              >
                <Camera className="h-4 w-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{username || "User"}</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {user?.email}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
