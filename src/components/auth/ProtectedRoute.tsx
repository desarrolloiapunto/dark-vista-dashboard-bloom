
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  // Mostrar un estado de carga mientras verificamos la sesión
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirigir al login si no hay usuario autenticado
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Mostrar el contenido protegido si hay un usuario autenticado
  return <>{children}</>;
}
