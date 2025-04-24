import { Card } from "@/components/ui/card";
import { AuthForm } from "@/components/auth/AuthForm";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";

export default function Auth() {
  const { user, isLoading } = useAuth();

  if (user && !isLoading) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <img
            src="https://nqdtgjqxgjgtfdtpgvhn.supabase.co/storage/v1/object/public/img//logo-kairos-saas.svg"
            alt="Kairos SaaS Logo"
            className="h-12 w-auto"
          />
          <span className="gradient-text text-2xl font-bold">Kairos SaaS</span>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-md p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center gradient-text">
              Welcome to Kairos SaaS
            </h2>
            <AuthForm />
          </Card>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <div className="absolute inset-0 gradient-bg opacity-90"></div>
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:16px_16px]"></div>
      </div>
    </div>
  );
}
