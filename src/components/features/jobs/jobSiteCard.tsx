
import { ExternalLink } from 'lucide-react';
import type { JobSiteCardProps, BadgeProps } from '@/types/jobTypes';

/**
 * Función JobSiteCard para renderizar una tarjeta de sitio de empleo.
 */
export default function JobSiteCard({ site }: JobSiteCardProps) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-foreground group-hover:text-indigo-700">
          {site.name}
        </h3>
        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-indigo-700" />
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {site.description}
      </p>

      <div className="flex gap-2 flex-wrap">
        <Badge label={site.category} />
        <Badge label={site.location} />
      </div>
    </a>
  );
}

/**
 * Función Badge para renderizar una etiqueta.
 */
function Badge({ label }: BadgeProps) {
  return (
    <span className="px-3 py-1 text-xs rounded-full text-muted-foreground bg-indigo-700/20">
      {label}
    </span>
  );
}