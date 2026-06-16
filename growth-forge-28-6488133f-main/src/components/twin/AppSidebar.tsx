import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  User,
  Target,
  Repeat,
  MessageSquare,
  Plus,
  LogOut,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { listThreads, createThread, deleteThread } from "@/lib/twin.functions";
import { toast } from "sonner";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/identity", label: "Identity", icon: User },
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/habits", label: "Habits", icon: Repeat },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const listThreadsFn = useServerFn(listThreads);
  const createThreadFn = useServerFn(createThread);
  const deleteThreadFn = useServerFn(deleteThread);

  const threadsQ = useQuery({
    queryKey: ["threads"],
    queryFn: () => listThreadsFn(),
  });

  const newThread = useMutation({
    mutationFn: () => createThreadFn({ data: {} }),
    onSuccess: (t) => {
      qc.invalidateQueries({ queryKey: ["threads"] });
      navigate({ to: "/chat/$threadId", params: { threadId: t.id } });
    },
  });

  const removeThread = useMutation({
    mutationFn: (id: string) => deleteThreadFn({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["threads"] });
      navigate({ to: "/dashboard" });
    },
  });

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
  }

  const isActive = (to: string, exact?: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/dashboard" className="flex items-center gap-2 px-2 py-1.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">Digital Twin</span>
            <span className="text-[10px] text-muted-foreground">Personal OS</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map((n) => (
                <SidebarMenuItem key={n.to}>
                  <SidebarMenuButton asChild isActive={isActive(n.to, n.exact)}>
                    <Link to={n.to}>
                      <n.icon />
                      <span>{n.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <div className="flex items-center justify-between px-2">
            <SidebarGroupLabel className="m-0">Conversations</SidebarGroupLabel>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => newThread.mutate()}
              disabled={newThread.isPending}
              aria-label="New conversation"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {threadsQ.data?.length === 0 && (
                <p className="px-3 py-2 text-xs text-muted-foreground">
                  No conversations yet.
                </p>
              )}
              {threadsQ.data?.map((t) => {
                const active = location.pathname === `/app/chat/${t.id}`;
                return (
                  <SidebarMenuItem key={t.id}>
                    <div className="group/thread flex items-center">
                      <SidebarMenuButton asChild isActive={active} className="flex-1">
                        <Link to="/chat/$threadId" params={{ threadId: t.id }}>
                          <MessageSquare />
                          <span className="truncate">{t.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (confirm("Delete this conversation?")) removeThread.mutate(t.id);
                        }}
                        className="opacity-0 group-hover/thread:opacity-100 p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition"
                        aria-label="Delete conversation"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="ghost" size="sm" className="justify-start" onClick={signOut}>
          <LogOut className="h-4 w-4 mr-2" /> Sign out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}