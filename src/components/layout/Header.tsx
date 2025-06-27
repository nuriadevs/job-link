import { ModeToggle } from "@/components/ModelToggle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full 
                       bg-background/80 backdrop-blur-md 
                       border-b border-border/50 
                       shadow-sm transition-all duration-300"
    >
      <div className="w-full max-w-screen-3xl mx-auto">
        <div
          className="flex items-center justify-between
                        px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20
                        py-3 sm:py-4 md:py-5"
        >
          {/* Título principal - Adaptativo */}
          <div className="flex-1">
            <h1
              className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                       font-bold text-left"
              aria-label="Portales de Empleo"
            >
              <span className="">Portales de Empleo</span>
            </h1>
          </div>
          {/* Controles de la derecha */}
          <div
            className="flex items-center space-x-2 sm:space-x-3"
            role="toolbar"
            aria-label="Controles de configuración"
          >
            {/* Toggle de tema */}
            <ModeToggle />
          </div>
        </div>

        {/* Breadcrumb opcional para navegación */}
        <nav
          className="hidden md:block px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pb-2"
          aria-label="Navegación secundaria"
          role="navigation"
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" aria-label="Ir a la página de inicio">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator aria-hidden="true" />
              <BreadcrumbItem>
                <BreadcrumbPage aria-current="page">
                  Portales de empleo
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
      </div>
    </header>
  )
}
