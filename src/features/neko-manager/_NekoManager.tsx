import useRefCallback from "@/lib/sw-toolkit/hooks/useRefCallback";
import useSafeEffect from "@/lib/sw-toolkit/hooks/useSafeEffect";
import api, { refetchInterval } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { times } from "es-toolkit/compat";
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

  useSafeEffect(
    ({ valid: { peopleCnt } }) => {
      const nekoCnt = getNekoLength();

      if (peopleCnt > nekoCnt) {
        addRandomNekos(peopleCnt - nekoCnt);
      } else {
        times(nekoCnt - peopleCnt, () => removeNeko());
      }
    },
    [],
    { valid: { peopleCnt } },
  );

  const handleRef = useRefCallback<"div">(({ element }) => {
    init(element);
  }, []);

  return <div className="absolute h-(--display-height) w-(--display-width)" aria-label="neko-container" ref={handleRef}></div>;
}
