import { subwayArrivalUpdateRate } from "@/constants/time";
import { fetchSubwayData } from "@/services/subway";
import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import Label from "./ui/label";

export default function SubwayArrival() {
  const [uplineMsgs, setUplineMsgs] = useState<string[]>();
  const [downlineMsgs, setDownlineMsgs] = useState<string[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetchSubwayData();
        if (resp) {
          setDownlineMsgs(resp.하행);
          setUplineMsgs(resp.상행);
          console.log("열차 시간 새로고침");
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();

    const subwayArrivalInterval = setInterval(fetchData, subwayArrivalUpdateRate);
    return () => clearInterval(subwayArrivalInterval);
  }, []);

  // TODO: 시간 감소 기능?

  const DownlineContent = () => (
    <CardContent className="flex flex-col items-center gap-[8px]">
      <h6 className="title-md">개화행</h6>
      {downlineMsgs?.map((msg, index) => {
        if (index === 0) {
          return <Label key={msg}>{msg}</Label>;
        } else {
          return (
            <div className="action-md text-(--cien-gray-500)" key={msg}>
              {msg}
            </div>
          );
        }
      }) ?? <Label>현재 열차 정보가 없습니다</Label>}
    </CardContent>
  );

  const UplineContent = () => (
    <CardContent className="flex flex-col items-center gap-[8px]">
      <h6 className="title-md">중앙보훈병원행</h6>
      {uplineMsgs?.map((msg, index) => {
        if (index === 0) {
          return <Label key={msg}>{msg}</Label>;
        } else {
          return (
            <div className="action-md text-(--cien-gray-500)" key={msg}>
              {msg}
            </div>
          );
        }
      }) ?? <Label>현재 열차 정보가 없습니다</Label>}
    </CardContent>
  );

  return (
    <Card className="w-(--sm-width) text-center">
      <CardTitle className="title-lg">지하철 도착 정보</CardTitle>
      <DownlineContent />
      <UplineContent />
    </Card>
  );
}
