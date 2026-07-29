import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import useRevealInView from "../../hooks/useRevealInView";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  initialDelay?: number;
  wordDelay?: number;
}

const getAccessibleText = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (!isValidElement(node)) return "";
  if (node.type === "br") return " ";
  const element = node as ReactElement<{ children?: ReactNode }>;
  return Children.toArray(element.props.children).map(getAccessibleText).join("");
};

const TextReveal = ({
  children,
  className = "",
  initialDelay = 0,
  wordDelay = 55,
}: TextRevealProps) => {
  const { ref, isVisible } = useRevealInView<HTMLSpanElement>();
  let wordIndex = 0;

  const renderNode = (node: ReactNode): ReactNode => {
    if (typeof node === "string" || typeof node === "number") {
      return String(node)
        .split(/(\s+)/)
        .map((part) => {
          if (!part) return null;
          if (/^\s+$/.test(part)) return part;

          const index = wordIndex++;
          return (
            <span className="text-reveal-word-mask" key={`${part}-${index}`}>
              <span
                className="text-reveal-word"
                style={{ "--word-index": index } as CSSProperties}
              >
                {part}
              </span>
            </span>
          );
        });
    }

    if (!isValidElement(node) || node.type === "br") return node;

    const element = node as ReactElement<{ children?: ReactNode }>;
    return cloneElement(element, {
      ...element.props,
      children: Children.map(element.props.children, renderNode),
    });
  };

  const style = {
    "--text-delay": `${initialDelay}ms`,
    "--word-delay": `${wordDelay}ms`,
  } as CSSProperties;

  return (
    <span
      ref={ref}
      className={`text-reveal ${isVisible ? "is-visible" : ""} ${className}`}
      style={style}
      aria-label={getAccessibleText(children).replace(/\s+/g, " ").trim()}
    >
      <span aria-hidden="true">{Children.map(children, renderNode)}</span>
    </span>
  );
};

export default TextReveal;
