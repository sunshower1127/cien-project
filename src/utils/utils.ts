import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function repeatFn(n: number, fn: (index: number) => void): void {
  for (let i = 0; i < n; i++) fn(i);
}

// TODO: 타입 가드에 대해서 더 공부해야 할듯
export function isNullish<T>(value: T): value is T & (null | undefined) {
  return value === null || value === undefined;
}
