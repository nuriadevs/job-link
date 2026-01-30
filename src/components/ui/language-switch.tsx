"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Locale } from "@/i18n/routing";
import { languageIcons } from "@/lib/social-icons/icons";

const languages = [
    { code: "es", name: "ES", flag: <languageIcons.globe /> },
    { code: "en", name: "EN", flag: <languageIcons.globe /> },
] as const;

type LanguageCode = (typeof languages)[number]["code"];

export function LanguageSwitch() {
    const locale = useLocale() as Locale;
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();

    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const currentLanguage = languages.find((lang) => lang.code === locale);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node) &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                setIsOpen(false);
                buttonRef.current?.focus();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const handleLanguageChange = (newLocale: LanguageCode) => {
        if (newLocale === locale) {
            setIsOpen(false);
            return;
        }

        setIsOpen(false);

        startTransition(() => {

            const dynamicParams: Record<string, string> = {};
            
            Object.entries(params).forEach(([key, value]) => {
                if (key !== "locale" && value) {
                    dynamicParams[key] = Array.isArray(value) ? value.join("/") : value;
                }
            });

            const hasParams = Object.keys(dynamicParams).length > 0;
            
            if (hasParams) {
                router.replace(
                    // @ts-expect-error -- TypeScript no infiere correctamente los params dinámicos
                    { pathname, params: dynamicParams },
                    { locale: newLocale as Locale }
                );
            } else {
                router.replace(pathname || "/", { locale: newLocale as Locale });
            }
        });
    };

    const tAccess = useTranslations("accessibility");

    return (
        <div className="relative">
            <Button
                ref={buttonRef}
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-input/30 hover:bg-muted/50 transition-all duration-200 shrink-0"
                aria-label={tAccess("languageSwitcher.label")}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                aria-controls={isOpen ? "language-menu" : undefined}
                disabled={isPending}
                aria-busy={isPending}
            >
                <span className="text-base" aria-hidden="true">
                    {currentLanguage?.flag}
                </span>
                <span className="text-sm font-medium" aria-hidden="true">
                    {currentLanguage?.name}
                </span>
                <span className="sr-only">
                    {tAccess("languageSwitcher.currentLanguage")}: {currentLanguage?.name}
                </span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    } ${isPending ? "animate-spin" : ""}`}
                    aria-hidden="true"
                />
                {isPending && (
                    <span className="sr-only">{tAccess("languageSwitcher.loading")}</span>
                )}
            </Button>

            {isOpen && (
                <div
                    ref={menuRef}
                    id="language-menu"
                    role="menu"
                    aria-label={tAccess("languageSwitcher.menuLabel")}
                    className="absolute right-0 top-full mt-2 w-40 rounded-md border bg-popover p-1 shadow-md z-50 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150"
                >
                    {languages.map((language) => {
                        const isCurrentLanguage = locale === language.code;

                        return (
                            <button
                                key={language.code}
                                role="menuitemradio"
                                aria-checked={isCurrentLanguage}
                                onClick={() => handleLanguageChange(language.code)}
                                disabled={isCurrentLanguage || isPending}
                                className={`w-full text-left px-3 py-2 text-sm rounded-sm cursor-pointer transition-colors flex items-center hover:bg-accent ${
                                    isCurrentLanguage
                                        ? "bg-primary/10 text-primary font-medium"
                                        : ""
                                }`}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (
                                        (e.key === "Enter" || e.key === " ") &&
                                        !isCurrentLanguage &&
                                        !isPending
                                    ) {
                                        e.preventDefault();
                                        handleLanguageChange(language.code);
                                    }
                                }}
                            >
                                <span className="text-lg mr-3" aria-hidden="true">
                                    {language.flag}
                                </span>
                                <span>{language.name}</span>
                                {isCurrentLanguage && (
                                    <>
                                        <span
                                            className="ml-auto w-2 h-2 bg-primary rounded-full"
                                            aria-hidden="true"
                                        />
                                        <span className="sr-only">
                                            {tAccess("languageSwitcher.selected")}
                                        </span>
                                    </>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}