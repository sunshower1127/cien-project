import useAutoUpdate from "@/hooks/use-auto-update";
import { calendarUpdateRate } from "@/services/constants/time";
import { calendarURL } from "@/services/constants/url";
import { useCallback, useState } from "react";
import Card from "./ui/card";

// TODO: 잘되는지 체크해보기
export default function CienCalendar() {
  const [src, setSrc] = useState(calendarURL);

  useAutoUpdate(
    useCallback(() => {
      // 쿼리 파라미터를 추가하여 새로고침
      setSrc(`${calendarURL}?refresh=${Date.now()}`);
    }, []),
    { intervalMs: calendarUpdateRate },
  );

  return (
    <Card size="md" className="flex-1 p-0">
      <iframe className="h-full w-full" src={src} title="Google Calendar"></iframe>
    </Card>
  );
}
