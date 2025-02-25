import AirPollution from "@/components/air-pollution";
import CafeteriaMenu from "@/components/cafeteria-menu";
import CienCalendar from "@/components/cien-calendar";
import HeroBanner from "@/components/hero-banner";
import NoticeBoard from "@/components/notice-board";
import SubwayArrival from "@/components/subway-arrival";
import { cn } from "@/lib/utils";
import styles from "./dashboard.module.css";
export default function Dashboard() {
  return (
    <main className={cn(styles.variables, "flex h-(--display-height) w-(--display-width) flex-row gap-(--gap) bg-(--cien-blue-900) px-(--padding-x) py-(--padding-y)")}>
      <section className="flex flex-col justify-between gap-(--gap)">
        <section className="flex flex-1 flex-row gap-(--gap)">
          <CafeteriaMenu />
          <section className="flex flex-col gap-(--gap)">
            <SubwayArrival />
            <AirPollution />
          </section>
        </section>
        <CienCalendar />
      </section>
      <section className="flex flex-col justify-between gap-(--gap)">
        <HeroBanner />
        <NoticeBoard />
      </section>
    </main>
  );
}
