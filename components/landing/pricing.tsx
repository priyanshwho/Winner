"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Free Tier",
      price: "₹0",
      period: "/forever",
      tagline: "Perfect for casual users",
      features: [
        "Basic Gmail & Calendar Sync",
        "Standard AI Assistant Chat",
        "Weekly sync monitoring logs",
        "Double-envelope KEK security",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro Plan",
      price: "₹299",
      period: "/month",
      tagline: "For busy professionals",
      features: [
        "Everything in the Free Tier",
        "Real-time webhook sync updates",
        "AI email response drafting",
        "Interactive calendar booking",
        "Priority sync processing",
      ],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      period: "",
      tagline: "For organizations and teams",
      features: [
        "Everything in the Pro Plan",
        "Custom database hosting config",
        "Dedicated server sync channels",
        "SLA sync guarantees",
        "Custom security compliance checks",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-32 md:py-40 border-t border-border bg-background text-foreground relative">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="text-center space-y-5 mb-20 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-serif text-foreground tracking-tight uppercase leading-tight">
            Simple Pricing.<br className="hidden sm:block" /> Clear Value.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
            Choose the plan that suits your email and calendar workflow.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid gap-6 md:gap-8 lg:gap-10 md:grid-cols-3 items-start">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl border flex flex-col p-8 md:p-10 relative overflow-hidden transition-all ${
                plan.popular
                  ? "border-primary bg-card/85 shadow-xl shadow-primary/5 scale-[1.03] md:scale-105"
                  : "border-border/60 bg-card/45 hover:border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-bl-lg font-mono">
                  Recommended
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg md:text-xl font-bold text-muted-foreground uppercase font-mono tracking-wider">
                  {plan.name}
                </h3>
                <div className="mt-5 flex items-baseline">
                  <span className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground font-serif">
                    {plan.price}
                  </span>
                  <span className="ml-2 text-base text-muted-foreground font-mono">
                    {plan.period}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground font-mono italic">
                  {plan.tagline}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-start gap-3">
                    <Check className={`h-5 w-5 shrink-0 mt-0.5 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-base md:text-lg text-foreground/80 font-sans leading-snug">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/sign-up"
                className={`w-full flex h-13 items-center justify-center rounded-full text-sm font-bold uppercase tracking-wider font-mono transition-all active:scale-95 ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border/80 text-foreground bg-background hover:bg-muted"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
