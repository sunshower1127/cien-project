export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function repeatFn(fn: (index: number) => void, n: number): void {
  for (let i = 0; i < n; i++) fn(i);
}

export async function fetchWithStatusHandling<ReturnType>(url: string, onSuccess: (json: any) => ReturnType) {
  const resp = await fetch(url);
  if (resp.ok) {
    const jsonData = await resp.json();
    return onSuccess(jsonData);
  } else if (resp.status === 304) {
    return null;
  } else {
    throw new Error(`${resp.status}: ${resp.statusText}`);
  }
}

// TODO: 타입 가드에 대해서 더 공부해야 할듯
export function isNullish<T>(value: T): value is T & (null | undefined) {
  return value === null || value === undefined;
}
