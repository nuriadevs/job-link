import { getRequestConfig } from "next-intl/server";
import { routing, Locale } from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !routing.locales.includes(locale as Locale)) {
        locale = routing.defaultLocale;
    }

    try {
        const messages = (await import(`../messages/${locale}.json`)).default;

        return {
            locale,
            messages,
            timeZone: "Europe/Madrid",
            now: new Date(),
        };
    } catch (error) {
        console.error(`❌ Error loading messages for ${locale}:`, error);

        const fallbackMessages = (
            await import(`../messages/${routing.defaultLocale}.json`)
        ).default;
        return {
            locale: routing.defaultLocale,
            messages: fallbackMessages,
            timeZone: "Europe/Madrid",
            now: new Date(),
        };
    }
});
