import useError from "@/lib/sw-toolkit/hooks/useError";
import useRefCallback from "@/lib/sw-toolkit/hooks/useRefCallback";
import { HTMLProps } from "@/lib/sw-toolkit/types/html";
import { cn } from "@/lib/sw-toolkit/utils/style";
import { delay } from "es-toolkit";
import { useState } from "react";

export interface OnSlideProps {
  prevIndex: number;
  prevElement: Element;
  index: number;
  element: Element;
  container: Element;
}

/** onSlide는 useCallback 권장 */
export default function AutoScrollSlider({
  onSlide,
  className,
  children,
  ...props
}: HTMLProps<"section"> & {
  onSlide: ({ prevIndex, prevElement, index, element, container }: OnSlideProps) => number | Promise<number>;
}) {
  useError({ onInfiniteRendering: "throwError" });
  const [index, setIndex] = useState(0);

  const handleRef = useRefCallback<"div">(
    async ({ element: container, isNotMounted }) => {
      const itemCount = container.childElementCount;
      if (itemCount === 0) return;
      const prevIndex = (index - 1 + itemCount) % itemCount;
      const prevElement = container.children[prevIndex];
      const element = container.children[index];

      element.scrollIntoView({ behavior: "smooth" });
      const duration = await Promise.resolve(onSlide({ prevIndex, prevElement, index, element, container }));

      if (isNotMounted()) return;
      await delay(duration);

      if (isNotMounted()) return;
      setIndex((prev) => (prev + 1) % itemCount);
    },
    [onSlide, index],
  );

  return (
    <section aria-label="slider" className={cn("flex flex-row gap-[10px] overflow-hidden", className)} ref={handleRef} {...props}>
      {children}
    </section>
  );
}
