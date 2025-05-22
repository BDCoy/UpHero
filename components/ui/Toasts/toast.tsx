import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';


const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-xs sm:max-w-sm',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastStyles = {
  default: {
    icon: Info,
    containerClass: 'bg-gray-800 text-white shadow-lg',
  },
  destructive: {
    icon: AlertCircle,
    containerClass: 'bg-red-600 text-white shadow-lg',
  },
  success: {
    icon: CheckCircle,
    containerClass: 'bg-green-600 text-white shadow-lg',
  },
};

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & { variant?: keyof typeof toastStyles }
>(({ className, variant = 'default', children, ...props }, ref) => {
  const { icon: Icon, containerClass } = toastStyles[variant] || toastStyles.default;

  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(
        'flex items-center gap-3 rounded-lg p-4',
        containerClass,
        className
      )}
      {...props}
    >
      <Icon className="h-6 w-6 flex-shrink-0" />
      <div className="flex-1 text-sm font-medium leading-snug">{children}</div>
      <ToastPrimitives.Close
        className="inline-flex items-center justify-center rounded-full p-1 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </ToastPrimitives.Close>
    </ToastPrimitives.Root>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm font-semibold leading-tight', className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90 leading-normal', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 items-center justify-center rounded-md border border-white/30 bg-white/10 px-3 text-sm font-semibold text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = ToastPrimitives.Close;
ToastClose.displayName = ToastPrimitives.Close.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
