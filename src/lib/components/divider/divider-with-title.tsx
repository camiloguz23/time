"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DividerWithTitleProps {
  title: string;
  className?: string;
  titleClassName?: string;
}

export function DividerWithTitle({
  title,
  className,
  titleClassName,
}: DividerWithTitleProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <hr className="flex-1 border-gray-200 dark:border-gray-800" />
      <span className={cn("text-sm text-gray-700 dark:text-white font-thin italic", titleClassName)}>
        {title}
      </span>
      <hr className="flex-1 border-gray-200 dark:border-gray-800" />
    </div>
  );
}
