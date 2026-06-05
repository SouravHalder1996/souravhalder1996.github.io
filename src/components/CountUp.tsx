"use client";

import { useEffect, useState, useRef } from "react";

export default function CountUp({
  end,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [value, setValue] = useState(0);
  const countRef = useRef(false);

  useEffect(() => {
    if (countRef.current) return;
    countRef.current = true;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing out quad formula: slowing down toward the end
      const easedProgress = progress * (2 - progress);
      const currentVal = easedProgress * end;
      
      setValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
