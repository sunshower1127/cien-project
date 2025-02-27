interface Response {
  data: { content: string }[];
}

export async function fetchNoticeBoard() {
  //   const resp = await fetch(apiURL);
  //   if (resp.status === 200) {
  //     const {data} = await resp.json() as Response
  //     return data;
  //   } else if (resp.status === 304) {
  //     return null;
  //   } else {
  //     throw new Error(`${resp.status}: ${resp.statusText}`);
  //   //   }
  // dummy for test
  const { data }: Response = {
    data: [
      { content: "2025. 02. 01. 동아리 정보화 서비스 일시 중단 예정 안내" },
      { content: "2025. 01. 25. [리마인드] 2025 겨울방학 게임분석스터디 수요 조사" },
      { content: "2025. 01. 21. [리마인드] 이렇게까지 긴 공지 이름은 없겠지 ㄹㅇㅋㅋ 현수님 골드 기원 1일차 " },
    ],
  };
  return data;
}
