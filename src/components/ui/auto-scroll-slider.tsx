import { HTMLProps } from "@/types/html";
import { cn } from "@/utils/utils";
import { useCallback, useState } from "react";

export interface onSlideProps {
  prevIndex: number;
  prevElement: Element;
  index: number;
  element: Element;
  container: Element;
}

/** onSlide는 useMemo 권장 */
export default function AutoScrollSlider({
  onSlide,
  className,
  children,
  ...props
}: HTMLProps<"section"> & {
  onSlide: ({ prevIndex, prevElement, index, element, container }: onSlideProps) => number;
}) {
  const [index, setIndex] = useState(0);

  const handleRef = useCallback(
    (container: HTMLDivElement) => {
      const prevIndex = index === 0 ? container.childElementCount - 1 : index - 1;
      const prevElement = container.children[prevIndex];
      const element = container.children[index];

      element.scrollIntoView({ behavior: "smooth", inline: "start" });

      const duration = onSlide({ prevIndex, prevElement, index, element, container });

      const timeoutID = setTimeout(() => setIndex((prev) => (prev === container.childElementCount - 1 ? 0 : prev + 1)), duration);

      return () => clearTimeout(timeoutID);
    },
    [index, onSlide],
  );

  return (
    <section aria-label="slider" className={cn("flex flex-row gap-[10px] overflow-hidden", className)} ref={handleRef} {...props}>
      {children}
    </section>
  );
}
