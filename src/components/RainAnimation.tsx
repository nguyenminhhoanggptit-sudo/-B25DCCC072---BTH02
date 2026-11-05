interface Drop {
  id: number;
  left: number;
  width: number;
  height: number;
  opacity: number;
  duration: number;
  delay: number;
}

const DROP_COUNT = 70;
const rand = (min: number, max: number) => min + Math.random() * (max - min);

const DROPS: Drop[] = Array.from({ length: DROP_COUNT }, (_, id) => ({
  id,
  left: rand(0, 105),
  width: rand(1, 2),
  height: rand(40, 90),
  opacity: rand(0.25, 0.6),
  duration: rand(0.7, 1.4),
  delay: -rand(0, 2),
}));

interface RainAnimationProps {
  thunder?: boolean;
}

export default function RainAnimation({ thunder = false }: RainAnimationProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden motion-reduce:hidden"
    >
      {DROPS.map((drop) => (
        <span
          key={drop.id}
          className="animate-rain-fall absolute -top-24 block rounded-full bg-linear-to-b from-transparent to-white"
          style={{
            left: `${drop.left}%`,
            width: `${drop.width}px`,
            height: `${drop.height}px`,
            opacity: drop.opacity,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}
      {thunder && (
        <div className="animate-flash absolute inset-0 bg-white opacity-0" />
      )}
    </div>
  );
}
