import { Card, CardContent, CardTitle } from "./ui/card";
import Label from "./ui/label";

export default function SubwayArrival() {
  return (
    <Card className="w-(--sm-width) text-center">
      <CardTitle className="title-lg">지하철 도착 정보</CardTitle>
      <CardContent className="flex flex-col items-center gap-[8px]">
        <h6 className="title-md">개화행</h6>
        <Label>전역 출발</Label>
        <div className="action-md text-(--cien-gray-500)">10분 20초 후 (고속터미널)</div>
      </CardContent>
      <CardContent className="flex flex-col items-center gap-[8px]">
        <h6 className="title-md">중앙보훈병원행</h6>
        <Label>3분 45초 후 (노량진)</Label>
        <div className="action-md text-(--cien-gray-500)">8분 5초 후 (여의도)</div>
      </CardContent>
    </Card>
  );
}
