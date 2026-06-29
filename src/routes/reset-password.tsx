import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Sparkles, CheckCircle2, Lock, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password · Digital Twin" },
      { name: "description", content: "Set a new password for your account." },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
      } catch (err) {
        console.error("Error checking session:", err);
      } finally {
        setCheckingSession(false);
      }
    }
    checkSession();
  }, []);

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;

      toast.success("Password reset successfully!");
      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-mesh px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 text-foreground">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-semibold tracking-tight">Digital Twin</span>
        </Link>

        {checkingSession ? (
          <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/95">
            <CardContent className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Checking session...</p>
            </CardContent>
          </Card>
        ) : !session ? (
          <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/95">
            <CardHeader className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-destructive/10 grid place-items-center mb-2">
                <Lock className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle className="text-xl">Invalid or Expired Link</CardTitle>
              <CardDescription>
                You must have an active recovery session to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <p className="text-sm text-muted-foreground text-center">
                The password reset link may have expired or already been used. Please request a new one.
              </p>
              <Link to="/auth">
                <Button className="w-full gap-2 mt-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/95">
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>
                Set a secure password for account: <strong className="text-foreground">{session.user?.email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className="flex flex-col items-center justify-center py-8 gap-4 text-center animate-fade-in">
                  <div className="h-16 w-16 rounded-full bg-primary/10 text-primary grid place-items-center animate-in zoom-in duration-300">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Password Changed!</p>
                    <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
                      Your password has been successfully updated. You can now access your dashboard.
                    </p>
                  </div>
                  <Button onClick={() => navigate({ to: "/dashboard" })} className="w-full mt-2">
                    Go to Dashboard
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Min. 6 characters"
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                      required
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
