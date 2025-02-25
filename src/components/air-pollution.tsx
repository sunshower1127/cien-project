import { Card, CardTitle } from "./ui/card";
import Label from "./ui/label";

export default function AirPollution() {
  return (
    <Card className="w-(--sm-width) items-center">
      <CardTitle className="title-lg">동작구 대기 정보</CardTitle>

      <Label>미세먼지 : 28 ㎍/㎥</Label>
      <Label className="bg-(--cien-red)">초미세먼지 : 30 ㎍/㎥</Label>
    </Card>
  );
}
