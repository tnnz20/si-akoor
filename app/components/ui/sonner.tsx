import { Toaster as Sonner } from 'sonner';

import { CircleCheck, Info, LoaderCircle, OctagonX, TriangleAlert } from 'lucide-react';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheck className="h-4 w-4 text-emerald-600" />,
        info: <Info className="h-4 w-4 text-indigo-600" />,
        warning: <TriangleAlert className="h-4 w-4 text-amber-600" />,
        error: <OctagonX className="h-4 w-4 text-rose-600" />,
        loading: <LoaderCircle className="h-4 w-4 animate-spin text-neutral-600" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-2xl',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
