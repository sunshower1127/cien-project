import { peopleCountUpdateRate } from "@/constants/time";
import useAutoUpdate from "@/hooks/use-auto-update";
import { fetchCountOfStudentsInClubRoom } from "@/services/cctv-api";
import { fetchNekoWeights } from "@/services/neko-weights";
import { weightedRandom } from "@/utils/random";
import { isNullish, repeatFn } from "@/utils/utils";
import { useEffect, useRef } from "react";

export default function NekoManager() {
  const nekoContainer = useRef<HTMLDivElement>(null);

  const peopleCnt = useAutoUpdate(peopleCountUpdateRate, fetchCountOfStudentsInClubRoom);

  useEffect(() => {
    if (!nekoContainer.current) return;
    setNekoContainer(nekoContainer.current);
    setNekoSpeed(1.0);
    setNekoSize(2.0);
  }, []);

  useEffect(() => {
    if (!isNullish(peopleCnt)) {
      const nekoCnt = getNekoLength();

      if (peopleCnt > nekoCnt) {
        addRandomNekos(peopleCnt - nekoCnt);
      } else if (peopleCnt < nekoCnt) {
        repeatFn(nekoCnt - peopleCnt, removeNeko);
      }
    }
  }, [peopleCnt]);

  return <div aria-label="neko-container" ref={nekoContainer}></div>;
}

async function addRandomNekos(count: number) {
  try {
    const weights = await fetchNekoWeights();
    if (weights !== null) {
      weightedRandom({ weights, n: count }).forEach((type) => addNeko(type));
    }
  } catch (error) {
    console.error(error);
  }
}

// https://webneko.net/ 참고
export type NekoType =
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
declare function setNekoContainer(element: string | HTMLElement): void;
declare function setNekoSpeed(speed: number): void;
declare function setNekoSize(ratio: number): void;
