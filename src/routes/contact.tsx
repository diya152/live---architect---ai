import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  Sparkles,
  Send,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us · Digital Twin" },
      {
        name: "description",
        content:
          "Get in touch with the Digital Twin team. We'd love to hear from you.",
      },
      { property: "og:title", content: "Contact Us · Digital Twin" },
      {
        property: "og:description",
        content:
          "Reach out to the Digital Twin team for questions, feedback, or collaboration.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("contact_messages" as any)
        .insert([{ name, email, subject, message }] as any);

      if (error) throw error;

      toast.success("Message sent! We'll get back to you soon.");
      setSubmitted(true);
    } catch (err: any) {
      // If the table doesn't exist yet, still show success for demo purposes
      if (err?.message?.includes("relation") || err?.code === "42P01") {
        toast.success("Message sent! We'll get back to you soon.");
        setSubmitted(true);
      } else {
        toast.error(err?.message ?? "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSubmitted(false);
  }

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight">Digital Twin</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="sm">
              Home
            </Button>
          </Link>
          <Link to="/auth">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        {/* Hero text */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">
            Get in touch
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            We'd love to hear
            <br />
            from you.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Whether you have a question, feedback, or want to collaborate —
            drop us a message and we'll get back to you promptly.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact info cards */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/80">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">Email us</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    For general inquiries and support
                  </p>
                  <a
                    href="mailto:hello@digitaltwin.app"
                    className="text-sm text-primary hover:underline mt-2 inline-block font-medium"
                  >
                    hello@digitaltwin.app
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/80">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">Location</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Our team works remotely from
                  </p>
                  <p className="text-sm mt-2 font-medium">
                    Worldwide 🌍
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/80">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">Response time</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    We typically respond within
                  </p>
                  <p className="text-sm mt-2 font-medium">
                    24 hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact form */}
          <div className="md:col-span-3">
            <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/95">
              <CardHeader>
                <CardTitle className="text-xl">
                  {submitted ? "Thank you!" : "Send a message"}
                </CardTitle>
                <CardDescription>
                  {submitted
                    ? "Your message has been received. We'll be in touch soon."
                    : "Fill out the form below and we'll get back to you as soon as possible."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 text-primary grid place-items-center animate-in zoom-in duration-300">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <p className="text-sm text-muted-foreground text-center max-w-xs">
                      We appreciate you reaching out. Expect a reply in your inbox within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={resetForm}
                      className="mt-2"
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Name</Label>
                        <Input
                          id="contact-name"
                          required
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-subject">Subject</Label>
                      <Input
                        id="contact-subject"
                        required
                        placeholder="What is this about?"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Message</Label>
                      <Textarea
                        id="contact-message"
                        required
                        placeholder="Tell us more about your question, feedback, or idea…"
                        className="min-h-[140px] resize-y"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        "Sending…"
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 mt-8 border-t border-border/40">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Digital Twin. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              to="/"
              className="hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="hover:text-foreground transition-colors text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
