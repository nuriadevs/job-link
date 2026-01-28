import { socialLinks, type SocialLink } from "@/constants/socialLinks"
import { Timestamp } from "@/components/ui/Timestamp"
import { FaHeart } from "react-icons/fa"

export function Footer() {
  return (
    <footer
      className="bg-background/80 backdrop-blur-md z-50 border-t border-border/50 shadow-sm"
      role="contentinfo"
      aria-label="Pie de página"
    >

      <div className="w-full max-w-screen-3xl mx-auto py-4 sm:py-2 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div
          className="flex items-center justify-between
                        px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20
                        py-2 sm:py-2.5 md:py-3"
        >  
          <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 text-center md:text-left">
            © <Timestamp /> Made with{" "}
            <FaHeart className="w-3 h-3 text-red-500 animate-pulse" aria-label="amor" /> by
            <span className="font-semibold ml-1">Nuria Vázquez.</span>
          </span>

          <div className="flex items-center gap-3">
            {socialLinks.map((link: SocialLink) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted-foreground hover:text-indigo-700 focus:outline focus:ring-2 focus:ring-primary/50 transition-colors duration-300"
              >
                <link.icon
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}