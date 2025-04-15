import Card from "@/components/ui/card";
import api, { refetchInterval } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export default function NoticeBoard() {
  const query = useQuery({ queryKey: ["notice"], queryFn: () => api.siso.getNotices(), refetchInterval: refetchInterval.notice });

  return (
    <Card size="lg" theme="dark" className="flex-1">
      <Card.Section className="flex-row items-end gap-[20px]">
        <Card.Title>최근 공지사항</Card.Title>
        <Card.SubText>공지사항 세부내용 확인을 위해서는 디스코드 알림-공지 채널을 확인해주세요</Card.SubText>
      </Card.Section>

      <Card.Data
        query={query}
        render={(data) => (
          <ul className="title-lg flex flex-col gap-[12px] px-[24px] *:truncate">
            {data.map(({ id, date, notice }) => (
              <li key={id}>
                {date} {notice}
              </li>
            ))}
          </ul>
        )}
      ></Card.Data>
    </Card>
  );
}
