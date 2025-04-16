import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useAuthForm } from "@/hooks/useAuthForm";
import { CaptchaVerification } from "./CaptchaVerification";

export function AuthForm() {
  const {
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
  } = useAuthForm();

  return (
    <>
      <form onSubmit={handleAuth} className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9"
              required
            />
          </div>
        </div>

        <CaptchaVerification
          captchaRef={captchaRef}
          onVerify={handleCaptchaVerify}
          onExpire={handleCaptchaExpire}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !captchaToken}
        >
          {isLoading
            ? "Cargando..."
            : isSignUp
            ? "Registrarse"
            : "Iniciar sesión"}
        </Button>
      </form>

      <div className="text-center text-sm mt-4">
        <button
          type="button"
          onClick={toggleAuthMode}
          className="text-primary hover:underline"
        >
          {isSignUp
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"}
        </button>
      </div>
    </>
  );
}
