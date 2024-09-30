import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  enablePasswordToggle?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, enablePasswordToggle, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const currentType = enablePasswordToggle ? ( showPassword ? 'text': 'password' ): type;

    const handleTooglePassword = () => {
      setShowPassword((prev) => !prev);
    }

    return (
      <div className="relative w-full">
        <input
          type={currentType}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {
          enablePasswordToggle && (
            <button
              type="button"
              onClick={handleTooglePassword}
              className="absolute inset-y-0 right-3 flex items-center text-sm focus:outline-none"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )
        }
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
