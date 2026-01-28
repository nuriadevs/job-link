import JobSitesClient from '@/components/features/jobs/jobSites.client';
import { getAllSites, getSiteStats } from '@/lib/jobSiteLoader';


export default function Home() {
  const allSites = getAllSites();
  const stats = getSiteStats();

  return (
    <JobSitesClient
      sites={allSites}
      stats={stats}
    />
  );
}