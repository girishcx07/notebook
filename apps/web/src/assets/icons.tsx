import * as React from "react";
import { LucideProps } from "lucide-react";

export const GoogleIcon = React.forwardRef<SVGSVGElement, LucideProps>(
  ({ size = 24, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        {...props}
      >
        <path
          fill="#FFC107"
          d="M43.611 20.083H42V20H24v8h11.303C33.664 32.657 29.24 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 
          12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 
          4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 
          20-20c0-1.341-.138-2.65-.389-3.917z"
        />
        <path
          fill="#FF3D00"
          d="M6.306 14.691l6.571 4.819C14.655 16.108 19.002 12 24 
          12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 
          4c-7.682 0-14.318 4.337-17.694 10.691z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.188 0 9.86-1.977 13.409-5.193l-6.19-5.238C29.211 35.091 
          26.715 36 24 36c-5.219 0-9.628-3.317-11.303-8.043l-6.522 
          5.025C9.505 39.556 16.227 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.611 20.083H42V20H24v8h11.303c-.798 
          2.341-2.231 4.401-4.084 5.957l6.19 
          5.238C36.971 39.273 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
        />
      </svg>
    );
  },
);

GoogleIcon.displayName = "GoogleIcon";

export const GitHubIcon = React.forwardRef<SVGSVGElement, LucideProps>(
  ({ size = 24, strokeWidth = 2, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path
          d="M9 19c-5 1.5-5-2.5-7-3m14 
        6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 
        6.44-1.54 6.44-7A5.44 5.44 0 0 0 
        20 4.77 5.07 5.07 0 0 0 19.91 
        1S18.73.65 16 2.48a13.38 13.38 0 0 
        0-8 0C5.27.65 4.09 1 4.09 
        1A5.07 5.07 0 0 0 4 
        4.77a5.44 5.44 0 0 0-1.5 
        3.78c0 5.42 3.3 6.61 6.44 
        7A3.37 3.37 0 0 0 8 
        18.13V22"
        />
      </svg>
    );
  },
);

GitHubIcon.displayName = "GitHubIcon";
