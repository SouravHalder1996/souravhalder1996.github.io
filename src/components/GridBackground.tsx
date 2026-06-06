export default function GridBackground() {
  return (
    <div 
      className="absolute inset-x-0 top-0 -z-10 h-[calc(100%+160px)] w-full overflow-hidden"
      style={{
        maskImage: "radial-gradient(ellipse 70vw 60vh at 50vw 50vh, black 85%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 70vw 60vh at 50vw 50vh, black 85%, transparent 100%)",
      }}
    >
      {/* Repeating 1px grid pattern */}
      <div 
        className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,rgba(128,128,128,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" 
      />
      {/* Soft top blur and solid-to-transparent gradient overlay to seamlessly fade grids under navbar */}
      <div 
        className="absolute top-0 left-0 right-0 h-72 bg-background transition-colors duration-300 pointer-events-none z-10"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 100%)",
        }}
      />
      {/* Soft overlay gradients for depth - slate/zinc to prevent any teal color cast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,var(--foreground)/1.5%,transparent_80%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_800px,var(--foreground)/1%,transparent_70%)] pointer-events-none" />
    </div>
  );
}
