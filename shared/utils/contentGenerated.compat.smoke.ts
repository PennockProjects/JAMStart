/* This test ensures that the generated content output is valid and contains the expected routes. It checks for the existence of the .output/public directory and the sitemap.xml file, and verifies that specific routes are present in the sitemap. This test is important for ensuring that the content generation process is working correctly and that the generated output meets expectations.

It is meant to be run after the content generation process has completed, and it assumes that the generated output is located in the .output/public directory. The test does not check the actual content of the generated files beyond the presence of specific routes in the sitemap.xml file. The purpose of this test is to provide a quick validation of the generated content output and ensure that it meets expectations.

*/

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('generated content smoke', () => {
  it('validates existing generated output for nested markdown routes', () => {
    const outputRoot = join(process.cwd(), '.output', 'public')
    const sitemapPath = join(outputRoot, 'sitemap.xml')

    expect(existsSync(outputRoot)).toBe(true)
    expect(existsSync(sitemapPath)).toBe(true)

    const sitemap = readFileSync(sitemapPath, 'utf8')

    expect(sitemap).toContain('/blog/2026/firstpost')
    expect(sitemap).toContain('/blog/2026/secondpost')
  })
})