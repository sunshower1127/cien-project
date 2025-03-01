import { airPollutionUpdateRate } from "@/constants/time";
import { fetchAirPollution, getPM10Color, getPM25Color } from "@/services/air-pollution";
import { useEffect, useState } from "react";
import { Card, CardTitle } from "./ui/card";
import Label from "./ui/label";

export default function AirPollution() {
  const [data, setData] = useState<{ pm10: number; pm25: number }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetchAirPollution();
        if (resp) {
          setData(resp);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
    const airPollutionInterval = setInterval(fetchData, airPollutionUpdateRate);

    return () => clearInterval(airPollutionInterval);
  }, []);

  let Content = () => <div>현재 데이터가 존재하지 않습니다</div>;

  // TODO: 이게 파란색 노란색 빨간색 뭐 이렇게 미세먼지에 따라서 색을 다르게 해야하는지
  if (data) {
    Content = () => (
      <>
        <Label className="pl-[16px]" style={{ backgroundColor: getPM10Color(data.pm10) }}>
          미세먼지 : {data.pm10} ㎍/㎥
        </Label>
        <Label className="" style={{ backgroundColor: getPM25Color(data.pm25) }}>
          초미세먼지 : {data.pm25} ㎍/㎥
        </Label>
      </>
    );
  }

  return (
    <Card className="w-(--sm-width) items-center">
      <CardTitle className="title-lg">동작구 대기 정보</CardTitle>
      <Content />
    </Card>
  );
}
