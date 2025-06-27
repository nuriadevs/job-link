import { JobSitesTable } from '@/components/layout/Table'

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
      {/* Título optimizado para SEO y accesibilidad */}
      <div className="text-center mb-4 sm:mb-6 md:mb-8 w-full max-w-4xl">
        <h1 className="text-lg xs:text-xl sm:text-xl md:text-2xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto
                      animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          Explora las mejores oportunidades laborales en un solo lugar
        </h1>
      </div>
      
      
      {/* Tabla con contenedor responsivo */}
      <div className="w-full mx-auto">
        <JobSitesTable />
      </div>
    </section>
  )
}