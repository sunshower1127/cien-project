import ErrorBoundary from "@/components/errorboundary";
import AirPollution from "@/features/air-pollution/_air-pollution";
import CafeteriaMeal from "@/features/cafeteria-meal/_cafeteria-meal";
import CienCalendar from "@/features/cien-calendar";
import HeroBanner from "@/features/hero-banner/_hero-banner";
import NoticeBoard from "@/features/notice-board";
import SubwayArrival from "@/features/subway-arrival/_subway-arrival";

export default function Dashboard() {
  return (
    <main className="bg-cien-blue-900 flex h-(--display-height) w-(--display-width) flex-row gap-(--card-gap) overflow-clip px-[12px] py-[12px]">
      <div className="flex flex-col justify-between gap-(--card-gap)">
        <div className="flex flex-1 flex-row gap-(--card-gap)">
          <ErrorBoundary>
            <CafeteriaMeal />
          </ErrorBoundary>
          <div className="flex flex-col gap-(--card-gap)">
            <ErrorBoundary>
              <SubwayArrival />
            </ErrorBoundary>
            <ErrorBoundary>
              <AirPollution />
            </ErrorBoundary>
          </div>
        </div>
        <ErrorBoundary>
          <CienCalendar />
        </ErrorBoundary>
      </div>
      <div className="flex flex-col justify-between gap-(--card-gap)">
        <ErrorBoundary>
          <HeroBanner />
        </ErrorBoundary>
        <ErrorBoundary>
          <NoticeBoard />
        </ErrorBoundary>
      </div>
    </main>
  );
}
