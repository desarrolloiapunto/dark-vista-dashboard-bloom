
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Header } from "./components/layout/Header";
import { Breadcrumb } from "./components/layout/Breadcrumb";
import { PrimarySidebar } from "./components/layout/PrimarySidebar";
import { SecondarySidebar } from "./components/layout/SecondarySidebar";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <PrimarySidebar />
                      <SecondarySidebar />
                      <div className="pl-72">
                        <Breadcrumb />
                        <main>
                          <Routes>
                            <Route index element={<Index />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </main>
                      </div>
                    </>
                  </ProtectedRoute>
                }
              >
                <Route index element={<Index />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
