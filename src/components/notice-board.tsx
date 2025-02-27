import { noticeBoardUpdateRate } from "@/constants/time";
import { fetchNoticeBoard } from "@/services/notice-board";
import { useEffect, useState } from "react";
import { Card, CardTitle } from "./ui/card";

export default function NoticeBoard() {
  const [data, setData] = useState<Awaited<ReturnType<typeof fetchNoticeBoard>>>();
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetchNoticeBoard();
        if (resp) {
          setData(resp);
          console.log("공지사항 새로고침 완료");
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();

    const noticeBoardInterval = setInterval(fetchData, noticeBoardUpdateRate);

    return () => clearInterval(noticeBoardInterval);
  }, []);
  return (
    <Card className="w-(--lg-width) flex-1 bg-(--cien-blue-100) px-[32px] py-[24px] text-white">
      <CardTitle className="title-lg">
        최근 공지사항
        <span className="title-sm pl-[20px]">공지사항 세부내용 확인을 위해서는 디스코드 알림-공지 채널을 확인해주세요</span>
      </CardTitle>
      <ul className="gap-12px title-lg flex flex-col px-[24px] *:truncate">{data?.map(({ content }) => <li key={content}>{content}</li>) ?? <li>공지사항 정보가 없습니다</li>}</ul>
    </Card>
  );
}

// TODO: 공지사항 개수가 많으면 어떻게?
