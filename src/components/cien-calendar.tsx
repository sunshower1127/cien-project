import { calendarUpdateRate } from "@/constants/time";
import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";

const calendarURL =
  "https://calendar.google.com/calendar/u/0/embed?height=650&wkst=1&bgcolor=%23ffffff&ctz=Asia/Seoul&mode=MONTH&title&showCalendars=0&showTabs=0&showPrint=0&showDate=1&showNav=0&showTitle=1&showTz=1&src=Y2llbmNhbGVuZGFyQGdtYWlsLmNvbQ&src=cWR1YXRyM3NldXI4MzVwazRhb2xvazI5MDBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%232a63af&color=%23C0CA33";

export default function CienCalendar() {
  const [timestamp, setTimestamp] = useState(Date.now());
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // 정해진 간격으로 캘린더 새로고침
    const intervalId = setInterval(() => {
      // 방법 1: 타임스탬프를 변경해 URL을 갱신
      setTimestamp(Date.now());

      // 방법 2: iframe을 직접 새로고침 (대체 방법)
      // if (iframeRef.current && iframeRef.current.contentWindow) {
      //   iframeRef.current.contentWindow.location.reload();
      // }
    }, calendarUpdateRate);

    return () => clearInterval(intervalId);
  }, []);

  // 캐시 방지를 위해 타임스탬프 추가
  const calendarURLWithTimestamp = `${calendarURL}&_=${timestamp}`;

  return (
    <Card className="h-[360.79px] w-full p-0">
      <iframe ref={iframeRef} className="h-full w-full rounded-[20px]" src={calendarURLWithTimestamp} title="Google Calendar"></iframe>
    </Card>
  );
}
