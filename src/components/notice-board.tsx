import { noticeBoardUpdateRate } from "@/constants/time";
import useAutoUpdate from "@/hooks/use-auto-update";
import { fetchNoticeBoard } from "@/services/notice-board";
import Card from "./ui/card";

export default function NoticeBoard() {
  const data = useAutoUpdate(noticeBoardUpdateRate, fetchNoticeBoard);

  return (
    <Card size="lg" theme="dark" className="flex-1">
      <Card.Section className="flex-row items-end gap-[20px]">
        <Card.Title>최근 공지사항</Card.Title>
        <Card.SubText>공지사항 세부내용 확인을 위해서는 디스코드 알림-공지 채널을 확인해주세요</Card.SubText>
      </Card.Section>

      <ul className="title-lg flex flex-col gap-[12px] px-[24px] *:truncate">
        {data?.map((content) => <li key={content}>{content}</li>) ?? <li>공지사항 정보가 없습니다</li>}
      </ul>
    </Card>
  );
}
