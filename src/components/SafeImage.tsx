"use client";

import React, { useState, useEffect } from "react";
import { ImageIcon } from "lucide-react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  className?: string;
}

export default function SafeImage({
  src,
  alt,
  className = "",
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(!src);

  // Reset error state when src changes
  useEffect(() => {
    setHasError(!src);
  }, [src]);

  if (hasError || !src) {
    return (
      <div
        className={`flex items-center justify-center text-muted-foreground/30 ${className}`}
        aria-label={alt}
      >
        <ImageIcon className="w-4 h-4 opacity-40" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
}
