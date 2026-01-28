import JobSites from "../features/jobs/jobSites"


export default function HeroSection() {
  return (
    <section
      className="flex flex-col items-center justify-center 
                 min-h-[90vh] sm:min-h-[85vh] md:min-h-screen 
                 w-full 
                 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20
                 py-4 sm:py-6 md:py-8 lg:py-12
                 "
      aria-label="Tabla de portales de empleo"
    >
      <div className="w-full mx-auto">
        <JobSites />
      </div>
    </section>
  )
}
