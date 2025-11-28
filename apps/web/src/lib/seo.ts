export type OgType = "website" | "article" | "profile";

export interface SeoImage {
  url: string;
  alt?: string;
}

export interface SeoParams {
  title: string;
  description?: string;
  keywords?: string | string[];
  images?: Array<SeoImage | string>;
  siteName?: string;
  locale?: string;
  type?: OgType;
  robots?: string;
  noindex?: boolean;
  publishedTime?: Date | string;
  modifiedTime?: Date | string;
  twitter?: {
    site?: string;
    creator?: string;
    card?: "summary" | "summary_large_image";
  };
  descriptionMaxLength?: number;
  disableTitleSuffix?: boolean;
  titleTemplate?: string | ((base: string, site: string) => string);
}

const DEFAULTS = {
  siteName: "SmartNotebook",
  locale: "en_US",
  twitterSite: "@girishcx07",
  twitterCreator: "@girishcx07",
  titleTemplate: "%s - SmartNotebook",
  robots: "index,follow",
};
// app/lib/seo.ts
import { Metadata } from "next";

const getTitle = (params: SeoParams) => {
  if (params.disableTitleSuffix) return params.title;
  const tmpl = params.titleTemplate || DEFAULTS.titleTemplate;
  if (typeof tmpl === "function") return tmpl(params.title, DEFAULTS.siteName);
  if (tmpl.includes("%s")) return tmpl.replace("%s", params.title);
  if (params.title.includes(DEFAULTS.siteName)) return params.title;
  return `${params.title} | ${DEFAULTS.siteName}`;
};

const getDescription = (params: SeoParams) => {
  return (
    params.description
      ?.trim()
      .replace(/\s+/g, " ")
      .slice(0, params.descriptionMaxLength ?? 160) || undefined
  );
};

const getImages = (params: SeoParams) => {
  return (params.images || []).map((img) =>
    typeof img === "string" ? { url: img } : { url: img.url, alt: img.alt }
  );
};

const getPublishedTime = (params: SeoParams) => {
  return params.publishedTime instanceof Date
    ? params.publishedTime.toISOString()
    : typeof params.publishedTime === "string"
      ? params.publishedTime
      : undefined;
};

const getModifiedTime = (params: SeoParams) => {
  return params.modifiedTime instanceof Date
    ? params.modifiedTime.toISOString()
    : typeof params.modifiedTime === "string"
      ? params.modifiedTime
      : undefined;
};

export function seo(params: SeoParams): Metadata {
  const title = getTitle(params);

  const description = getDescription(params);

  const images = getImages(params);

  const publishedTime = getPublishedTime(params);

  const modifiedTime = getModifiedTime(params);

  return {
    title,
    description,
    keywords:
      typeof params.keywords === "string"
        ? params.keywords
        : params.keywords?.join(", "),
    // basic fields
    openGraph: {
      title,
      description,
      siteName: params.siteName || "SmartNotebook",
      locale: params.locale || "en_US",
      type: params.type || "website",
      images: images.map((img) => ({
        url: img.url,
        alt: img.alt ?? undefined,
      })),
      publishedTime,
      modifiedTime,
    },
    twitter:
      images.length > 0
        ? {
            card: params.twitter?.card || "summary_large_image",
            title,
            description,
            images: images.map((img) => img.url),
            creator: params.twitter?.creator,
            site: params.twitter?.site,
          }
        : undefined,
    robots:
      params.noindex || params.robots
        ? params.robots || (params.noindex ? "noindex,nofollow" : undefined)
        : undefined,
  };
}
