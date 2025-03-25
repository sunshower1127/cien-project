import api from "@/services/api";
import { times } from "es-toolkit/compat";
import { NekoType } from "./neko-type";
import { weightedRandom } from "./weighted-random";

declare function addNeko(nekoType?: NekoType): void;
declare function setNekoContainer(element: string | HTMLElement): void;
declare function setNekoSpeed(speed: number): void;
declare function setNekoSize(ratio: number): void;

function init(nekoContainer: HTMLDivElement) {
  setNekoContainer(nekoContainer);
  setNekoSpeed(1.0);
  setNekoSize(2.0);
}

async function addRandomNekos(count: number) {
  try {
    const weights = await api.dummy.getNekoWeights(); // TODO: DUMMY: 추후 수정
    if (weights !== null) {
      times(count, () => addNeko(weightedRandom(weights)));
    }
  } catch (error) {
    console.error(error);
  }
}

export { addRandomNekos, init };
