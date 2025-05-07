"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  imageHeight?: number;
  lines?: number;
}

export function SkeletonCard({
  className,
  imageHeight = 200,
  lines = 3,
  ...props
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-4 w-full space-y-4",
        className
      )}
      {...props}
    >
      <Skeleton className={`w-full h-[${imageHeight}px] rounded-lg`} />
      <Skeleton className="h-8 w-3/4" />
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}

interface SkeletonGridProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  count?: number;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  imageHeight?: number;
  lines?: number;
}

export function SkeletonGrid({
  className,
  count = 3,
  columns = { sm: 1, md: 2, lg: 3 },
  imageHeight = 200,
  lines = 3,
  ...props
}: SkeletonGridProps) {
  const gridClass = cn(
    "grid gap-6",
    columns.sm && `grid-cols-1`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    className
  );

  return (
    <div className={gridClass} {...props}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard
          key={i}
          imageHeight={imageHeight}
          lines={lines}
        />
      ))}
    </div>
  );
}
