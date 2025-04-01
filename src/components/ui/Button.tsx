import React from "react";
import { cn } from "@lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-upwork-green text-white hover:bg-upwork-green-dark focus-visible:ring-upwork-green":
            variant === "primary",
          "bg-upwork-background text-upwork-gray hover:bg-upwork-background-alt focus-visible:ring-upwork-gray":
            variant === "secondary",
          "border border-upwork-gray-lighter bg-transparent hover:bg-upwork-background focus-visible:ring-upwork-gray":
            variant === "outline",
        },
        {
          "h-8 px-4 text-sm": size === "sm",
          "h-10 px-5": size === "md",
          "h-12 px-6 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    />
  );
}
