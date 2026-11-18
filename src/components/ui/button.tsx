import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** shadcn/ui-style Button, themed for Call Jack Pro. */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-display italic font-bold tracking-tight transition-[transform,background-color,box-shadow] duration-150 disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "rounded-xl border-2 border-ink bg-brand text-ink shadow-pop hover:-translate-y-0.5 hover:bg-[#ffd633] active:translate-y-0.5 active:shadow-none",
        outline:
          "rounded-xl border-2 border-ink bg-paper text-ink hover:bg-cream active:translate-y-0.5",
        dark: "rounded-xl border-2 border-ink bg-ink text-paper hover:bg-[#2a2a2a]",
        ghost: "rounded-lg text-ink hover:bg-mist",
      },
      size: {
        sm: "min-h-11 px-4 text-sm [&_svg]:size-4",
        md: "min-h-12 px-5 text-base [&_svg]:size-5",
        lg: "min-h-14 px-6 text-lg sm:text-xl [&_svg]:size-6",
        xl: "min-h-16 px-7 text-xl sm:text-2xl [&_svg]:size-7",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
