import { Card } from "@/components/ui/card";
import { AuthForm } from "@/components/auth/AuthForm";
import { GalleryVerticalEnd } from "lucide-react";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";

export default function Auth() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <img
              src="/img/logo.png"
              alt="Logo IA Punto"
              width={180}
              height="auto"
            />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-md p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center">
              Acceso | qBit CRM
            </h2>
            <AuthForm />
            <SocialAuthButtons />
          </Card>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/img/crm.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
