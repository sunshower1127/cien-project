import { cn } from "@/lib/utils";
import { HTMLProps } from "@/types/html";
import { useEffect, useRef, useState } from "react";

export interface onSlideArgs {
  prevIndex: number;
  prevElement: Element;
  index: number;
  element: Element;
  container: Element;
}

export default function AutoScrollSlider({
  onSlide,
  className,
  children,
  ...props
}: HTMLProps<"section"> & {
  onSlide: ({ prevIndex, prevElement, index, element, container }: onSlideArgs) => number;
}) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef?.current) return;
    const container = containerRef.current;

    const prevIndex = index === 0 ? container.childElementCount - 1 : index - 1;
    const prevElement = container.children[prevIndex];
    const element = container.children[index];

    element.scrollIntoView({ behavior: "smooth", inline: "start" });

    const duration = onSlide({ prevIndex, prevElement, index, element, container });

    const timeoutID = setTimeout(() => setIndex((prev) => (prev === container.childElementCount - 1 ? 0 : prev + 1)), duration);

    return () => clearTimeout(timeoutID);
  }, [index, onSlide]); // onSlide은 부모에서 useCallback으로 메모이제이션 권장

  return (
    <section aria-label="slider" className={cn("flex flex-row gap-[10px] overflow-hidden", className)} ref={containerRef} {...props}>
      {children}
    </section>
  );
}
