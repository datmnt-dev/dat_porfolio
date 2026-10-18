import { Reveal, type RevealDirection, type RevealVariant } from "../../motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  className?: string;
  delay?: number;
  distance?: number;
  scale?: number;
  duration?: number;
  direction?: RevealDirection;
  threshold?: number;
  rootMargin?: string;
  animationClass?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant,
  className = "",
  delay = 0,
  distance,
  scale,
  duration,
  direction,
  threshold,
  rootMargin,
}) => {
  return (
    <Reveal
      variant={variant}
      direction={direction}
      distance={distance}
      scale={scale}
      delay={delay}
      threshold={threshold}
      duration={duration}
      rootMargin={rootMargin}
      className={className}
    >
      {children}
    </Reveal>
  );
};

export default ScrollReveal;
