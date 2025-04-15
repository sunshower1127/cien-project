import AirPollution from "@/features/air-pollution";
import CafeteriaMeal from "@/features/cafeteria-meal";
import CienCalendar from "@/features/cien-calendar";
import HeroBanner from "@/features/hero-banner";
import NoticeBoard from "@/features/notice-board";
import SubwayArrival from "@/features/subway-arrival";
import ErrorBoundary from "@/lib/sw-toolkit/components/ErrorBoundary";

export default function Dashboard() {
  return (
    <main className="bg-cien-blue-900 flex h-(--display-height) w-(--display-width) flex-row gap-(--card-gap) overflow-clip px-[12px] py-[12px]">
      <div className="flex flex-col justify-between gap-(--card-gap)">
        <div className="flex flex-1 flex-row gap-(--card-gap)">
          <ErrorBoundary>
            <CafeteriaMeal />
          </ErrorBoundary>
          <div className="flex flex-col gap-(--card-gap)">
            <SubwayArrival />
            <AirPollution />
          </div>
        </div>
        <CienCalendar />
      </div>
      <div className="flex flex-col justify-between gap-(--card-gap)">
        <HeroBanner />
        <NoticeBoard />
      </div>
    </main>
  );
}
