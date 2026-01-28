import { ModeToggle } from "@/components/modelToggle"
import Image from "next/image"


export function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full 
                       bg-background/80 backdrop-blur-md 
                       border-b border-border/50 
                       shadow-sm transition-all duration-300"
    >
      <div className="w-full max-w-screen-3xl mx-auto py-4 sm:py-2 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div
          className="flex items-center justify-between
                        px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20
                        py-2 sm:py-2.5 md:py-3"
        >
          <div className="flex-1 flex items-center space-x-2">
            <Image
              src="/logo.png"
              width={48}
              height={48}
              alt="EmpleoLink Logo"
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 
                           transition-all duration-300 hover:drop-shadow-lg
                           dark:brightness-110"
            />

            <h1
              className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl 
                       font-bold text-left"
              aria-label="EmpleoLink"
            >
              <span className="">EmpleoLink</span>
            </h1>
          </div>

          <div
            className="flex items-center space-x-2 sm:space-x-3"
            role="toolbar"
            aria-label="Controles de configuración"
          >
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}