import React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex w-full border-b-[1.5px] border-[#8C9C96] bg-transparent py-2 text-sm text-[#233B35] transition-colors placeholder:text-[#8C9C96] focus-visible:border-[#B87E58] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
