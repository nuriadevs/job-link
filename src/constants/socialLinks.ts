
import { SocialIconKey } from "@/lib/social-icons/icons";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIconKey;
  alt: string;
};

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/nuriadevs",
    icon: "github",
    alt: "GitHub",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/nuria-vazquez",
    icon: "linkedin",
    alt: "LinkedIn",
  },
  {
    label: "Web",
    href: "https://nuriavazquez.dev",
    icon: "globe",
    alt: "web",
  },
];