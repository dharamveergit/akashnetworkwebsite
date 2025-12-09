import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex  items-center justify-center rounded-lg font-medium gap-x-1.5 leading-none not-prose",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary/90",
        secondary:
          "border border-border text-textGray hover:bg-gray-50 dark:hover:bg-darkGray bg-background2 shadow-sm ",
        tagButton: `border border-[#D1D5DB] text-[#889096] hover:bg-gray-50 bg-white shadow-sm`,
      },
      size: {
        xs: "px-2 py-1 text-xs rounded",
        sm: "px-2 py-1 text-sm rounded",
        md: "px-2 py-1 lg:px-2.5 lg:py-1.5 text-sm rounded-md",
        lg: "px-2.5 py-1.5 lg:px-3 lg:py-2 text-sm rounded-md",
        xl: "px-3 py-2 lg:px-3.5 lg:py-2.5 text-sm rounded-md",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);
