export const setSEO = (metaPage, metaDefaults, routePath) => {

  let doc = metaPage || {}
  let oTitle = (doc.ogTitle || doc.title)
  let xTitle = (doc.xTitle || doc.title)
  let xImage = doc.xImage || doc.image || metaDefaults.image2x1
  let seoInput = {}
  
  let keywords = doc && doc.keywords && Array.isArray(doc.keywords) ? metaDefaults.keywords.concat(doc.keywords) : metaDefaults.keywords.concat([]);
  
  seoInput.author = doc.author || metaDefaults.author
  seoInput.creator = metaDefaults.creator
  seoInput.keywords = keywords.toString()
  seoInput.ogTitle = (oTitle && oTitle != metaDefaults.title) ? `${metaDefaults.title} ${oTitle}` : metaDefaults.title
  seoInput.xTitle = (xTitle && xTitle != metaDefaults.title) ? `${metaDefaults.title} ${xTitle}` : metaDefaults.title
  seoInput.description = doc.description || metaDefaults.description;
  seoInput.ogDescription = doc.ogDescription || doc.description || metaDefaults.description
  seoInput.xDescription = doc.xDescription || doc.description || metaDefaults.description
  seoInput.ogImage = doc.ogImage || doc.image || metaDefaults.image2x1
  seoInput.ogImageAlt = doc.ogImageAlt || doc.imageAlt || metaDefaults.imageAlt
  // Note: X/Twitter will not show the static image unless the static non-js version has a full url.
  seoInput.xImage = metaDefaults.rootUrl + xImage
  seoInput.xImageAlt  = doc.xImageAlt || doc.imageAlt || metaDefaults.imageAlt
  seoInput.ogUrl = metaDefaults.rootUrl + doc._path 
  seoInput.xCard = doc.xCard || metaDefaults.twitterCard
  seoInput.xCreatorHandle = doc.xCreatorHandle || metaDefaults.twitterCreatorHandle

  let head = {
    link: [
      {
        rel: 'canonical',
        href: metaDefaults.rootUrl + routePath,
      },
    ],
  }

  let seo = {
    description: seoInput.description,
    author: seoInput.author,
    creator: seoInput.crator,
    keywords: seoInput.keywords,
    ogType: metaDefaults.ogType,
    ogTitle: seoInput.ogTitle,
    ogDescription: seoInput.ogDescription,
    ogImage: seoInput.ogImage,
    ogImageAlt: seoInput.ogImageAlt,
    ogSiteName: metaDefaults.siteName,
    ogUrl: seoInput.ogUrl,
    twitterTitle: seoInput.xTitle,
    twitterDescription: seoInput.xDescription,
    twitterImage: seoInput.xImage,
    twitterImageAlt: seoInput.xImageAlt,
    twitterCard: seoInput.xCard,
    twitterSite: metaDefaults.twitterSiteHandle,
    twitterCreator: seoInput.xCreatorHandle
  }
  
  return {
    head,
    seo 
  }
}
