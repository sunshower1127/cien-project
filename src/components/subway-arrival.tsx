import { fetchSubwayData } from "@/services/subway";
import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import Label from "./ui/label";

const refreshIntervalSecs = 5;

export default function SubwayArrival() {
  const [uplineMsgs, setUplineMsgs] = useState<string[]>();
  const [downlineMsgs, setDownlineMsgs] = useState<string[]>();

  useEffect(() => {
    const fetchInterval = setInterval(async () => {
      try {
        const resp = await fetchSubwayData();
        if (resp) {
          setDownlineMsgs(resp.하행);
          setUplineMsgs(resp.상행);
        }
      } catch (e) {
        console.error(e);
      }
    }, refreshIntervalSecs * 1000);

    return () => clearInterval(fetchInterval);
  }, []);

  useEffect(() => {
    const timeDecrementInterval = setInterval(() => {}, 1000);

    return () => clearInterval(timeDecrementInterval);
  });

  const DownlineContent = () => (
    <CardContent className="flex flex-col items-center gap-[8px]">
      <h6 className="title-md">개화행</h6>
      {downlineMsgs?.map((msg, index) => {
        if (index === 0) {
          return <Label>{msg}</Label>;
        } else {
          return <div className="action-md text-(--cien-gray-500)">{msg}</div>;
        }
      }) ?? <Label>현재 열차 정보가 없습니다</Label>}
    </CardContent>
  );

  const UplineContent = () => (
    <CardContent className="flex flex-col items-center gap-[8px]">
      <h6 className="title-md">중앙보훈병원행</h6>
      {uplineMsgs?.map((msg, index) => {
        if (index === 0) {
          return <Label>{msg}</Label>;
        } else {
          return <div className="action-md text-(--cien-gray-500)">{msg}</div>;
        }
      }) ?? <Label>현재 열차 정보가 없습니다</Label>}
    </CardContent>
  );

  return (
    <Card className="w-(--sm-width) text-center">
      <CardTitle className="title-lg">지하철 도착 정보</CardTitle>
      <UplineContent />
      <DownlineContent />
    </Card>
  );
}
