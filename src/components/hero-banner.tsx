import useAutoUpdate from "@/hooks/use-auto-update";
import { heroBannerConfigUpdateRate, heroBannerUpdateRate, second } from "@/services/constants/time";
import { heroBannerDefaultImageURL } from "@/services/constants/url";
import { fetchHeroBannerConfig, fetchHeroBannerItems } from "@/services/hero-banner";
import { useCallback, useEffect, useRef, useState } from "react";
import AutoScrollSlider, { onSlideProps } from "./ui/auto-scroll-slider";
import Card from "./ui/card";

// 변경된 VideoCanvas 컴포넌트: quality props 추가 및 loadeddata 이벤트 수정
function VideoCanvas({ url, fps, quality }: { url: string; fps: number; quality: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fpsRef = useRef(fps);

  useEffect(() => {
    fpsRef.current = fps;
  }, [fps]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const context = canvas.getContext("2d");
    let animationFrameId: number;
    let lastTime = 0;

    video.play();

    const draw = (time: number) => {
      let realFps = fpsRef.current;
      if (realFps < 1) realFps = 1;
      if (realFps > 60) realFps = 60;
      const interval = 1000 / realFps;
      if (time - lastTime > interval) {
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    const updateCanvasSize = () => {
      // internal 해상도는 quality 비율로 조정
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      canvas.width = vw * (quality / 100);
      canvas.height = vh * (quality / 100);
      // 화면에는 원본 크기로 표시
      canvas.style.width = vw + "px";
      canvas.style.height = vh + "px";
    };

    const handleLoadedData = () => {
      updateCanvasSize();
      animationFrameId = requestAnimationFrame(draw);
    };

    video.addEventListener("loadeddata", handleLoadedData);

    // 만약 video가 이미 로드되었으면 즉시 canvas 크기 업데이트 실행
    if (video.readyState >= 2) {
      updateCanvasSize();
      animationFrameId = requestAnimationFrame(draw);
    }

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      cancelAnimationFrame(animationFrameId);
    };
  }, [url, quality]);

  return (
    <>
      <video ref={videoRef} src={url} muted loop style={{ display: "none" }} />
      <canvas ref={canvasRef} />
    </>
  );
}

// 변경된 HeroBanner 컴포넌트: quality state 추가 및 입력 필드 추가
export default function HeroBanner() {
  const config = useAutoUpdate(fetchHeroBannerConfig, { intervalMs: heroBannerConfigUpdateRate });
  const data = useAutoUpdate(fetchHeroBannerItems, { intervalMs: heroBannerUpdateRate });
  const [frame, setFrame] = useState(30);
  // 업데이트: 기본 quality 값을 100 (100%로 표시)
  const [quality, setQuality] = useState(100);

  const handleSlide = useCallback(
    ({ prevElement, element }: onSlideProps) => {
      if (prevElement instanceof HTMLVideoElement) {
        prevElement.pause();
        prevElement.currentTime = 0;
      }

      if (element instanceof HTMLVideoElement) {
        element.play();
        return Math.min(config?.videoMaxDisplayTime || 10, element.duration) * second;
      }

      return (config?.photoDisplayTime || 10) * second;
    },
    [config?.videoMaxDisplayTime, config?.photoDisplayTime],
  );

  if (!data) {
    return (
      <Card size="lg" className="aspect-video p-0">
        <img src={heroBannerDefaultImageURL} alt="기본 이미지" />
      </Card>
    );
  }

  return (
    <Card size="lg" className="relative aspect-video p-0">
      <div className="bg-opacity-50 absolute top-0 right-0 z-10 bg-black p-2 text-white">
        <label htmlFor="frame">프레임(1~60fps):</label>
        <input className="bg-white text-black" id="frame" type="text" value={frame} onChange={(e) => setFrame(+e.target.value)} />
        {/* 업데이트: quality 입력 필드 (1%~100%) */}
        <label htmlFor="quality" className="ml-2">
          화질 (1%~100%):
        </label>
        <input className="bg-white text-black" id="quality" type="text" value={quality} onChange={(e) => setQuality(+e.target.value)} />
      </div>
      <AutoScrollSlider onSlide={handleSlide}>
        {data.map(({ type, url }) =>
          type === "image" ? (
            <img className="aspect-video w-full object-cover" key={url} src={url} />
          ) : (
            <div key={url} className="aspect-video w-full">
              <VideoCanvas url={url} fps={frame} quality={quality} />
            </div>
          ),
        )}
      </AutoScrollSlider>
    </Card>
  );
}
