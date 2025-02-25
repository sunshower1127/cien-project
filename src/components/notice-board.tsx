import { Card, CardTitle } from "./ui/card";

export default function NoticeBoard() {
  return (
    <Card className="w-(--lg-width) flex-1 bg-(--cien-blue-100) px-[32px] py-[24px] text-white">
      <CardTitle className="title-lg">
        최근 공지사항
        <span className="title-sm pl-[20px]">공지사항 세부내용 확인을 위해서는 디스코드 알림-공지 채널을 확인해주세요</span>
      </CardTitle>
      <ul className="gap-12px title-lg flex flex-col px-[24px] *:truncate">
        <li>2025. 02. 01. 동아리 정보화 서비스 일시 중단 예정 안내</li>
        <li>2025. 01. 25. [리마인드] 2025 겨울방학 게임분석스터디 수요 조사</li>
        <li>2025. 01. 21. [리마인드] 이렇게까지 긴 공지 이름은 없겠지 ㄹㅇㅋㅋ 현수님 골드 기원 1일차 </li>
      </ul>
    </Card>
  );
}
