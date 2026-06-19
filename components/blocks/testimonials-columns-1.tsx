"use client";
import React from "react";

export interface TestimonialItem {
  text: string;
  name: string;
  role: string;
  image: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={`${props.className || ""} testimonial-column-parent`}>
      <div
        className="testimonial-scroll-container"
        style={{
          "--scroll-duration": `${props.duration || 15}s`,
        } as React.CSSProperties}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="testimonial-card-glow p-5 md:p-6 rounded-2xl border border-border bg-card/40 shadow-lg shadow-primary/5 max-w-xs w-full backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:rotate-[0.5deg]"
                  key={i}
                >
                  <div className="text-foreground/95 text-xs md:text-sm leading-relaxed font-sans">{text}</div>
                  <div className="flex items-center gap-2 mt-4">
                    <img
                      width={36}
                      height={36}
                      src={image}
                      alt={name}
                      className="h-9 w-9 rounded-full bg-muted object-cover border border-border"
                    />
                    <div className="flex flex-col">
                      <div className="font-bold tracking-tight leading-5 text-xs font-serif uppercase text-foreground">{name}</div>
                      <div className="leading-5 text-[10px] text-muted-foreground font-mono">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </div>
    </div>
  );
};