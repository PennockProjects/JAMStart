import { z } from 'zod'
import { type SiteDefaults, siteDefaults } from './siteDefaults'
import { normalizeDateToNoon } from './time'

// FRONTMATTER SCHEMA SECTION
// Note front-matter variable names **must** be snake_case in NuxtContent v3 (breaking change from v2) as they store the variables in a SQLite database for queryCollection (snake_case is a limitation of SQLite).
export const PageSchema = z
  .object({
    // Frontmatter default fields
    path: z.string().optional().nullable().default(''),
    title: z.string().optional().nullable().default(''),
    description: z.string().optional().nullable().default(''),
    // Frontmatter custom fields
    author: z.string().optional().nullable(),
    date_created: z.string().optional().nullable(),
    // base page image
    image: z.string().optional().nullable(),
    image_alt: z.string().optional().nullable(),
    // boolean on whether page displays table of contents
    is_toc: z.boolean().optional().default(false),
    // any front matter variables that are not explicitly defined in the schema will be stored in the `meta` object, which is a record of string keys and unknown values. This allows for flexibility in adding custom frontmatter variables without needing to update the schema.
    meta: z.record(z.string(), z.unknown()).optional().nullable().default({}),
    // social sharing title, description, and image overrides
    og_title: z.string().optional().nullable(), // Open Graph title override
    og_description: z.string().optional().nullable(), // Open Graph description override
    og_image: z.string().optional().nullable(), // Open Graph image override
    og_image_alt: z.string().optional().nullable(), // Open Graph image alt override
    x_title: z.string().optional().nullable(), // Twitter title override
    x_description: z.string().optional().nullable(), // Twitter description override
    x_image: z.string().optional().nullable(), // Twitter image override
    x_image_alt: z.string().optional().nullable(), // Twitter image alt override
    x_card: z.string().optional().nullable(), // Twitter card type override
    x_creator_handle: z.string().optional().nullable(), // Twitter creator handle override
  })

// Infer the Page frontmatter variable object TypeScript type from the Zod schema
export type PageMatter = z.infer<typeof PageSchema>;

type TwitterCard = 'summary' | 'summary_large_image' | 'app' | 'player';

export class PageData implements PageMatter {
  // Generated fields
  public path: string;

  // Base fields
  public title: string;
  public description: string;
  public image: string | null
  public image_alt: string | null
    // for content pages
  public author: string | null
  public date_created: string | null

  // Extra fields
  public is_toc: boolean;  // boolean on whether page displays table of contents
    // for social sharing 
  public og_title: string | null // Open Graph title override
  public og_description: string | null // Open Graph description override
  public og_image: string | null // Open Graph image override
  public og_image_alt: string | null // Open Graph image alt override
  public x_title: string | null // Twitter title override
  public x_description: string | null // Twitter description override
  public x_image: string | null // Twitter image override
  public x_image_alt: string | null // Twitter image alt override
  public x_card: TwitterCard; // Twitter card type override
  public x_creator_handle: string | null // Twitter creator handle override

  // Non-schema fields
  public meta: Record<string, unknown>;

  // Constructor to initialize the PageData object with parsed frontmatter data and defaults
  constructor(data: PageMatter, defaults: SiteDefaults = siteDefaults) {
    // Validate the incoming data at runtime before assigning
    const validated = data ? PageSchema.parse(data) : {} as PageMatter;
    this.path = validated?.path || '';

    this.title = validated.title || defaults.title;
    this.description = validated.description || defaults.description;
    this.author = validated.author || '';

    this.date_created = normalizeDateToNoon(validated.date_created)

    this.image = validated.image ?? '';
    this.image_alt = validated.image_alt ?? '';

    this.is_toc = validated?.is_toc ? true : false;

   
    this.meta = validated.meta || {};

    this.og_title = validated.og_title ? 
      `${defaults.title_og_brand}${validated.og_title}` : 
      `${defaults.title_og_brand}${this.title}`;
    this.og_description = validated.og_description || this.description;
    this.og_image = validated.og_image || this.image || defaults.imageLandscape;
    this.og_image_alt = validated.og_image_alt || this.image_alt || defaults.imageAlt;

    this.x_title = validated.x_title ? 
      `${defaults.title_x_brand}${validated.x_title}` : 
      `${defaults.title_x_brand}${this.title}`;
    this.x_description = validated.x_description || this.description;
    this.x_image = validated.x_image || this.image || defaults.imageLandscape;
    this.x_image_alt = validated.x_image_alt || this.image_alt || defaults.imageAlt;
    this.x_card = validated.x_card as TwitterCard || defaults.twitterCard;
    this.x_creator_handle = validated.x_creator_handle || defaults.twitterCreatorHandle;
  }

  // Methods
  getBools(): string {
    return `is_toc: ${this.is_toc}`;
  }
}

