// remove-descriptions.ts (en la raíz del proyecto)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Para obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tipos
interface JobSite {
  id: number;
  name: string;
  url: string;
  category: string;
  location: string;
  description?: string;
}

interface JobCategory {
  title: string;
  description: string;
  sites: JobSite[];
}

interface JobBoardsData {
  _comentario: string;
  job_boards: {
    [key: string]: JobCategory;
  };
  metadata: {
    version: string;
    total_sites: number;
    last_updated: string;
    categories: string[];
    locations: string[];
  };
}

// Ruta correcta a tu archivo JSON
const inputFile = path.join(__dirname, 'src', 'data', 'url.json');
const outputFile = path.join(__dirname, 'src', 'data', 'url-new.json'); // Sobrescribe el original

// Leer el archivo
const data: JobBoardsData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

// Función para eliminar descriptions
function removeDescriptions(obj: JobBoardsData): JobBoardsData {
  if (obj.job_boards) {
    Object.keys(obj.job_boards).forEach(category => {
      if (obj.job_boards[category].sites) {
        obj.job_boards[category].sites.forEach((site: JobSite) => {
          delete site.description;
        });
      }
    });
  }
  return obj;
}

// Aplicar la función
const cleanData = removeDescriptions(data);

// Guardar el resultado
fs.writeFileSync(
  outputFile,
  JSON.stringify(cleanData, null, 2),
  'utf-8'
);

console.log('✅ Descripciones eliminadas!');
console.log('📄 Archivo actualizado en:', outputFile);