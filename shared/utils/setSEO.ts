import type { ContentCollectionItem } from '@nuxt/content'
import type { UseHeadInput, UseSeoMetaInput } from '@unhead/vue'
import { siteDefaults, type SiteDefaults } from './siteDefaults'
import { PageData, type PageMatter } from './contentDataSchema'
import { useRoute } from 'vue-router'

type UseHeadAndSeoInput = {
  headData: UseHeadInput
  seoMetaData: UseSeoMetaInput
  pageData: PageData
}

export const setSEO = (
  pageRaw: ContentCollectionItem | Record<string, unknown>, // Accept either a ContentCollectionItem or a plain object for page frontmatter data
  routePath: string,
  defaults: SiteDefaults = siteDefaults, // Allow passing in custom defaults, but use siteDefaults as the default value
): UseHeadAndSeoInput => {
  const route = useRoute();
  let pageData: PageData;

  try {
    if (!pageRaw || typeof pageRaw !== 'object') {
      console.error('Page frontmatter data is not an object.', {
        pageRaw,
        routePath,
        route: route.fullPath,
      });
      pageRaw = {} as ContentCollectionItem; // Fallback to an empty object if pageRaw is not valid
    }
    // Attempt to create a new PageData instance from the provided pageRaw data
    // If pageRaw is not a valid ContentCollectionItem, this will throw an error and be caught in the catch block
    // The PageData constructor will handle missing fields by using defaults where necessary
    pageData = new PageData(pageRaw as PageMatter, defaults);

  } catch (error) {
    const safeError = error instanceof Error
      ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        }
      : {
          message: String(error),
        }

    console.error('Error parsing page frontmatter with schema:', safeError);
    pageData = new PageData({} as PageMatter, defaults); // Ensure pageData is at least an empty object if parsing fails
  }

  const headData: UseHeadInput = {
    title: pageData.title,
    link: [
      {
        rel: 'canonical',
        href: defaults.rootUrl + routePath,
      },
    ],
  }

  const seoMetaData: UseSeoMetaInput = {
    title: pageData.title,
    description: pageData.description,
    ogType: pageData.author ? defaults.ogAuthoredType : defaults.ogType, // If author is not set, use 'website' as the ogType
    ogTitle: pageData.og_title,
    ogDescription: pageData.og_description,
    ogImage: defaults.rootUrl + pageData.og_image,
    ogImageAlt: pageData.og_image_alt,
    ogSiteName: defaults.siteName,
    ogUrl: defaults.rootUrl + (pageData.path ?? routePath),
    twitterTitle: pageData.x_title,
    twitterDescription: pageData.x_description,
    twitterImage: defaults.rootUrl + pageData.x_image,
    twitterImageAlt: pageData.x_image_alt,
    twitterCard: pageData.x_card,
    twitterSite: defaults.twitterSiteHandle,
    twitterCreator: pageData.x_creator_handle,
  }

  // conditional addition of author meta tag if author is present in pageData
  if(pageData.author) {
    seoMetaData.author = pageData.author
  }

  return {
    headData,
    seoMetaData,
    pageData,
  }
}
