import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserMenuWithSession } from "@/features/auth/components/user-menu";
import { Mail, Calendar, Bot, Zap, ArrowRight, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      {/* Glassmorphism Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background">
              <Star className="h-5 w-5 fill-current" />
            </div>
            <span className="text-xl font-bold font-serif tracking-tight text-foreground">Atria</span>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <UserMenuWithSession variant="profile" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif tracking-tight text-foreground sm:text-4xl">
            Command Center
          </h1>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base">
            Manage your Gmail, Calendar meetings, and AI scheduling agents from a single workflow.
          </p>
        </div>

        {/* Feature Modules Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Inbox */}
          <Card className="group relative overflow-hidden border-border bg-card transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-bold">Gmail Inbox</CardTitle>
              <div className="rounded-md bg-primary/10 p-2 text-primary">
                <Mail className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-muted-foreground min-h-[60px] flex items-center">
                AI-sorted priority inbox, drafting assistants, and bulk follow-up rules.
              </CardDescription>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold text-primary group-hover:text-foreground">
                <span>Go to Inbox</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Calendar */}
          <Card className="group relative overflow-hidden border-border bg-card transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-bold">Smart Calendar</CardTitle>
              <div className="rounded-md bg-primary/10 p-2 text-primary">
                <Calendar className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-muted-foreground min-h-[60px] flex items-center">
                Visual scheduler, meeting conflict resolver, and scheduling link configs.
              </CardDescription>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold text-primary group-hover:text-foreground">
                <span>View Schedule</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>

          {/* Card 3: AI Assistant */}
          <Card className="group relative overflow-hidden border-border bg-card transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-bold">AI Assistant</CardTitle>
              <div className="rounded-md bg-primary/10 p-2 text-primary">
                <Bot className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-muted-foreground min-h-[60px] flex items-center">
                Interact with your workspace context to find information or compose replies.
              </CardDescription>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold text-primary group-hover:text-foreground">
                <span>Start Chat</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Automations */}
          <Card className="group relative overflow-hidden border-border bg-card transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-bold">Automations</CardTitle>
              <div className="rounded-md bg-primary/10 p-2 text-primary">
                <Zap className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-muted-foreground min-h-[60px] flex items-center">
                Configure background sync tasks, email auto-responders, and cron integrations.
              </CardDescription>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold text-primary group-hover:text-foreground">
                <span>View Tasks</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
