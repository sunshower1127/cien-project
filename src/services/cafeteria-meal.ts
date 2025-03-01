interface Response {
  data: {
    cafeteria: string;
    type: "중식" | "석식";
    operatingHours: string;
    menu: string[];
  }[];
}

export async function fetchCafeteriaMeal() {
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
      {
        cafeteria: "참슬기 식당",
        type: "중식",
        operatingHours: "11:00~13:00",
        menu: ["김가루후리가케밥", "두부미소된장국", "튀긴꼬치어묵&칠리소스", "매콤떡볶이", "무순단무지무침", "발렌타인초코베이비슈", "그린야채샐러드/소스", "배추김치"],
      },
      {
        cafeteria: "해뜨는집",
        type: "석식",
        operatingHours: "17:30~19:00",
        menu: ["흑미밥", "소고기무국", "제육볶음", "감자채볶음", "어묵야채볶음", "오이소박이", "계절과일"],
      },
      {
        cafeteria: "한울식당",
        type: "중식",
        operatingHours: "11:30~13:30",
        menu: ["잡곡밥", "된장찌개", "닭갈비", "김치전", "열무김치", "요구르트"],
      },
      {
        cafeteria: "참슬기 식당",
        type: "석식",
        operatingHours: "17:00~18:30",
        menu: ["치킨커리라이스", "유부우동국물", "치즈스틱&케찹", "단호박샐러드", "오복지무침", "수제요거트푸딩", "배추김치", "바나나"],
      },
      {
        cafeteria: "학생회관",
        type: "중식",
        operatingHours: "11:00~14:00",
        menu: ["순두부찌개", "생선까스", "비빔만두", "시금치나물", "쫄면무침", "계란말이", "총각김치", "사과주스"],
      },
    ],
  };
  return data;
}
