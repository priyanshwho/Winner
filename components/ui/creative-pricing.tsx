import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingTier {
    name: string;
    icon: React.ReactNode;
    price: string;
    description: string;
    features: string[];
    popular?: boolean;
    color: string;
    ctaText?: string;
}

function CreativePricing({
    tag = "Simple Pricing",
    title = "Simple Pricing. Clear Value.",
    description = "Choose the plan that suits your email and calendar workflow.",
    tiers,
}: {
    tag?: string;
    title?: string;
    description?: string;
    tiers: PricingTier[];
}) {
    return (
        <div className="w-full max-w-5xl mx-auto px-4">
            <div className="text-center space-y-3.5 mb-9 md:mb-11">
                <div className="font-mono text-[13px] tracking-wider uppercase text-primary rotate-[-1deg]">
                    {tag}
                </div>
                <div className="relative">
                    <h2 className="text-[33px] md:text-[44px] lg:text-[55px] font-extrabold font-serif text-foreground rotate-[-1deg] uppercase leading-tight tracking-tight">
                        {title}
                    </h2>
                    <div
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-2.5 bg-primary/20 
                        rotate-[-1deg] rounded-full blur-sm"
                    />
                </div>
                <p className="text-[17px] md:text-[19px] text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed rotate-[-1deg]">
                    {description}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px] md:gap-[26px]">
                {tiers.map((tier, index) => (
                    <div
                        key={tier.name}
                        className={cn(
                            "relative group",
                            "transition-all duration-300",
                            index === 0 && "rotate-[-1deg]",
                            index === 1 && "rotate-[1deg]",
                            index === 2 && "rotate-[-2deg]"
                        )}
                    >
                        <div
                            className={cn(
                                "absolute inset-0 bg-card/65 dark:bg-card/45 backdrop-blur-[5px]",
                                tier.name === "Pro Plan"
                                    ? "border-2 border-[#c41e3a] group-hover:border-[#c41e3a]"
                                    : "border-2 border-border group-hover:border-primary/50",
                                "rounded-2xl transition-all duration-300",
                                tier.name === "Pro Plan"
                                    ? [
                                        "shadow-[6px_6px_0px_0px] shadow-[#c41e3a]/15 dark:shadow-[#c41e3a]/10",
                                        "group-hover:shadow-[10px_10px_0px_0px] group-hover:shadow-[#c41e3a]/30 dark:group-hover:shadow-[#c41e3a]/20"
                                      ]
                                    : [
                                        "shadow-[6px_6px_0px_0px] shadow-primary/10 dark:shadow-primary/5",
                                        "group-hover:shadow-[10px_10px_0px_0px] group-hover:shadow-primary/20 dark:group-hover:shadow-primary/10"
                                      ],
                                "group-hover:translate-x-[-4px]",
                                "group-hover:translate-y-[-4px]"
                            )}
                        />

                        <div className="relative p-[22px] md:p-[26px] flex flex-col justify-between h-full min-h-[396px] md:min-h-[429px]">
                            {tier.popular && (
                                <div
                                    className="absolute -top-2.5 -right-2.5 bg-primary text-primary-foreground 
                                    font-mono uppercase text-[9px] tracking-widest px-2.5 py-1 rounded-full rotate-12 border-2 border-border shadow-sm"
                                >
                                    Recommended
                                </div>
                            )}

                            <div>
                                <div className="mb-4 flex justify-between items-start">
                                    <div>
                                        <h3 className="font-serif text-[23px] font-bold uppercase text-foreground tracking-wide">
                                            {tier.name}
                                        </h3>
                                        <p className="font-sans text-[13px] text-muted-foreground mt-0.5">
                                            {tier.description}
                                        </p>
                                    </div>
                                    <div
                                        className={cn(
                                            "w-9 h-9 rounded-lg flex items-center justify-center border border-border shadow-inner text-primary",
                                            tier.popular ? "bg-primary/10 border-primary/20" : "bg-secondary/20"
                                        )}
                                    >
                                        {tier.icon}
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="mb-4 flex items-baseline">
                                    <span className="text-[33px] md:text-[44px] font-extrabold text-foreground font-serif tracking-tight">
                                        {tier.price}
                                    </span>
                                    {tier.price !== "Contact Us" && (
                                        <span className="text-muted-foreground font-mono text-[13px] ml-1.5">
                                            {tier.price.includes("forever") ? "" : "/month"}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-[9px] mb-[26px]">
                                    {tier.features.map((feature) => (
                                        <div
                                            key={feature}
                                            className="flex items-start gap-[11px]"
                                        >
                                            <div
                                                className={cn(
                                                    "w-[18px] h-[18px] rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                                                    tier.popular ? "border-primary/40 text-primary" : "border-border text-muted-foreground"
                                                )}
                                            >
                                                <Check className="w-3 h-3" />
                                            </div>
                                            <span className="font-sans text-[13px] md:text-[15px] text-foreground/90 leading-snug">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                className={cn(
                                    "w-full h-10 font-mono uppercase tracking-wider text-xs font-bold rounded-full relative transition-all duration-300",
                                    tier.popular
                                        ? [
                                              "bg-primary text-primary-foreground hover:bg-primary/95",
                                              "shadow-[4px_4px_0px_0px] shadow-primary-foreground/10",
                                              "hover:translate-x-[-1px] hover:translate-y-[-1px]",
                                          ]
                                        : [
                                              "bg-background text-foreground border border-border hover:bg-muted",
                                              "shadow-sm",
                                          ]
                                )}
                            >
                                {tier.ctaText || "Get Started"}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export { CreativePricing };
export type { PricingTier };