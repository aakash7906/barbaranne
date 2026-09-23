import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B87E58] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#B87E58] text-white hover:bg-[#A36B46] shadow-sm",
        outline:
          "border border-[#B87E58] bg-transparent text-[#B87E58] hover:bg-[#B87E58] hover:text-white",
        outlineDark:
          "border border-[#2E4942] bg-transparent text-[#2E4942] hover:bg-[#2E4942] hover:text-white",
        ghost:
          "hover:bg-[#F6F6EE] text-[#2E4942]",
        link:
          "text-[#B87E58] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-9 py-3",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-10 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
