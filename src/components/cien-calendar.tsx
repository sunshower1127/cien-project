import { Card } from "./ui/card";

const calendarURL =
  "https://calendar.google.com/calendar/u/0/embed?height=650&wkst=1&bgcolor=%23ffffff&ctz=Asia/Seoul&mode=MONTH&title&showCalendars=0&showTabs=0&showPrint=0&showDate=1&showNav=0&showTitle=1&showTz=1&src=Y2llbmNhbGVuZGFyQGdtYWlsLmNvbQ&src=cWR1YXRyM3NldXI4MzVwazRhb2xvazI5MDBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%232a63af&color=%23C0CA33";
export default function CienCalendar() {
  return (
    <Card className="h-[360.79px] w-full p-0">
      <iframe className="h-full w-full rounded-[20px]" src={calendarURL} title="Google Calendar"></iframe>
    </Card>
  );
}
