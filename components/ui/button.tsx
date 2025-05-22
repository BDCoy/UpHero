// import { cn } from "@/utils/cn";
// import React from "react";

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: "primary" | "secondary" | "outline";
//   size?: "sm" | "md" | "lg";
// }

// export function Button({
//   className,
//   variant = "primary",
//   size = "md",
//   ...props
// }: ButtonProps) {
//   return (
//     <button
//       className={cn(
//         "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
//         {
//           "bg-upwork-green text-white hover:bg-upwork-green-dark focus-visible:ring-upwork-green":
//             variant === "primary",
//           "bg-upwork-background text-upwork-gray hover:bg-upwork-background-alt focus-visible:ring-upwork-gray":
//             variant === "secondary",
//           "border border-upwork-gray-lighter bg-transparent hover:bg-upwork-background focus-visible:ring-upwork-gray":
//             variant === "outline",
//         },
//         {
//           "h-8 px-4 text-sm": size === "sm",
//           "h-10 px-5": size === "md",
//           "h-12 px-6 text-lg": size === "lg",
//         },
//         className
//       )}
//       {...props}
//     />
//   );
// }
"use client";

import React, { forwardRef, useRef, ButtonHTMLAttributes } from "react";
import cn from "classnames";
import { mergeRefs } from "react-merge-refs";
import { Loader2 } from "lucide-react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  active?: boolean;
  width?: number;
  loading?: boolean;
  Component?: React.ComponentType;
}

const Button = forwardRef<HTMLButtonElement, Props>((props, buttonRef) => {
  const {
    className,
    variant = "primary",
    size = "md",
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = "button",
    ...rest
  } = props;

  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variantStyles = {
    primary:
      "bg-upwork-green text-white hover:bg-upwork-green-dark focus-visible:ring-upwork-green",
    secondary:
      "bg-upwork-background text-upwork-gray hover:bg-upwork-background-alt focus-visible:ring-upwork-gray",
    outline:
      "border border-upwork-gray-lighter bg-transparent hover:bg-upwork-background focus-visible:ring-upwork-gray",
  };

  const sizeStyles = {
    sm: "h-8 px-4 text-sm",
    md: "h-10 px-5",
    lg: "h-12 px-6 text-lg",
  };

  const loadingStyles = loading ? "opacity-70 cursor-wait" : "";

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([useRef(null), buttonRef])}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        loadingStyles,
        className
      )}
      disabled={disabled || loading}
      style={{ width, ...style }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="flex pl-2 m-0">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
        </i>
      )}
    </Component>
  );
});
Button.displayName = "Button";

export { Button };
