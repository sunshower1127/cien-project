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
