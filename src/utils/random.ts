export function safeRandom({ min, max }: { min?: number; max: number }): number;
export function safeRandom({ n, min, max }: { n: number; min?: number; max: number }): number[];
export function safeRandom({ n, min = 0, max }: { n?: number; min?: number; max: number }): number | number[] {
  if (min > max) {
    throw new Error("min 값은 max 값보다 클 수 없습니다.");
  }

  const range = max - min;
  const count = n === undefined ? 1 : n;
  const result = new Array(count);

  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    let values: Uint8Array | Uint16Array | Uint32Array;
    let divisor: number;

    if (range < 256) {
      values = new Uint8Array(count);
      divisor = 256;
    } else if (range < 65536) {
      values = new Uint16Array(count);
      divisor = 65536;
    } else {
      values = new Uint32Array(count);
      divisor = 4294967296;
    }

    crypto.getRandomValues(values);

    for (let i = 0; i < count; i++) {
      result[i] = min + Math.floor((values[i] / divisor) * (range + 1));
    }
  } else {
    for (let i = 0; i < count; i++) {
      result[i] = min + Math.floor(Math.random() * (range + 1));
    }
  }

  return n === undefined ? result[0] : result;
}

export function weightedRandom<T extends Record<string, number>>({ weights }: { weights: T }): keyof T;
export function weightedRandom<T extends Record<string, number>>({ weights, n }: { weights: T; n: number }): (keyof T)[];
export function weightedRandom<T extends Record<string, number>>({ weights, n }: { weights: T; n?: number }): keyof T | (keyof T)[] {
  // 모든 가중치의 합 계산
  let totalWeight = 0;
  for (const key in weights) {
    if (weights[key] < 0) {
      throw new Error(`가중치는 음수일 수 없습니다: ${key}`);
    }
    totalWeight += weights[key];
  }

  if (totalWeight <= 0) {
    throw new Error("가중치의 총합은 0보다 커야 합니다.");
  }

  // n이 제공되지 않은 경우 단일 값 반환
  if (n === undefined) {
    // 0부터 총 가중치 사이의 난수 생성
    const rand = safeRandom({ max: totalWeight * 1000 }) / 1000;

    // 가중치 누적합에 따라 항목 선택
    let accumulatedWeight = 0;
    for (const key in weights) {
      accumulatedWeight += weights[key];
      if (rand <= accumulatedWeight) {
        return key;
      }
    }

    // 부동소수점 오차로 인한 예외 처리 (일반적으로 실행되지 않음)
    const keys = Object.keys(weights);
    return keys[keys.length - 1] as keyof T;
  }
  // n이 제공된 경우 여러 값 반환
  else {
    const result: (keyof T)[] = [];
    // 한 번에 여러 난수 생성
    const randoms = safeRandom({ n, max: totalWeight * 1000 }).map((r) => r / 1000);

    const keys = Object.keys(weights);
    // 각 난수에 대해 항목 선택
    for (const rand of randoms) {
      let accumulatedWeight = 0;
      let selected = false;

      for (const key in weights) {
        accumulatedWeight += weights[key];
        if (rand <= accumulatedWeight) {
          result.push(key as keyof T);
          selected = true;
          break;
        }
      }

      // 부동소수점 오차로 인한 예외 처리
      if (!selected) {
        result.push(keys[keys.length - 1] as keyof T);
      }
    }

    return result;
  }
}
