import { NekoType } from "@/lib/neko-manager";
import ky from "ky";
import { CIEN_API_KEY } from "../constants/key";
import { minute, second } from "../constants/time";

// 데이터 갱신 주기
export const refetchInterval = {
  airData: 30 * minute,
  notice: 30 * minute,
  banner: 10 * minute,
  calendar: 10 * minute,
  peopleCount: 1 * minute,
  subway: 30 * second,
};

const CIEN_URL = "https://api.cien.or.kr/api";
const cien = Object.assign(
  ky.create({
    prefixUrl: CIEN_URL,
    headers: {
      Authorization: "Bearer " + CIEN_API_KEY,
    },
  }),
  {
    getAirData: () =>
      cien.get("opendata/air", { searchParams: { rgn: "서남권", ste: "동작구" } }).json<{
        RealtimeCityAir: {
          row: {
            PM10: number;
            PM25: number;
          }[];
        };
      }>(),
    getSubWayData: () =>
      cien.get("opendata/subway", { searchParams: { station: "흑석" } }).json<{
        realtimeArrivalList: {
          updnLine: "하행" | "상행";
          arvlMsg2: string;
        }[];
      }>(),
    getClubRoomPeopleCount: () =>
      cien.get("clubroom/people-count").json<{
        peopleCount: number;
        isPeopleThere: boolean;
      }>(),
  },
);

// TODO: 프록시 제거
const SISO_URL = "https://https-proxy-rust.vercel.app/129.154.213.57:9001";
const siso = Object.assign(ky.create({ prefixUrl: SISO_URL }), {
  getMeals: (day: "today" | "tomorrow", mealType: "morning" | "lunch" | "dinner") =>
    siso.get(`meals/${day}/${mealType}`).json<
      {
        id: number;
        date: string;
        cafeteria: string;
        dueTime: string;
        mealType: "아침" | "점심" | "저녁";
        menu: string;
      }[]
    >(),
  getMedias: () =>
    siso.get("medias").json<
      {
        id: number;
        mediaType: string;
      }[]
    >(),
  getMediaURL: (id: number) => SISO_URL + "/medias/" + id,
  getGalleryConfig: () =>
    siso.get("gallery/config").json<{
      photoDisplayTime: number;
      videoMaxDisplayTime: number;
    }>(),
  getNotices: () =>
    siso.get("notices").json<
      {
        id: number;
        notice: string;
        date: string;
      }[]
    >(),
});

const dummy = Object.assign(ky.create({ prefixUrl: "/dummy" }), {
  getNekoWeights: () => dummy.get("neko-weights.json").json<{ [name in NekoType]?: number }>(),
  getDefaultBannerImageURL: () => "/dummy/banner.jpeg",
});

const google = {
  getCalendarURL: () =>
    "https://calendar.google.com/calendar/u/0/embed?height=650&wkst=1&bgcolor=%23ffffff&ctz=Asia/Seoul&mode=MONTH&title&showCalendars=0&showTabs=0&showPrint=0&showDate=1&showNav=0&showTitle=1&showTz=1&src=Y2llbmNhbGVuZGFyQGdtYWlsLmNvbQ&src=cWR1YXRyM3NldXI4MzVwazRhb2xvazI5MDBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%232a63af&color=%23C0CA33",
};

export default {
  cien,
  siso,
  dummy,
  google,
};
