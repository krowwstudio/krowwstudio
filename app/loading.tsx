export default function Loading() {
  return (
    <div className="fixed top-0 inset-x-0 z-[200] h-0.5 bg-primary/15 overflow-hidden">
      <div
        className="h-full bg-primary origin-left"
        style={{
          animation: "loading-bar 1.2s cubic-bezier(0.22,1,0.36,1) forwards",
        }}
      />
      <style>{`
        @keyframes loading-bar {
          0%   { transform: scaleX(0); }
          60%  { transform: scaleX(0.75); }
          100% { transform: scaleX(0.9); }
        }
      `}</style>
    </div>
  );
}
