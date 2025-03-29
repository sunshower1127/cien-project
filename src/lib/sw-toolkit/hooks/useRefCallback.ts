import { useCallback } from "react";

export type RefCallbackContext<ElementType> = {
  isNotMounted: () => boolean;
  defer: (callback: () => void) => void;
  element: ElementType;
};

interface ShortCut {
  div: HTMLDivElement;
  span: HTMLSpanElement;
  p: HTMLParagraphElement;
  img: HTMLImageElement;
  button: HTMLButtonElement;
  a: HTMLAnchorElement;
  input: HTMLInputElement;
  textarea: HTMLTextAreaElement;
  form: HTMLFormElement;
  select: HTMLSelectElement;
  ul: HTMLUListElement;
  ol: HTMLOListElement;
}

// 타입 헬퍼 추가
type ElementTypeResolver<T> = T extends keyof ShortCut ? ShortCut[T] : T extends HTMLElement ? T : never;

export default function useRefCallback<T extends keyof ShortCut | HTMLElement = HTMLElement>(
  callback: (context: RefCallbackContext<ElementTypeResolver<T>>) => Promise<unknown> | unknown,
  dependency: React.DependencyList,
): (element: ElementTypeResolver<T> | null) => void {
  const callbackFn = useCallback((element: ElementTypeResolver<T> | null) => {
    if (element === null) return;

    const cleanUpFns: Array<() => unknown> = [];

    const defer = (callback: () => unknown) => {
      cleanUpFns.push(callback);
    };

    let isMounted = true;
    defer(() => {
      isMounted = false;
    });
    const isNotMounted = () => !isMounted;

    const context = { isNotMounted, defer, element };

    Promise.resolve(callback(context));

    return () => cleanUpFns.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependency);

  return callbackFn;
}
