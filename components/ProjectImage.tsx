import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  label?: string;
  index?: number;
  sizes?: string;
  priority?: boolean;
};

const tones = [
  "from-sky/60 via-sky/20",
  "from-moon/30 via-sky/25",
  "from-sky/40 via-midnight",
];

// Parent ko `relative` aur koi aspect/height dena zaroori hai
export default function ProjectImage({ src, alt, label, index = 0, sizes, priority }: Props) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`absolute inset-0 bg-gradient-to-br ${tones[index % tones.length]} to-midnight`}
    >
      {/* Browser window jaisa mock */}
      <div className="absolute inset-[9%] overflow-hidden rounded-2xl border border-moon/25 bg-night/70 backdrop-blur-sm">
        <div className="flex items-center gap-1.5 border-b border-moon/15 px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-sky" />
          <span className="h-2 w-2 rounded-full bg-moon/40" />
          <span className="h-2 w-2 rounded-full bg-moon/20" />
        </div>
        <div className="space-y-3 p-5">
          <div className="h-3 w-1/3 rounded-full bg-sky/70" />
          <div className="h-3 w-2/3 rounded-full bg-moon/30" />
          <div className="h-3 w-1/2 rounded-full bg-moon/20" />
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="h-16 rounded-xl bg-moon/10 sm:h-24" />
            <div className="h-16 rounded-xl bg-sky/20 sm:h-24" />
            <div className="h-16 rounded-xl bg-moon/10 sm:h-24" />
          </div>
        </div>
        {label && (
          <p className="absolute bottom-4 left-5 font-display text-2xl text-moon/80">{label}</p>
        )}
      </div>
    </div>
  );
}