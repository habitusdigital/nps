"use client";

export function BackgroundDecor({ variant = "light" }: { variant?: "light" | "dark" }) {
  const blobA = variant === "dark" ? "bg-vale-sage/25" : "bg-vale-sage/30";
  const blobB = variant === "dark" ? "bg-vale-amber/15" : "bg-vale-amber/25";
  const blobC = variant === "dark" ? "bg-vale-sageLight/10" : "bg-vale-terracotta/10";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute -top-24 -left-20 h-72 w-72 rounded-full blur-3xl animate-float-slow ${blobA}`}
      />
      <div
        className={`absolute top-1/3 -right-24 h-80 w-80 rounded-full blur-3xl animate-float-slower ${blobB}`}
      />
      <div
        className={`absolute -bottom-28 left-1/4 h-64 w-64 rounded-full blur-3xl animate-float-slow ${blobC}`}
      />
    </div>
  );
}
