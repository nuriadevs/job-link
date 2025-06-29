import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizePhrase(phrase: string): string {
  return phrase.charAt(0).toUpperCase() + phrase.slice(1).toLowerCase();
}
