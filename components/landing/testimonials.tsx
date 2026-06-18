"use client";

import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Locus completely solved my context-switching fatigue. Having my email threads and calendar grids inside a single command panel with a private AI changed my daily routine.",
      author: "Alex Chen",
      role: "Founder @ Veloce Tech",
    },
    {
      quote:
        "The calendar slot booking assistant is magical. I type a simple chat command and it schedules invites while checking my availability in real time.",
      author: "Priya Sharma",
      role: "Product Lead @ Linear",
    },
    {
      quote:
        "All connections are secure, and database caches are double-encrypted. Locus is a secure, high-end productivity hub that I trust with my calendar metrics.",
      author: "James Wilson",
      role: "Security Director @ Atria",
    },
    {
      quote:
        "The dark mode is beautiful and clean, but the light mode is equally gorgeous. Toggling themes is fast and coordinates layout colors perfectly.",
      author: "Mira Patel",
      role: "Backend Engineer @ Cloudflare",
    },
    {
      quote:
        "The email thread summarizer gives me a bullet-point snapshot of a long thread in seconds. I've cut down my inbox time by at least 40%.",
      author: "David Kim",
      role: "Growth Operations @ Stripe",
    },
    {
      quote:
        "Finally, a command center that actually feels like a workspace tool rather than a standard client. It's minimal, secure, and extremely powerful.",
      author: "Sophia Rodriguez",
      role: "Chief of Staff @ Mercury",
    },
  ];

  return (
    <section id="testimonials" className="py-32 md:py-40 border-t border-border bg-background text-foreground relative">
      {/* Glow effect */}
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="text-center space-y-5 mb-20 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-serif text-foreground tracking-tight uppercase leading-tight">
            Testimonials
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
            Hear from teams streamlining their workspace operations with Locus.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8 [column-fill:_balance] box-border">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="break-inside-avoid rounded-2xl border border-border/60 bg-card/45 p-8 md:p-10 hover:border-primary/20 transition-all hover:bg-card/90 flex flex-col gap-6 shadow-sm"
            >
              <div className="text-primary/40 w-fit">
                <Quote className="h-9 w-9 fill-current" />
              </div>
              
              <blockquote className="text-base md:text-lg text-foreground/90 leading-relaxed font-sans italic">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className="border-t border-border/40 pt-5 flex flex-col gap-1">
                <span className="text-base font-bold text-foreground font-serif uppercase tracking-wider">
                  {item.author}
                </span>
                <span className="text-sm text-muted-foreground font-mono">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
