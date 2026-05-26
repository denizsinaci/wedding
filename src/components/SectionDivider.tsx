import { FloralOrnament } from './FloralOrnament';

type Props = {
  label?: string;
  className?: string;
};

export function SectionDivider({ label, className }: Props) {
  if (!label) {
    return (
      <div className={`flex items-center justify-center ${className ?? ''}`}>
        <FloralOrnament variant="divider" className="w-72 md:w-96" />
      </div>
    );
  }
  return (
    <div className={`flex items-center justify-center gap-5 ${className ?? ''}`}>
      <span className="hidden sm:block h-px w-24 md:w-36 bg-gradient-to-r from-transparent to-[#B08D55]/60" />
      <span className="font-display italic text-plum text-sm md:text-base tracking-[0.32em] uppercase whitespace-nowrap">
        {label}
      </span>
      <span className="hidden sm:block h-px w-24 md:w-36 bg-gradient-to-l from-transparent to-[#B08D55]/60" />
    </div>
  );
}
