import jobBoardData from '@/data/url.json';
import { VALID_CATEGORIES, VALID_LOCATIONS } from '@/types/jobTypes';

import type { 
  JobSite, 
  JobCategory, 
  JobLocation, 
  JobStats,
  JobBoardData
} from '@/types/jobTypes';



/**
 * Type guards para validar categorías y ubicaciones
 */
function isValidCategory(value: string): value is JobCategory {
  return VALID_CATEGORIES.includes(value as JobCategory);
}

function isValidLocation(value: string): value is JobLocation {
  return VALID_LOCATIONS.includes(value as JobLocation);
}

/**
 * Valida que los datos tengan la estructura correcta
 */
function isValidJobBoardData(data: unknown): data is JobBoardData {
  if (!data || typeof data !== 'object') return false;
  
  const d = data as Record<string, unknown>;
  
  if (!d.job_boards || typeof d.job_boards !== 'object') return false;
  
  return true;
}

/**
 * Valida y normaliza un sitio individual
 */
function validateSite(site: unknown, id: number): JobSite | null {
  if (!site || typeof site !== 'object') return null;
  
  const s = site as Record<string, unknown>;
  
  if (
    typeof s.name !== 'string' ||
    typeof s.url !== 'string' ||
    typeof s.category !== 'string' ||
    typeof s.location !== 'string' 
  ) {
    return null;
  }

  if (!isValidCategory(s.category)) {
    console.warn(`Categoría inválida "${s.category}" en sitio:`, s.name);
    return null;
  }

  if (!isValidLocation(s.location)) {
    console.warn(`Ubicación inválida "${s.location}" en sitio:`, s.name);
    return null;
  }

  return {
    id: String(id),
    name: s.name,
    url: s.url,
    category: s.category,
    location: s.location
  };
}

/**
 * Carga y valida todos los sitios de trabajo
 * Evitar duplicados
 */
export function getAllSites(): JobSite[] {
  try {

    if (!isValidJobBoardData(jobBoardData)) {
      console.error('Estructura de datos inválida');
      return [];
    }

    const allSites: JobSite[] = [];
    let uniqueId = 1;

    Object.values(jobBoardData.job_boards).forEach(section => {
      if (Array.isArray(section.sites)) {
        section.sites.forEach(site => {
          const validatedSite = validateSite(site, uniqueId++);
          if (validatedSite) {
            allSites.push(validatedSite);
          }
        });
      }
    });

    return allSites;
  } catch (error) {
    console.error('Error cargando sitios:', error);
    return [];
  }
}

/**
 * Obtiene estadísticas de los sitios
 */
export function getSiteStats(): JobStats {
  const sites = getAllSites();

  const stats: JobStats = {
    total: sites.length,
    byCategory: {
      'tech+': 0,
      'freelance': 0,
      'creativo': 0,
      'general': 0
    },
    byLocation: {
      'global': 0,
      'espana': 0,
      'latam': 0
    },
    bySections: 0
  };

  sites.forEach(site => {
    stats.byCategory[site.category]++;
    stats.byLocation[site.location]++;
  });

  try {
    if (isValidJobBoardData(jobBoardData)) {
      stats.bySections = Object.keys(jobBoardData.job_boards).length;
    }
  } catch {
    stats.bySections = 0;
  }

  return stats;
}

/**
 * Filtra sitios por categoría
 */
export function getSitesByCategory(category: JobCategory): JobSite[] {
  return getAllSites().filter(site => site.category === category);
}

/**
 * Filtra sitios por ubicación
 */
export function getSitesByLocation(location: JobLocation): JobSite[] {
  return getAllSites().filter(site => site.location === location);
}

/**
 * Busca sitios por término
 */
export function searchSites(term: string): JobSite[] {
  const searchTerm = term.toLowerCase().trim();
  if (!searchTerm) return getAllSites();

  return getAllSites().filter(site =>
    site.name.toLowerCase().includes(searchTerm) ||
    site.url.toLowerCase().includes(searchTerm)
  );
}