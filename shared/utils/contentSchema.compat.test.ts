/* This test ensures that the content.config.ts file is compatible with the shared PageSchema and that the PageSchema correctly validates frontmatter data. It checks for the presence of the correct import statement, the extension of the PageSchema, and the use of the schema in the content configuration. Additionally, it tests that valid frontmatter passes validation and invalid frontmatter fails validation.

 It is important to note that this test does not check the actual content of the content.config.ts file beyond the import statement and schema usage. It also does not check for the presence of specific frontmatter fields beyond those defined in the PageSchema. The purpose of this test is to ensure that the content configuration is wired correctly to the shared PageSchema and that the schema validation works as expected.
*/
  
import { readFileSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'
import { PageSchema } from './contentDataSchema'

describe('content schema compatibility smoke', () => {
  it('keeps content config wired to the shared PageSchema', () => {
    const configPath = join(process.cwd(), 'content.config.ts')
    const configSource = readFileSync(configPath, 'utf8')

    expect(configSource).toContain("import { PageSchema } from './shared/utils/contentDataSchema'")
    expect(configSource).toContain('const PageSchemaSitemap = PageSchema.extend(')
    expect(configSource).toContain('schema: PageSchemaSitemap')
  })

  it('accepts valid frontmatter in the shared runtime schema', () => {
    const sample = {
      path: '/blog/2026/firstpost',
      title: 'Maximum Front Matter',
      description: 'Sample description',
      author: 'John Doe',
      date_created: '2026-01-05',
      image: '/images/firstblog.jpg',
      image_alt: 'Sample image alt',
      is_toc: true,
      og_title: 'OG title',
      og_description: 'OG description',
      og_image: '/images/ogfirstblog.jpg',
      og_image_alt: 'OG image alt',
      x_title: 'X title',
      x_description: 'X description',
      x_image: '/images/xfirstblog.jpg',
      x_image_alt: 'X image alt',
      x_card: 'summary',
      x_creator_handle: '@johndoe',
    }

    const runtimeResult = PageSchema.safeParse(sample)

    expect(runtimeResult.success).toBe(true)
  })

  it('rejects invalid frontmatter in the shared runtime schema', () => {
    const invalidSample = {
      path: 42,
      title: true,
      is_toc: 'yes',
      x_card: 9,
    }

    const runtimeResult = PageSchema.safeParse(invalidSample)

    expect(runtimeResult.success).toBe(false)
  })
})