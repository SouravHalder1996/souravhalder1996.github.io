"use client";

import { useEffect, useRef } from "react";

interface GridNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  rippleIntensity: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  strength: number;
}

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const nodesRef = useRef<GridNode[]>([]);
  const isDarkRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const spacing = 32; // Clean grid spacing
    let cols = 0;
    let rows = 0;

    // Track theme changes dynamically
    const checkTheme = () => {
      isDarkRef.current = document.documentElement.classList.contains("dark");
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const initGrid = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      // Note: canvas height is based on the extended container height
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

      cols = Math.ceil(width / spacing) + 1;
      rows = Math.ceil(height / spacing) + 1;

      const nodes: GridNode[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing;
          const y = r * spacing;
          nodes.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            rippleIntensity: 0,
          });
        }
      }
      nodesRef.current = nodes;
    };

    const resize = () => {
      initGrid();
    };

    window.addEventListener("resize", resize);
    initGrid();

    // Trigger a slow, subtle ripple
    const spawnSubtleRipple = () => {
      if (document.hidden) return;

      const x = Math.random() * width;
      const y = Math.random() * height;
      ripplesRef.current.push({
        x,
        y,
        radius: 16, // Start as a tiny mini-circle (0.5 block)
        maxRadius: Math.random() * 16 + 48, // Max 1.5 to 2 blocks range (reduced by 2 blocks)
        speed: 0.6, // Very slow expansion
        strength: 0.25, // Mild coordinate warping
      });
    };

    // Spawn every 3 seconds
    const spawnInterval = setInterval(spawnSubtleRipple, 3000);
    setTimeout(spawnSubtleRipple, 500);

    // Let user click to spawn a subtle ripple wave
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripplesRef.current.push({
        x,
        y,
        radius: 16, // Start as a tiny mini-circle
        maxRadius: 64, // Max 2 blocks (reduced by 2 blocks)
        speed: 0.8,
        strength: 0.35,
      });
    };

    canvas.addEventListener("click", handleCanvasClick);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const ripples = ripplesRef.current;
      const isDark = isDarkRef.current;

      // Update ripples
      ripplesRef.current = ripples.map((r) => {
        r.radius += r.speed;
        return r;
      }).filter((r) => r.radius < r.maxRadius);

      // Physics & Node updates
      const springK = 0.02; // soft, subtle rebound
      const damping = 0.88; // smooth return to base

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.rippleIntensity = 0; // Reset active state

        // Apply wave forces
        for (let j = 0; j < ripples.length; j++) {
          const r = ripples[j];
          const dx = node.x - r.x;
          const dy = node.y - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 0) {
            const waveWidth = 16; // Narrower wave front matching smaller radius
            const diff = Math.abs(dist - r.radius);

            if (diff < waveWidth) {
              // Smooth sine-based warp shape shift
              const force = Math.sin((diff / waveWidth) * Math.PI) * r.strength;
              const angle = Math.atan2(dy, dx);
              
              // Mild dislocation
              node.vx += Math.cos(angle) * force * 3;
              node.vy += Math.sin(angle) * force * 3;

              // Record wave intensity for line dissolution & particle mapping
              node.rippleIntensity = Math.max(node.rippleIntensity, force);
            }
          }
        }

        // Return to base coordinates via Spring physics
        const ax = (node.baseX - node.x) * springK;
        const ay = (node.baseY - node.y) * springK;

        node.vx = (node.vx + ax) * damping;
        node.vy = (node.vy + ay) * damping;
        node.x += node.vx;
        node.y += node.vy;
      }

      // Draw grid lines and particles
      ctx.lineWidth = 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const node = nodes[idx];

          if (!node) continue;

          // Bottom Fade: grid smoothly fades out over the bottom 200px of extended canvas
          const bottomFade = node.baseY < height - 200 
            ? 1 
            : Math.max(0, 1 - (node.baseY - (height - 200)) / 200);
            
          // Corner vignette is handled directly by CSS mask-image on the container
          const baseAlpha = bottomFade;
          if (baseAlpha <= 0) continue;

          // Draw active ripple particles (same color as grid, matching thickness weight)
          if (node.rippleIntensity > 0.05) {
            const particleAlpha = baseAlpha * node.rippleIntensity;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2); // Small clean dot
            ctx.fillStyle = isDark 
              ? `rgba(255, 255, 255, ${0.12 * particleAlpha})` 
              : `rgba(15, 17, 21, ${0.12 * particleAlpha})`;
            ctx.fill();
          }

          // Connect to right neighbor
          if (c < cols - 1) {
            const rightNeighbor = nodes[idx + 1];
            if (rightNeighbor) {
              const maxIntensity = Math.max(node.rippleIntensity, rightNeighbor.rippleIntensity);
              const lineAlpha = baseAlpha * (1 - maxIntensity);
              
              if (lineAlpha > 0.01) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(rightNeighbor.x, rightNeighbor.y);
                ctx.strokeStyle = isDark 
                  ? `rgba(255, 255, 255, ${0.07 * lineAlpha})` 
                  : `rgba(15, 17, 21, ${0.07 * lineAlpha})`;
                ctx.stroke();
              }
            }
          }

          // Connect to bottom neighbor
          if (r < rows - 1) {
            const bottomNeighbor = nodes[idx + cols];
            if (bottomNeighbor) {
              const maxIntensity = Math.max(node.rippleIntensity, bottomNeighbor.rippleIntensity);
              const lineAlpha = baseAlpha * (1 - maxIntensity);
              
              if (lineAlpha > 0.01) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(bottomNeighbor.x, bottomNeighbor.y);
                ctx.strokeStyle = isDark 
                  ? `rgba(255, 255, 255, ${0.07 * lineAlpha})` 
                  : `rgba(15, 17, 21, ${0.07 * lineAlpha})`;
                ctx.stroke();
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(spawnInterval);
      canvas.removeEventListener("click", handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      className="absolute inset-x-0 top-0 -z-10 h-[calc(100%+160px)] w-full overflow-hidden cursor-crosshair"
      style={{
        maskImage: "radial-gradient(ellipse 70vw 60vh at 50vw 50vh, black 85%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 70vw 60vh at 50vw 50vh, black 85%, transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      {/* Soft overlay gradients for depth - neutral slate/zinc to prevent any teal color cast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,var(--foreground)/1.5%,transparent_80%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_800px,var(--foreground)/1%,transparent_70%)] pointer-events-none" />
    </div>
  );
}
