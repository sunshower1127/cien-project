// es-toolkit에서 없거나 아쉬운 함수들 직접 만들기

/**
 * 값이 null 또는 undefined인지 체크하는 함수
 */
export function isNil<T>(value: T | null | undefined): value is null | undefined {
  return value === undefined || value === null;
}

/**
 * 값이 null 또는 undefined가 아닌지 체크하는 함수
 */
export function isNotNil<T>(value: T | null | undefined): value is T {
  return !isNil(value);
}

/**
 * 값이 비어있는지 체크하는 함수
 * undefined, null, 빈 배열, 빈 객체, 빈 Map/Set 등을 감지
 */
export function isEmpty<T>(value: T | null | undefined): value is null | undefined {
  // undefined or null 체크
  //   if (value === undefined || value === null) return true;
  if (isNil(value)) return true;

  // String
  if (typeof value === "string") return value === "";

  // 숫자나 불리언 타입은 빈 값으로 간주하지 않음
  if (typeof value === "number" || typeof value === "boolean") return false;

  // 객체 타입에 대해 통합적으로 빈 값 검사 (length, size, 일반 객체)
  if (typeof value === "object") {
    if ("length" in value!) return value.length === 0;
    if ("size" in value!) return value.size === 0;
    return Object.keys(value!).length === 0;
  }

  // 그 외 타입은 비어있지 않은 것으로 간주
  return false;
}

/**
 * 값이 비어있지 않은지 체크하는 함수
 */
export function isNotEmpty<T>(value: T | null | undefined): value is T {
  return !isEmpty(value);
}
