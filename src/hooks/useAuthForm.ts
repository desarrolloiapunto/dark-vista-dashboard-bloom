import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export const useAuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleAuthMode = () => setIsSignUp(!isSignUp);

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
  };

  const resetForm = () => {
    captchaRef.current?.resetCaptcha();
    setCaptchaToken(null);
  };

  const validateCaptcha = (): boolean => {
    if (!captchaToken) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor, complete el captcha primero",
      });
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        captchaToken,
      },
    });

    if (error) throw error;

    toast({
      title: "Registro exitoso",
      description: "Por favor verifica tu email para continuar",
    });
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        captchaToken,
      },
    });

    if (error) throw error;

    navigate("/");
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCaptcha()) return;

    setIsLoading(true);

    try {
      if (isSignUp) {
        await handleSignUp();
      } else {
        await handleSignIn();
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
      resetForm();
    }
  };

  return {
    isLoading,
    isSignUp,
    email,
    setEmail,
    password,
    setPassword,
    captchaToken,
    captchaRef,
    handleAuth,
    handleCaptchaVerify,
    handleCaptchaExpire,
    toggleAuthMode,
  };
};
