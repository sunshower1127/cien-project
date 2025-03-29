import useSafeEffect, { SafeEffectContext, SafeEffectOptions } from "./useSafeEffect";

export type SafeIntervalOptions<RefObject> = {
  immediatelyRun?: boolean;
} & SafeEffectOptions<RefObject>;

export type SafeIntervalContext<RefObject> = {
  exit: () => void;
} & SafeEffectContext<RefObject>;

/**
 * 일정 간격으로 콜백 함수를 실행하는 커스텀 훅
 * @param callback 실행할 콜백 함수. defer와 exit 함수를 제공받음
 * @param dependency 의존성 배열
 * @param intervalMs 실행 간격 (밀리초)
 * @param options
 * - immediatelyRun 초기 실행 여부 (기본값: true)
 * - enabled 활성화 여부 (기본값: true)
 * - ref 참조 객체
 */
export default function useSafeInterval<ValidType extends object | undefined = undefined>(
  callback: (context: SafeIntervalContext<ValidType>) => Promise<unknown> | unknown,
  dependency: React.DependencyList,
  intervalMs: number,
  options?: SafeIntervalOptions<ValidType>,
): void {
  useSafeEffect(
    (effectCtx) => {
      let isExit = false;

      /** you must use with return like `return exit()` */
      const exit = (): void => {
        isExit = true;
      };

      const intervalCtx = { ...effectCtx, exit };

      // 초기 실행이 설정되어 있으면 콜백 실행
      if (options?.immediatelyRun !== false) {
        Promise.resolve(callback(intervalCtx));
      }

      // 인터벌 설정
      let id: NodeJS.Timeout | null = null;
      id = setInterval(() => {
        if (isExit && id !== null) {
          clearInterval(id);
        } else {
          Promise.resolve(callback(intervalCtx));
        }
      }, intervalMs);

      // 클린업 로직
      effectCtx.defer(() => {
        if (id !== null) clearInterval(id);
      });
    },
    dependency,
    options,
  );
}
