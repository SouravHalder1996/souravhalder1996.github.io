"use client";

import React, { useEffect, useRef } from "react";

interface Packet {
  trackIndex: number;
  progress: number; // 0 to 1 along track length
  speed: number;
  size: number;
  opacity: number;
  tailLength: number;
}

interface TrackPoint {
  xPercent: number; // 0 to 1
  yPercent: number; // 0 to 1
}

interface Track {
  points: TrackPoint[];
  width: number;
  isDashed?: boolean;
}

export default function CircuitGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Scroll tracking for momentum
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let currentScrollY = window.scrollY;

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      scrollVelocity += delta * 0.025; // Calm, subtle scroll impulse
      lastScrollY = window.scrollY;
      currentScrollY = window.scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Theme detection
    const isDark = () => document.documentElement.classList.contains("dark");

    // Grid config matching Hero section 32px precision
    const gridSize = 32;
    const majorGridStep = 4; // every 128px

    // Clean VERTICAL circuit tracks (margin guide rails only - NO horizontal cross lines)
    const tracks: Track[] = [
      // Left Outer Vertical Rail
      {
        points: [
          { xPercent: 0.035, yPercent: 0.0 },
          { xPercent: 0.035, yPercent: 0.35 },
          { xPercent: 0.05, yPercent: 0.4 },
          { xPercent: 0.05, yPercent: 0.7 },
          { xPercent: 0.035, yPercent: 0.75 },
          { xPercent: 0.035, yPercent: 1.0 },
        ],
        width: 1.2,
      },
      // Left Inner Vertical Rail
      {
        points: [
          { xPercent: 0.075, yPercent: 0.0 },
          { xPercent: 0.075, yPercent: 0.55 },
          { xPercent: 0.06, yPercent: 0.6 },
          { xPercent: 0.06, yPercent: 0.9 },
          { xPercent: 0.075, yPercent: 0.95 },
          { xPercent: 0.075, yPercent: 1.0 },
        ],
        width: 1.0,
        isDashed: true,
      },
      // Right Inner Vertical Rail
      {
        points: [
          { xPercent: 0.925, yPercent: 0.0 },
          { xPercent: 0.925, yPercent: 0.4 },
          { xPercent: 0.94, yPercent: 0.45 },
          { xPercent: 0.94, yPercent: 0.75 },
          { xPercent: 0.925, yPercent: 0.8 },
          { xPercent: 0.925, yPercent: 1.0 },
        ],
        width: 1.0,
        isDashed: true,
      },
      // Right Outer Vertical Rail
      {
        points: [
          { xPercent: 0.965, yPercent: 0.0 },
          { xPercent: 0.965, yPercent: 0.25 },
          { xPercent: 0.95, yPercent: 0.3 },
          { xPercent: 0.95, yPercent: 0.65 },
          { xPercent: 0.965, yPercent: 0.7 },
          { xPercent: 0.965, yPercent: 1.0 },
        ],
        width: 1.2,
      },
    ];

    // Minimal count & calm, slowed-down pulse dots
    const packetCount = 4; // Reduced frequency
    const packets: Packet[] = [];

    for (let i = 0; i < packetCount; i++) {
      packets.push({
        trackIndex: i % tracks.length,
        progress: (i / packetCount) + Math.random() * 0.15,
        speed: 0.00025 + Math.random() * 0.0002, // Slowed down cruising speed
        size: 2.5 + Math.random() * 1.2,
        opacity: 0.65 + Math.random() * 0.25,
        tailLength: 8 + Math.random() * 8,
      });
    }

    // Helper: Calculate (x, y) along a polyline track
    const getTrackPosition = (track: Track, t: number, w: number, h: number) => {
      const points = track.points;
      if (points.length < 2) return { x: 0, y: 0 };

      const segments: { p1: { x: number; y: number }; p2: { x: number; y: number }; len: number }[] = [];
      let totalLength = 0;

      for (let i = 0; i < points.length - 1; i++) {
        const p1 = { x: points[i].xPercent * w, y: points[i].yPercent * h };
        const p2 = { x: points[i + 1].xPercent * w, y: points[i + 1].yPercent * h };
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        segments.push({ p1, p2, len });
        totalLength += len;
      }

      const targetDist = ((t % 1) + 1) % 1 * totalLength;
      let accumulated = 0;

      for (const seg of segments) {
        if (accumulated + seg.len >= targetDist) {
          const segT = (targetDist - accumulated) / (seg.len || 1);
          return {
            x: seg.p1.x + (seg.p2.x - seg.p1.x) * segT,
            y: seg.p1.y + (seg.p2.y - seg.p1.y) * segT,
          };
        }
        accumulated += seg.len;
      }

      const last = points[points.length - 1];
      return { x: last.xPercent * w, y: last.yPercent * h };
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const dark = isDark();

      // STRICT GRAYSCALE PALETTE - More subtle & calm
      const gridStroke = dark ? "rgba(255, 255, 255, 0.024)" : "rgba(100, 116, 139, 0.055)";
      const majorGridStroke = dark ? "rgba(255, 255, 255, 0.048)" : "rgba(100, 116, 139, 0.10)";
      const crosshairColor = dark ? "rgba(255, 255, 255, 0.12)" : "rgba(100, 116, 139, 0.20)";
      const trackStroke = dark ? "rgba(148, 163, 184, 0.18)" : "rgba(100, 116, 139, 0.25)";
      const padStroke = dark ? "rgba(203, 213, 225, 0.30)" : "rgba(100, 116, 139, 0.38)";
      const padFill = dark ? "rgba(15, 23, 42, 0.9)" : "rgba(255, 255, 255, 0.95)";

      // 1. Draw 32px Blueprint Grid (Matching Hero section grid)
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = gridStroke;
      ctx.beginPath();

      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }

      const scrollOffset = currentScrollY % gridSize;
      for (let y = -gridSize; y <= height + gridSize; y += gridSize) {
        ctx.moveTo(0, y - scrollOffset);
        ctx.lineTo(width, y - scrollOffset);
      }
      ctx.stroke();

      // 2. Major Grid Coordinate Crosshairs (+)
      ctx.lineWidth = 1;
      ctx.strokeStyle = majorGridStroke;
      ctx.fillStyle = crosshairColor;

      const majorStepPx = gridSize * majorGridStep;
      const majorScrollOffset = currentScrollY % majorStepPx;

      for (let x = majorStepPx; x < width; x += majorStepPx) {
        for (let y = -majorStepPx; y <= height + majorStepPx; y += majorStepPx) {
          const cy = y - majorScrollOffset;
          const arm = 3.5;
          ctx.beginPath();
          ctx.moveTo(x - arm, cy);
          ctx.lineTo(x + arm, cy);
          ctx.moveTo(x, cy - arm);
          ctx.lineTo(x, cy + arm);
          ctx.stroke();
        }
      }

      // 3. Draw Vertical Circuit Rails & Grayscale Node Rings
      tracks.forEach((track) => {
        if (track.points.length < 2) return;

        ctx.save();
        ctx.strokeStyle = trackStroke;
        ctx.lineWidth = track.width;

        if (track.isDashed) {
          ctx.setLineDash([4, 5]);
        } else {
          ctx.setLineDash([]);
        }

        ctx.beginPath();
        const first = track.points[0];
        ctx.moveTo(first.xPercent * width, first.yPercent * height);

        for (let i = 1; i < track.points.length; i++) {
          const pt = track.points[i];
          ctx.lineTo(pt.xPercent * width, pt.yPercent * height);
        }
        ctx.stroke();

        // Terminal node pads (grayscale rings)
        track.points.forEach((pt, idx) => {
          const px = pt.xPercent * width;
          const py = pt.yPercent * height;

          ctx.fillStyle = padFill;
          ctx.strokeStyle = padStroke;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(px, py, idx === 0 || idx === track.points.length - 1 ? 3.0 : 2.0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        });

        ctx.restore();
      });

      // 4. Update and Draw Flowing Grayscale Pulse Dots
      scrollVelocity *= 0.94; // Smooth decay
      const effectiveVelocity = scrollVelocity * 0.0001;

      packets.forEach((pkt) => {
        pkt.progress += pkt.speed + effectiveVelocity;
        if (pkt.progress > 1) pkt.progress -= 1;
        if (pkt.progress < 0) pkt.progress += 1;

        const track = tracks[pkt.trackIndex];
        const pos = getTrackPosition(track, pkt.progress, width, height);

        ctx.save();

        // Subtle grayscale tail
        const tailCount = 4;
        for (let t = 1; t <= tailCount; t++) {
          const tailProgress = pkt.progress - t * 0.003;
          const tailPos = getTrackPosition(track, tailProgress, width, height);
          const alpha = (1 - t / tailCount) * 0.22 * pkt.opacity;

          ctx.fillStyle = dark
            ? `rgba(255, 255, 255, ${alpha})`
            : `rgba(71, 85, 105, ${alpha})`;
          ctx.beginPath();
          ctx.arc(tailPos.x, tailPos.y, pkt.size * (1 - t / (tailCount + 2)), 0, Math.PI * 2);
          ctx.fill();
        }

        // Soft grayscale radial halo (NO color / NO green)
        const glowRad = pkt.size * 3.0;
        const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowRad);
        if (dark) {
          grad.addColorStop(0, `rgba(255, 255, 255, ${0.4 * pkt.opacity})`);
          grad.addColorStop(0.5, `rgba(226, 232, 240, ${0.1 * pkt.opacity})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        } else {
          grad.addColorStop(0, `rgba(71, 85, 105, ${0.3 * pkt.opacity})`);
          grad.addColorStop(0.5, `rgba(100, 116, 139, ${0.08 * pkt.opacity})`);
          grad.addColorStop(1, "rgba(100, 116, 139, 0)");
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, glowRad, 0, Math.PI * 2);
        ctx.fill();

        // Core Dot (Monochrome crisp dot)
        ctx.fillStyle = dark ? "#ffffff" : "#334155";
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pkt.size * 0.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // 5. Subtle monochrome telemetry labels
      ctx.save();
      ctx.fillStyle = dark ? "rgba(148, 163, 184, 0.2)" : "rgba(100, 116, 139, 0.26)";
      ctx.font = "9px monospace";
      ctx.fillText("BUS_L // 0x48", width * 0.035 + 8, 48);
      ctx.fillText("BUS_R // 0x92", width * 0.965 - 72, 48);
      ctx.restore();

      // 6. Smooth blend into invisible mode at Top-Left and Top-Right corners towards Navbar
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";

      const blendRadius = Math.max(320, Math.min(width * 0.32, 540));

      // Top-Left Corner Blend
      const tlGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, blendRadius);
      tlGrad.addColorStop(0, "rgba(0, 0, 0, 1)");
      tlGrad.addColorStop(0.35, "rgba(0, 0, 0, 0.85)");
      tlGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.35)");
      tlGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = tlGrad;
      ctx.beginPath();
      ctx.arc(0, 0, blendRadius, 0, Math.PI * 2);
      ctx.fill();

      // Top-Right Corner Blend
      const trGrad = ctx.createRadialGradient(width, 0, 0, width, 0, blendRadius);
      trGrad.addColorStop(0, "rgba(0, 0, 0, 1)");
      trGrad.addColorStop(0.35, "rgba(0, 0, 0, 0.85)");
      trGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.35)");
      trGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = trGrad;
      ctx.beginPath();
      ctx.arc(width, 0, blendRadius, 0, Math.PI * 2);
      ctx.fill();

      // Top Header / Navbar subtle soft edge blend
      const topGrad = ctx.createLinearGradient(0, 0, 0, 75);
      topGrad.addColorStop(0, "rgba(0, 0, 0, 0.65)");
      topGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.25)");
      topGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, width, 75);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
