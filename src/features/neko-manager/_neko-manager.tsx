import api, { refetchInterval } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { isNil } from "es-toolkit";
import { times } from "es-toolkit/compat";
import { useEffect } from "react";
import { addRandomNekos, init } from "./neko-script";

declare function removeNeko(): void;
declare function getNekoLength(): number;

export default function NekoManager() {
  const query = useQuery({
    queryKey: ["people-count"],
    queryFn: () => api.cien.getClubRoomPeopleCount(),
    refetchInterval: refetchInterval.peopleCount,
  });

  const peopleCnt = query.data?.peopleCount;

  useEffect(() => {
    if (isNil(peopleCnt)) return;

    const nekoCnt = getNekoLength();

    if (peopleCnt > nekoCnt) {
      addRandomNekos(peopleCnt - nekoCnt);
    } else {
      times(nekoCnt - peopleCnt, removeNeko);
    }
  }, [peopleCnt]);

  return <div aria-label="neko-container" ref={init}></div>;
}
