"use client";

import React from "react";

interface SectionHeaderDotGridProps {
  className?: string;
  rows?: number;
  cols?: number;
}

export default function SectionHeaderDotGrid({
  className = "",
  rows = 5,
  cols = 5,
}: SectionHeaderDotGridProps) {
  const dotSpacing = 12;
  const dotRadius = 1.5;
  const width = cols * dotSpacing;
  const height = rows * dotSpacing;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
      className={`absolute -top-4 -left-4 z-0 pointer-events-none text-primary/45 dark:text-primary/55 transition-opacity ${className}`}
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={c * dotSpacing + dotSpacing / 2}
            cy={r * dotSpacing + dotSpacing / 2}
            r={dotRadius}
            fill="currentColor"
          />
        ))
      )}
    </svg>
  );
}
