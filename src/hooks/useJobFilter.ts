
'use client';

import { useMemo, useState, useCallback } from 'react';
import type { JobCategory, JobLocation } from '@/types/jobTypes';
import type { UseJobFilterOptions } from '@/types/jobTypes';


/**
 * Función useJobFilter para gestionar el filtrado de sitios de empleo.
 * @param param0
 * @returns
 */
export function useJobFilter({ sites }: UseJobFilterOptions) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<JobCategory | 'all'>('all');
  const [location, setLocation] = useState<JobLocation | 'all'>('all');

  const filteredSites = useMemo(() => {
    let results = sites;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      results = results.filter(site => 
        site.name.toLowerCase().includes(term) ||
        site.description.toLowerCase().includes(term) ||
        site.url.toLowerCase().includes(term)
      );
    }

    if (category !== 'all') {
      results = results.filter(site => site.category === category);
    }

    if (location !== 'all') {
      results = results.filter(site => site.location === location);
    }

    return results;
  }, [sites, searchTerm, category, location]);

  const isFiltered = useMemo(() => {
    return searchTerm.trim() !== '' || category !== 'all' || location !== 'all';
  }, [searchTerm, category, location]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setCategory('all');
    setLocation('all');
  }, []);

  return {
    filteredSites,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    location,
    setLocation,
    totalResults: filteredSites.length,
    clearFilters,
    isFiltered
  };
}