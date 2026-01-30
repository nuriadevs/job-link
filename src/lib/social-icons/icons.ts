import { Globe } from "lucide-react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
  FaGlobe
} from "react-icons/fa";

export const languageIcons = {
  globe: Globe,
} as const;

export const socialIcons = {
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  github: FaGithub,
  youtube: FaYoutube,
  globe: FaGlobe
} as const;

export type SocialIconKey = keyof typeof socialIcons;