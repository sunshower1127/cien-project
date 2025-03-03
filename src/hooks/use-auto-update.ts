import { isNullish } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function useAutoUpdate<DataType>(intervalMs: number, callback: () => Promise<DataType> | DataType) {
  const [data, setData] = useState<DataType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 콜백함수를 받을때 async일 수도 아닐 수도 있을때 Promise.resolve로 감쌈.
        const resp = await Promise.resolve(callback());
        if (!isNullish(resp)) {
          setData(resp);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();

    const intervalID = setInterval(fetchData, intervalMs);

    return () => clearInterval(intervalID);
  }, [callback, intervalMs]);

  return data;
}
