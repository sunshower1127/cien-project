import { randomInt, sum } from "es-toolkit";

export function weightedRandom<T extends string>(weights: Partial<Record<T, number>>) {
  // 모든 가중치의 합 계산
  const totalWeight = sum(Object.values(weights));

  // 0부터 총 가중치 사이의 난수 생성
  const rand = randomInt(totalWeight);

  // 가중치 누적합에 따라 항목 선택
  let accumulatedWeight = 0;
  for (const key in weights) {
    accumulatedWeight += weights[key]!;
    if (rand <= accumulatedWeight) {
      return key;
    }
  }

  // 부동소수점 오차로 인한 예외 처리 (일반적으로 실행되지 않음)
  const keys = Object.keys(weights);
  return keys[keys.length - 1] as T;
}
