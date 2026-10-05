import { Reveal, type RevealDirection } from "../../motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  duration?: number;
  direction?: RevealDirection;
  threshold?: number;
  rootMargin?: string;
  animationClass?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = "",
  delay = 0,
  distance = 18,
  duration = 580,
  direction = "up",
  threshold = 0.1,
  rootMargin = "0px 0px -20px 0px",
}) => {
  return (
    <Reveal
      direction={direction}
      distance={distance}
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
