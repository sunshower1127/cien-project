import { peopleCountUpdateRate } from "@/constants/time";
import { fetchCountOfStudentsInClubRoom } from "@/services/cctv-api";
import { useEffect } from "react";

export default function NekoEngine() {
  useEffect(() => {
    setNekoContainer("neko");
    setNekoSpeed(1.0);
    setNekoSize(2.0);

    const nekoInterval = setInterval(async () => {
      try {
        const peopleCnt = await fetchCountOfStudentsInClubRoom();
        if (peopleCnt === null) return;

        const nekoCnt = getNekoLength();
        if (peopleCnt > nekoCnt) {
          Array.from({ length: peopleCnt - nekoCnt }).forEach(() => {
            setTimeout(() => {
              const randomNeko = nekoCandidate[Math.floor(Math.random() * nekoCandidate.length)];
              addNeko(randomNeko);
            }, Math.random() * 0.01);
            // addNeko();
          });
        } else if (peopleCnt < nekoCnt) {
          Array.from({ length: nekoCnt - peopleCnt }).forEach(() => removeNeko());
        }
      } catch (e) {
        console.error(e);
      }
    }, peopleCountUpdateRate);

    return () => {
      clearInterval(nekoInterval);
      Array.from({ length: getNekoLength() }).forEach(() => {
        removeNeko();
      });
    };
  }, []);
  return <></>;
}

/* https://webneko.net/
소스코드 가져다 수정시켜서 사용함
 */

// 아래 배열에 있는 애들중에서 랜덤으로 하나 뽑아서 생성
const nekoCandidate: NekoType[] = ["white", "black", "calico", "peach", "spirit", "silversky", "lucky", "rose", "blue", "ace", "marmalade", "socks", "jess", "lucy", "fancy"];

type NekoType =
  | "white"
  | "black"
  | "gray"
  | "calico"
  | "robot"
  | "peach"
  | "colourful"
  | "earth"
  | "air"
  | "water"
  | "fire"
  | "spirit"
  | "rainbow"
  | "silversky"
  | "orange"
  | "ghetto"
  | "neon"
  | "pink"
  | "ghost"
  | "lucky"
  | "moka"
  | "usa"
  | "rose"
  | "blue"
  | "silver"
  | "kuramecha"
  | "kina"
  | "ace"
  | "spooky"
  | "holiday"
  | "valentine"
  | "marmalade"
  | "royal"
  | "mermaid"
  | "socks"
  | "dave"
  | "jess"
  | "mike"
  | "lucy"
  | "fancy";

declare function addNeko(nekoType?: NekoType): void;
declare function removeNeko(): void;
declare function getNekoLength(): number;
declare function setNekoContainer(elementId: string): void;
declare function setNekoSpeed(speed: number): void;
declare function setNekoSize(ratio: number): void;
