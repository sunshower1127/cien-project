import { isNotEmpty } from "@/lib/sw-toolkit/utils/utils";
import { useEffect } from "react";

export type ValidItems<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

export type SafeEffectContext<ValidType> = {
  isNotMounted: () => boolean;
  defer: (callback: () => void) => void;
  valid: ValidType extends object ? ValidItems<ValidType> : undefined;
};

export type SafeEffectOptions<ValidType> = {
  valid?: ValidType;
};

/**
 * @param callback 실행할 콜백 함수. isMounted, defer 함수 및 유효한 값들을 제공받음
 * @param dependency 의존성 배열
 * @param options
 * - enabled 활성화 여부 (기본값: true)
 * - valid 유효성을 검사할 객체들. 모든 값이 null이나 undefined가 아닌 경우에만 effect가 실행됨
 */
export default function useSafeEffect<ValidType extends object | undefined = undefined>(
  callback: (context: SafeEffectContext<ValidType>) => Promise<unknown> | unknown,
  dependency: React.DependencyList,
  options?: SafeEffectOptions<ValidType>,
): void {
  useEffect(() => {
    const cleanUpFns: Array<() => unknown> = [];

    // valid 옵션 체크 - 모든 속성이 null이나 undefined가 아닌지 검사
    const validItems = options?.valid;
    if (validItems) {
      const allValid = Object.values(validItems).every((value) => isNotEmpty(value));
      if (!allValid) {
        return;
      }
    }

    const defer = (callback: () => unknown): void => {
      cleanUpFns.push(callback);
    };

    let isMounted = true;
    defer(() => {
      isMounted = false;
    });

    const isNotMounted = () => !isMounted;

    // 유효한 값들만 context에 전달
    const context = {
      isNotMounted,
      defer,
      valid: validItems as ValidType extends object ? ValidItems<ValidType> : undefined,
    };

    Promise.resolve(callback(context));

    return () => cleanUpFns.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependency, ...(options?.valid ? Object.values(options.valid) : [])]); // valid의 모든 값들을 의존성 배열에 추가
}
