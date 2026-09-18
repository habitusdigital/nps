"use client";

export function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === current ? "w-8 bg-vale-sage" : i < current ? "w-2 bg-vale-sage/50" : "w-2 bg-vale-charcoal/15"
          }`}
        />
      ))}
    </div>
  );
}
