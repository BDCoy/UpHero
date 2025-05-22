"use client";

import React from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

import { ToastType, useToastStore } from "@/lib/store/toast";
import { cn } from "@/lib/utils";

const toastStyles: Record<
  ToastType,
  { icon: React.ElementType; containerClass: string }
> = {
  success: {
    icon: CheckCircle,
    containerClass: "bg-upwork-green text-white",
  },
  error: {
    icon: AlertCircle,
    containerClass: "bg-red-600 text-white",
  },
  info: {
    icon: Info,
    containerClass: "bg-upwork-gray text-white",
  },
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => {
        const { icon: Icon, containerClass } = toastStyles[toast.type];

        return (
          <div
            key={toast.id}
            className={cn(
              "flex items-center gap-2 py-3 px-4 rounded-lg shadow-lg min-w-[300px] max-w-[500px] animate-in slide-in-from-right-5",
              containerClass
            )}
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-full hover:bg-black/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
