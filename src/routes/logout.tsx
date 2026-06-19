import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LogOut, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/logout")({
  head: () => ({
    meta: [
      { title: "Signing out · Digital Twin" },
      { name: "description", content: "Signing out of your Personal Growth Digital Twin." },
    ],
  }),
  component: LogoutPage,
});

function LogoutPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function performSignOut() {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        if (active) {
          toast.success("Successfully signed out");
          // Short delay to allow user to see the transition screen
          setTimeout(() => {
            if (active) {
              navigate({ to: "/auth" });
            }
          }, 1500);
        }
      } catch (err: any) {
        console.error("Sign out error:", err);
        if (active) {
          setError(err?.message ?? "Failed to sign out");
          toast.error("Error signing out");
        }
      }
    }

    performSignOut();

    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-mesh px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8 text-foreground">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <span className="font-semibold tracking-tight">Digital Twin</span>
        </div>
        <Card className="border-primary/10 shadow-xl backdrop-blur-sm bg-card/95">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <LogOut className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Signing out</CardTitle>
            <CardDescription>
              {error ? "An error occurred while logging you out." : "Securely ending your session..."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-6 pb-8">
            {error ? (
              <div className="text-center space-y-4 w-full">
                <p className="text-sm text-destructive font-medium">{error}</p>
                <Button 
                  onClick={() => navigate({ to: "/auth" })} 
                  className="w-full"
                >
                  Return to Sign In
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground animate-pulse">
                  Please wait a moment while we sign you out.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
