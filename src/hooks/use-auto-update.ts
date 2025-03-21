import { retryRate } from "@/services/constants/time";
import { isNullish } from "@/utils/utils";
import { useEffect, useState } from "react";

/** callback엔 useCallback 권장. options는 useMemo안써도 됨*/
export default function useAutoUpdate<DataType>(callback: () => Promise<DataType> | DataType, options: { intervalMs?: number; scheduledHours?: number[] }) {
  options.scheduledHours?.sort((a, b) => a - b); // 정확한 의존성 비교를 위해서 정렬

  const [data, setData] = useState<DataType>();

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>;
    let isMounted = true;
    let retryIntervalId: ReturnType<typeof setInterval> | undefined;

    const updateData = async () => {
      try {
        const resp = await Promise.resolve(callback());
        if (!isNullish(resp) && isMounted) {
          setData(resp);
          if (retryIntervalId) {
            clearInterval(retryIntervalId);
            retryIntervalId = undefined;
          }
        }
      } catch (e) {
        console.error(e);
        if (!retryIntervalId) {
          retryIntervalId = setInterval(async () => {
            try {
              const resp = await Promise.resolve(callback());
              if (!isNullish(resp) && isMounted) {
                setData(resp);
                clearInterval(retryIntervalId!);
                retryIntervalId = undefined;
              }
            } catch (err) {
              console.error("Retry attempt failed:", err);
            }
          }, retryRate);
        }
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
      updateData();
      scheduleNextCall();
    } else if (options.intervalMs) {
      updateData();
      timerId = setInterval(updateData, options.intervalMs);
    } else {
      console.warn("No scheduling interval provided");
    }

    return () => {
      if (options.scheduledHours) {
        clearTimeout(timerId);
      } else {
        clearInterval(timerId);
      }
      if (retryIntervalId) {
        clearInterval(retryIntervalId);
      }
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, JSON.stringify(options)]);

  return data;
}
