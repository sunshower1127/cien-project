import { isNil } from "@/lib/sw-toolkit/utils/utils";
import useSafeEffect, { SafeEffectContext, SafeEffectOptions } from "./useSafeEffect";

/**
 * 동적인 간격으로 콜백 함수를 실행하는 커스텀 훅
 * @param callback 실행할 콜백 함수. 반환값이 다음 실행 간격이 됨 (밀리초)
 * @param dependency 의존성 배열
 * @param options
 * - enabled 활성화 여부 (기본값: true)
 */
export default function useSafeDynamicInterval<ValidType extends object | undefined = undefined>(
  callback: (context: SafeEffectContext<ValidType>) => Promise<number | null | undefined> | number | null | undefined,
  dependency: React.DependencyList,
  options?: SafeEffectOptions<ValidType>,
) {
  useSafeEffect(
    (effectCtx) => {
      let nextTimeoutId: NodeJS.Timeout | null = null;
      effectCtx.defer(() => {
        if (nextTimeoutId !== null) clearTimeout(nextTimeoutId);
      });

      // 다음 실행을 예약하는 함수
      const scheduleNext = async () => {
        if (effectCtx.isNotMounted()) return;

        const nextInterval = await Promise.resolve(callback(effectCtx));

        if (isNil(nextInterval) || effectCtx.isNotMounted()) return;
        nextTimeoutId = setTimeout(scheduleNext, nextInterval);
      };

      scheduleNext();
    },
    dependency,
    options,
  );
}
