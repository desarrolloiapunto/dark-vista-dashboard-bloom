import { Card } from "@/components/ui/card";
import { AuthForm } from "@/components/auth/AuthForm";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";

export default function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Acceso</h2>
        <AuthForm />
        <SocialAuthButtons />
      </Card>
    </div>
  );
}
