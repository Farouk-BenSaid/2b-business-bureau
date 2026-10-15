/** Quiet background motif: the lake. Decorative only. */
export default function Waves({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1200 400" preserveAspectRatio="none" className={className} fill="none">
      {Array.from({ length: 8 }).map((_, i) => (
        <path
          key={i}
          d={`M0 ${110 + i * 28} C 200 ${80 + i * 28}, 400 ${150 + i * 28}, 600 ${110 + i * 28} S 1000 ${70 + i * 28}, 1200 ${110 + i * 28}`}
          stroke="currentColor"
          strokeWidth="1"
          opacity={0.55 - i * 0.055}
        />
      ))}
    </svg>
  );
}
