import { Card } from "./ui/card";

export default function HeroBanner() {
  return (
    <Card className="aspect-video w-(--lg-width) overflow-hidden p-0">
      <video className="aspect-video w-(--lg-width)" loop={true} autoPlay={true} muted={true} src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"></video>
    </Card>
  );
}
