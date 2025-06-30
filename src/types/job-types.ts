// Cada portal individual
export type JobSite = {
  id: number;
  name: string;
  url: string;
  category: string;
  location: string;
  description: string;
};

// Cada agrupación por categoría (ej: remote_work)
export type JobBoardCategory = {
  title: string;
  description: string;
  sites: JobSite[];
};

// Metadata general del archivo
export type Metadata = {
  version: string;
  total_sites: number;
  last_updated: string;
  categories: string[];
  locations: string[];
};

// Estructura total del archivo JSON
export type JobData = {
  job_boards: {
    [categoryKey: string]: JobBoardCategory;
  };
  metadata: Metadata;
};
