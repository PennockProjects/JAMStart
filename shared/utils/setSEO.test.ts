import { describe, expect, it, vi } from 'vitest'
import { siteDefaults } from './siteDefaults'
import { setSEO } from './setSEO'

vi.mock('vue-router', () => ({
  useRoute: () => ({ fullPath: '/mocked-route' }),
}))

describe('setSEO', () => {
  it('falls back to defaults when page input fails schema parsing', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const result = setSEO({}, '/fallback-path')

    expect((result.headData as { link?: unknown[] }).link?.[0]).toMatchObject({
      rel: 'canonical',
      href: `${siteDefaults.rootUrl}/fallback-path`,
    })
    expect(result.seoMetaData.description).toBe(siteDefaults.description)
    expect(result.seoMetaData.ogImage).toBe(`${siteDefaults.rootUrl}${siteDefaults.imageLandscape}`)
    expect(result.seoMetaData.twitterCard).toBe(siteDefaults.twitterCard)

    warnSpy.mockRestore()
    errorSpy.mockRestore()
  })

  it('uses page overrides and route/page path logic for SEO fields', () => {
    const result = setSEO(
      {
        path: '/page-path',
        title: 'SEO Page',
        description: 'Custom description',
        image: '/images/custom-default.png',
        image_alt: 'Custom image alt',
        og_title: 'Custom OG',
        og_description: 'Custom OG description',
        og_image: '/images/custom-og.png',
        og_image_alt: 'Custom OG alt',
        x_title: 'Custom X',
        x_description: 'Custom X description',
        x_image: '/images/custom-x.png',
        x_image_alt: 'Custom X alt',
        x_card: 'summary',
        x_creator_handle: '@CustomCreator',
      },
      '/route-path',
    )

    expect((result.headData as { link?: unknown[] }).link?.[0]).toMatchObject({
      rel: 'canonical',
      href: `${siteDefaults.rootUrl}/route-path`,
    })
    expect(result.seoMetaData.ogUrl).toBe(`${siteDefaults.rootUrl}/page-path`)
    expect(result.seoMetaData.ogTitle).toBe(`${siteDefaults.title_og_brand}Custom OG`)
    expect(result.seoMetaData.twitterTitle).toBe(`${siteDefaults.title_x_brand}Custom X`)
    expect(result.seoMetaData.twitterCard).toBe('summary')
    expect(result.seoMetaData.twitterCreator).toBe('@CustomCreator')
  })

  it('returns expected pageData values for title, description, and related fields', () => {
    const result = setSEO(
      {
        path: '/blog/2026/example',
        title: 'Example Post',
        description: 'Example post description',
        author: 'John Doe',
        date_created: '2026-01-05',
        image: '/images/example.jpg',
        image_alt: 'Example image alt',
        og_title: 'OG Example',
        x_title: 'X Example',
      },
      '/blog/2026/example',
    )

    expect(result.pageData.path).toBe('/blog/2026/example')
    expect(result.pageData.title).toBe('Example Post')
    expect(result.pageData.description).toBe('Example post description')
    expect(result.pageData.author).toBe('John Doe')
    expect(result.pageData.date_created).toBe(new Date(2026, 0, 5, 12, 0, 0, 0).toLocaleDateString())
    expect(result.pageData.image).toBe('/images/example.jpg')
    expect(result.pageData.image_alt).toBe('Example image alt')
    expect(result.pageData.og_title).toBe(`${siteDefaults.title_og_brand}OG Example`)
    expect(result.pageData.x_title).toBe(`${siteDefaults.title_x_brand}X Example`)
  })

  it('uses today date string when date_created is blank or null', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-13T12:00:00.000Z'))

    const expectedToday = new Date().toLocaleDateString()

    const blankResult = setSEO(
      {
        path: '/blank-date',
        title: 'Blank Date',
        date_created: '',
      },
      '/blank-date',
    )

    const nullResult = setSEO(
      {
        path: '/null-date',
        title: 'Null Date',
        date_created: null,
      },
      '/null-date',
    )

    expect(blankResult.pageData.date_created).toBe(expectedToday)
    expect(nullResult.pageData.date_created).toBe(expectedToday)

    vi.useRealTimers()
  })

  it('ignores time and timezone in date_created and uses local noon for the YYYY-MM-DD portion', () => {
    const result = setSEO(
      {
        path: '/date-with-timezone',
        title: 'Date With Timezone',
        date_created: '2026-01-05T23:59:59+14:00',
      },
      '/date-with-timezone',
    )

    const expected = new Date(2026, 0, 5, 12, 0, 0, 0).toLocaleDateString()
    expect(result.pageData.date_created).toBe(expected)
  })
})
