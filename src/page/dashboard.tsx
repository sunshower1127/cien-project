import AirPollution from "@/components/air-pollution";
import CafeteriaMeal from "@/components/cafeteria-meal";
import CienCalendar from "@/components/cien-calendar";
import HeroBanner from "@/components/hero-banner";
import NoticeBoard from "@/components/notice-board";
import SubwayArrival from "@/components/subway-arrival";

export default function Dashboard() {
  return (
    <main className="bg-cien-blue-900 flex h-(--display-height) w-(--display-width) flex-row gap-(--card-gap) px-[12px] py-[12px]">
      <div className="flex flex-col justify-between gap-(--card-gap)">
        <div className="flex flex-1 flex-row gap-(--card-gap)">
          <CafeteriaMeal />
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
