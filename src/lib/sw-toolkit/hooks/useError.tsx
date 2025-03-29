import { HTMLProps } from "@/lib/sw-toolkit/types/html";
import { cn } from "@/lib/sw-toolkit/utils/style";
import { useRef, useState } from "react";
import useSafeInterval from "./useSafeInterval";

const renderingCountResetInterval = 1000;
const renderingCountThreshold = 100;

/**
 * 오류 상태를 관리하고 무한 렌더링을 감지하는 커스텀 훅
 *
 * @param optionsj
 * - onInfiniteRendering: 무한 렌더링 감지 시 처리 방식
 *  - - off: 무한 렌더링 감지를 끔 (기본값)
 *  - - throwError: 무한 렌더링 감지 시 오류를 throw함
 *  - - setError: 무한 렌더링 감지 시 오류 상태를 설정함
 *
 * @returns
 * - error - 현재 발생한 오류 객체
 * - setError - 오류 상태를 설정하는 함수
 * - throwError - 오류를 직접 throw하는 유틸리티 함수
 * - ErrorComponent - 오류를 시각적으로 표시하는 컴포넌트
 */
export default function useError(options: { onInfiniteRendering?: "throwError" | "setError" | "off" } = {}) {
  const [error, setError] = useState<Error | null | undefined>();
  const [throwedError, throwError] = useState<Error | undefined>();
  const renderingCountRef = useRef(0);
  renderingCountRef.current += 1;

  if (throwedError) {
    throw throwedError;
  }

  if (renderingCountRef.current > renderingCountThreshold) {
    if (options.onInfiniteRendering === "setError") {
      setError(new Error("Infinite rendering detected"));
    } else if (options.onInfiniteRendering === "throwError") {
      throwError(new Error("Infinite rendering detected"));
    }
  }

  useSafeInterval(
    ({ exit }) => {
      if (options.onInfiniteRendering === "off") return exit();

      renderingCountRef.current = 0;
    },
    [],
    renderingCountResetInterval,
  );

  return { error, setError, throwError, ErrorComponent };
}

function ErrorComponent({
  error,
  className,
}: HTMLProps<"div"> & {
  error: Error;
}) {
  return (
    <div className={cn("h-full w-full text-center", className)}>
      <h1 className="mb-4 text-2xl font-bold">Error Occurred</h1>
      <p className="mb-2">{error.message}</p>
      {error.stack && (
        <details className="rounded border border-red-300 bg-red-50 p-2" open={false}>
          <summary className="cursor-pointer font-semibold">Stack Trace</summary>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap">{error.stack}</pre>
        </details>
      )}
    </div>
  );
}
