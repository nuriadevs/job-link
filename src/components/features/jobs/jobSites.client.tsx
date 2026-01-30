'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useJobFilter } from '@/hooks/useJobFilter';
import type { 
  JobCategory, 
  JobLocation, 
  JobSitesClientProps,
  StatCardProps,
  EmptyStateProps
} from '@/types/jobTypes';
import JobSiteCard from '@/components/features/jobs/jobSiteCard';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

import {
  Globe,
  Search,
  X,
  MapPin,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Función JobSitesClient para renderizar la lista de sitios de empleo con filtros y paginación.
 */
export default function JobSitesClient({ sites, stats }: JobSitesClientProps) {
  const t = useTranslations('jobs');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const {
    filteredSites,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    location,
    setLocation,
    totalResults,
    clearFilters,
    isFiltered
  } = useJobFilter({ sites });

  const { paginatedItems, totalPages, startItem, endItem } = useMemo(() => {
    const total = Math.ceil(filteredSites.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const items = filteredSites.slice(start, end);

    return {
      paginatedItems: items,
      totalPages: total,
      startItem: start + 1,
      endItem: Math.min(end, filteredSites.length)
    };
  }, [filteredSites, currentPage, itemsPerPage]);

  const handleFilterChange = <T,>(setter: (value: T) => void, value: T) => {
    setter(value);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-7xl px-4">

        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-indigo-100">
            <Globe className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">
              {stats.bySections} {t('stats.categories')} · {stats.total} {t('stats.portals')}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            {t('title')}
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Globe />} label={t('stats.total')} value={stats.total} />
          <StatCard icon={<Tag />} label={t('stats.techPlus')} value={stats.byCategory['tech+']} />
          <StatCard icon={<MapPin />} label={t('stats.spain')} value={stats.byLocation.espana} />
          <StatCard icon={<Globe />} label={t('stats.global')} value={stats.byLocation.global} />
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-8 space-y-4">

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              value={searchTerm}
              onChange={(e) => handleFilterChange(setSearchTerm, e.target.value)}
              placeholder={t('search.placeholder')}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border border-border focus:ring-2 focus:ring-ring focus:outline-none text-foreground"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={category}
              onChange={(e) => handleFilterChange(setCategory, e.target.value as JobCategory | 'all')}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:ring-2 focus:ring-ring focus:outline-none text-foreground"
            >
              <option value="all">{t('filters.allCategories')}</option>
              <option value="tech+">{t('filters.categories.techPlus')}</option>
              <option value="freelance">{t('filters.categories.freelance')}</option>
              <option value="creativo">{t('filters.categories.creative')}</option>
              <option value="general">{t('filters.categories.general')}</option>
            </select>

            <select
              value={location}
              onChange={(e) => handleFilterChange(setLocation, e.target.value as JobLocation | 'all')}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:ring-2 focus:ring-ring focus:outline-none text-foreground"
            >
              <option value="all">{t('filters.allLocations')}</option>
              <option value="global">{t('filters.locations.global')}</option>
              <option value="espana">{t('filters.locations.spain')}</option>
              <option value="latam">{t('filters.locations.latam')}</option>
            </select>

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:ring-2 focus:ring-ring focus:outline-none text-foreground"
            >
              <option value="9">9 {t('filters.perPage')}</option>
              <option value="12">12 {t('filters.perPage')}</option>
              <option value="24">24 {t('filters.perPage')}</option>
              <option value="48">48 {t('filters.perPage')}</option>
            </select>
          </div>

          {isFiltered && (
            <button
              onClick={() => {
                clearFilters();
                setCurrentPage(1);
              }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
              {t('search.clearFilters')}
            </button>
          )}
        </div>

        {totalResults > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedItems.map((site) => (
                <JobSiteCard key={site.id} site={site} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-4 mt-8 pt-6 border-t border-border">

                <p className="text-sm text-muted-foreground">
                  {t('pagination.showing')} <span className="font-semibold text-foreground">{startItem}</span> {t('pagination.to')}{' '}
                  <span className="font-semibold text-foreground">{endItem}</span> {t('pagination.of')}{' '}
                  <span className="font-semibold text-foreground">{totalResults}</span> {t('pagination.results')}
                </p>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) goToPage(currentPage - 1);
                        }}
                        className={
                          currentPage === 1
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                      />
                    </PaginationItem>
                    {getPageNumbers().map((page, index) => (
                      <PaginationItem key={`page-${index}`}>
                        {page === 'ellipsis' ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            onClick={(e) => {
                              e.preventDefault();
                              goToPage(page);
                            }}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) goToPage(currentPage + 1);
                        }}
                        className={
                          currentPage === totalPages
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <EmptyState onClear={() => {
            clearFilters();
            setCurrentPage(1);
          }} />
        )}
      </div>
    </div>
  );
}

/**
 * Función StatCard para renderizar una tarjeta de estadística.
 */
function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-1 text-muted-foreground space-y-2">
        <div className="w-5 h-5 text-indigo-700">{icon}</div>
        <span className="text-sm ml-2">{label}</span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}

/**
 * Función EmptyState para renderizar el estado vacío cuando no hay resultados.
 */
function EmptyState({ onClear }: EmptyStateProps) {
  const t = useTranslations('jobs.empty');
  
  return (
    <div className="text-center py-20 bg-card rounded-xl border border-border">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <Search className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">
          {t('title')}
        </h3>
        <p className="mb-6 text-muted-foreground">
          {t('description')}
        </p>
        <Button
          onClick={onClear}
          aria-label={t('clearButton')}
          variant={'default'}
          size={'default'}
        >
          {t('clearButton')}
        </Button>
      </div>
    </div>
  );
}