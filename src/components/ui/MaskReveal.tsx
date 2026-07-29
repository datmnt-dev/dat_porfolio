import type { CSSProperties, ReactNode } from "react";
import useRevealInView from "../../hooks/useRevealInView";

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const MaskReveal = ({
  children,
  className = "",
  delay = 0,
}: MaskRevealProps) => {
  const { ref, isVisible } = useRevealInView<HTMLDivElement>();
  const style = { "--mask-delay": `${delay}ms` } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`mask-reveal ${isVisible ? "is-visible" : ""} ${className}`}
      style={style}
    >
      <div className="mask-reveal-inner">{children}</div>
    </div>
  );
};

export default MaskReveal;
