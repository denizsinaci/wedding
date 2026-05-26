type Props = {
  className?: string;
  variant?: 'sprig' | 'wreath' | 'leaf' | 'divider';
  flip?: boolean;
};

export function FloralOrnament({ className, variant = 'sprig', flip }: Props) {
  const transform = flip ? 'scale(-1, 1)' : undefined;

  if (variant === 'wreath') {
    return (
      <svg
        viewBox="0 0 200 200"
        className={className}
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform={transform} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="100" cy="100" r="70" stroke="#B08D55" strokeWidth="0.6" opacity="0.4" />
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const x = 100 + Math.cos(a) * 70;
            const y = 100 + Math.sin(a) * 70;
            return (
              <g key={i} transform={`translate(${x} ${y}) rotate(${(a * 180) / Math.PI + 90})`}>
                <ellipse cx="0" cy="-6" rx="3.5" ry="8" fill="#D8A7A0" opacity="0.85" />
                <ellipse cx="6" cy="0" rx="8" ry="3.5" fill="#A8B89A" opacity="0.7" />
                <ellipse cx="-6" cy="0" rx="8" ry="3.5" fill="#A8B89A" opacity="0.7" />
              </g>
            );
          })}
        </g>
      </svg>
    );
  }

  if (variant === 'leaf') {
    return (
      <svg viewBox="0 0 120 40" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
        <g transform={transform} stroke="#8AA083" strokeWidth="1" fill="none" strokeLinecap="round">
          <path d="M 5 20 Q 60 -5 115 20" />
          <g fill="#A8B89A">
            <ellipse cx="25" cy="15" rx="6" ry="2.5" transform="rotate(-25 25 15)" />
            <ellipse cx="45" cy="9" rx="7" ry="2.8" transform="rotate(-15 45 9)" />
            <ellipse cx="65" cy="7" rx="7" ry="2.8" transform="rotate(-5 65 7)" />
            <ellipse cx="85" cy="9" rx="7" ry="2.8" transform="rotate(8 85 9)" />
            <ellipse cx="105" cy="15" rx="6" ry="2.5" transform="rotate(20 105 15)" />
          </g>
        </g>
      </svg>
    );
  }

  if (variant === 'divider') {
    return (
      <svg viewBox="0 0 240 24" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="12" x2="95" y2="12" stroke="#B08D55" strokeWidth="0.8" opacity="0.6" />
        <line x1="145" y1="12" x2="240" y2="12" stroke="#B08D55" strokeWidth="0.8" opacity="0.6" />
        <g transform="translate(120 12)">
          <g fill="#D8A7A0">
            <ellipse cx="0" cy="-5" rx="2.4" ry="4.2" />
            <ellipse cx="5" cy="0" rx="4.2" ry="2.4" />
            <ellipse cx="0" cy="5" rx="2.4" ry="4.2" />
            <ellipse cx="-5" cy="0" rx="4.2" ry="2.4" />
          </g>
          <circle r="1.6" fill="#B08D55" />
        </g>
      </svg>
    );
  }

  // sprig: a flowering branch
  return (
    <svg viewBox="0 0 260 160" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <g transform={transform}>
        <path
          d="M 10 140 C 70 120, 110 90, 150 60 S 230 30, 250 20"
          stroke="#8AA083"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* leaves */}
        <g fill="#A8B89A" opacity="0.85">
          <ellipse cx="60" cy="120" rx="10" ry="3.6" transform="rotate(-22 60 120)" />
          <ellipse cx="95" cy="98" rx="11" ry="4" transform="rotate(-18 95 98)" />
          <ellipse cx="135" cy="74" rx="11" ry="4" transform="rotate(-12 135 74)" />
          <ellipse cx="175" cy="55" rx="10" ry="3.6" transform="rotate(-6 175 55)" />
          <ellipse cx="215" cy="38" rx="9" ry="3.4" transform="rotate(2 215 38)" />
        </g>
        {/* flowers */}
        <g>
          <g transform="translate(110 86)">
            <g fill="#D8A7A0">
              <ellipse cx="0" cy="-6" rx="3" ry="6" />
              <ellipse cx="6" cy="0" rx="6" ry="3" />
              <ellipse cx="0" cy="6" rx="3" ry="6" />
              <ellipse cx="-6" cy="0" rx="6" ry="3" />
            </g>
            <circle r="2" fill="#B08D55" />
          </g>
          <g transform="translate(160 62)">
            <g fill="#B08FA0">
              <ellipse cx="0" cy="-5" rx="2.6" ry="5.2" />
              <ellipse cx="5" cy="0" rx="5.2" ry="2.6" />
              <ellipse cx="0" cy="5" rx="2.6" ry="5.2" />
              <ellipse cx="-5" cy="0" rx="5.2" ry="2.6" />
            </g>
            <circle r="1.7" fill="#B08D55" />
          </g>
          <g transform="translate(208 38)">
            <g fill="#D8A7A0">
              <ellipse cx="0" cy="-4" rx="2.2" ry="4.4" />
              <ellipse cx="4" cy="0" rx="4.4" ry="2.2" />
              <ellipse cx="0" cy="4" rx="2.2" ry="4.4" />
              <ellipse cx="-4" cy="0" rx="4.4" ry="2.2" />
            </g>
            <circle r="1.5" fill="#B08D55" />
          </g>
        </g>
      </g>
    </svg>
  );
}
