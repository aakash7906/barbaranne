import React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full border-b-[1.5px] border-[#8C9C96] bg-transparent py-2 text-sm text-[#233B35] transition-colors placeholder:text-[#8C9C96] focus-visible:border-[#B87E58] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
