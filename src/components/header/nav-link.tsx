import { cn } from "@/lib/utils"; // Adjust the import path if necessary
import React from "react";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  arrowIcon?: boolean;
  currentPath?: string;
}

const NavLink: React.FC<Props> = ({
  arrowIcon = false,
  currentPath,
  href,
  ...props
}) => {
  return (
    <a
      {...props}
      href={href}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center text-sm font-medium leading-normal hover:text-primary xl:text-sm",
        href?.startsWith(currentPath || "") && currentPath !== "/"
          ? "text-primary"
          : "",
      )}
    >
      {props.children}
      {arrowIcon && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.30469 10.6569L10.9615 5M10.9615 5H6.0118M10.9615 5V9.94978"
            stroke="#272540"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </a>
  );
};

export default NavLink;
