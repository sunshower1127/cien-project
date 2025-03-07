import { isNullish } from "@/utils/utils";
import { useEffect, useState } from "react";

/** callback엔 useCallback 권장. options는 useMemo안써도 됨 immediate 기본값은 true*/
export default function useAutoUpdate<DataType>(
  callback: () => Promise<DataType> | DataType,
  options: { intervalMs?: number; scheduledHours?: number[]; immediate?: boolean },
) {
  options.scheduledHours?.sort((a, b) => a - b); // 정확한 의존성 비교를 위해서 정렬

  const [data, setData] = useState<DataType>();

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>;

    const updateData = async () => {
      try {
        const resp = await Promise.resolve(callback());
        if (!isNullish(resp)) {
          setData(resp);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (options.scheduledHours && options.scheduledHours.length > 0) {
      const scheduleNextCall = () => {
        const now = new Date();
        let nextHour = options.scheduledHours!.find((hour) => hour > now.getHours());
        const nextCall = new Date(now);
        if (nextHour === undefined) {
          nextHour = options.scheduledHours![0];
          nextCall.setDate(nextCall.getDate() + 1);
        }
        nextCall.setHours(nextHour, 0, 0, 0);
        const delay = nextCall.getTime() - now.getTime();
        timerId = setTimeout(() => {
          updateData();
          scheduleNextCall();
        }, delay);
      };
      if (options.immediate !== false) updateData();
      scheduleNextCall();
    } else if (options.intervalMs) {
      if (options.immediate !== false) updateData();
      timerId = setInterval(updateData, options.intervalMs);
    } else {
      console.warn("No scheduling interval provided");
    }

    return () => (options.scheduledHours ? clearTimeout(timerId) : clearInterval(timerId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, JSON.stringify(options)]);

  return data;
}
