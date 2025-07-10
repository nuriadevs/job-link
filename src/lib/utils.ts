import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


/**
 * Fución para capitalizar palabras
 * @param phrase 
 * @returns 
 */

export function capitalizePhrase(phrase: string): string {
  return phrase.charAt(0).toUpperCase() + phrase.slice(1).toLowerCase();
}

/**
 * Función para "traducir" las localizaciones al español  
 * @param location 
 * @returns 
 */
export function getTranslateLocation(location: string) {
  switch (location.toLowerCase()) {
    case "espana":
      return "España";
    case "latam":
      return "Latinoamérica";
    default:
      return location.charAt(0).toUpperCase() + location.slice(1);
  }
}
