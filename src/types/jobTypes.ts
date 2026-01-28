// ============================================
// TIPOS BASE (desde validateData.ts)
// ============================================
export type JobCategory = 'tech+' | 'freelance' | 'creativo' | 'general';
export type JobLocation = 'global' | 'espana' | 'latam';

export interface JobSite {
  id: string;
  name: string;
  url: string;
  description: string;
  category: JobCategory;
  location: JobLocation;
}

export interface UseJobFilterOptions {
  sites: JobSite[];
}

// ============================================
// CONSTANTES DE VALIDACIÓN
// ============================================
export const VALID_CATEGORIES: readonly JobCategory[] = ['tech+', 'freelance', 'creativo', 'general'] as const;
export const VALID_LOCATIONS: readonly JobLocation[] = ['global', 'espana', 'latam'] as const;

// ============================================
// TIPOS PARA DATOS DEL JSON
// ============================================
export interface JobBoardSection {
  sites: Omit<JobSite, 'id'>[];
}

export interface JobBoardData {
  job_boards: Record<string, JobBoardSection>;
}

// ============================================
// TIPOS PARA COMPONENTES
// ============================================


export interface JobSiteCardProps {
  site: JobSite;
}

export interface JobStats {
  total: number;
  byCategory: Record<JobCategory, number>;
  byLocation: Record<JobLocation, number>;
  bySections: number;
}

export interface JobSitesClientProps {
  sites: JobSite[];
  stats: JobStats;
}

// ============================================
// TIPOS PARA HOOKS
// ============================================

export interface UseJobFilterOptions {
  sites: JobSite[];
}

export interface UseJobFilterReturn {
  filteredSites: JobSite[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  category: JobCategory | 'all';
  setCategory: (category: JobCategory | 'all') => void;
  location: JobLocation | 'all';
  setLocation: (location: JobLocation | 'all') => void;
  totalResults: number;
  clearFilters: () => void;
  isFiltered: boolean;
}

// ============================================
// TIPOS PARA SUBCOMPONENTES
// ============================================

export interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

export interface EmptyStateProps {
  onClear: () => void;
}

export interface BadgeProps {
  label: string;
}