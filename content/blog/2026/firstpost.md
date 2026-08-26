---
# Base fields
title: Maximum Front Matter
description: A blog post discussing the use of the JAMStart data scheme to create custom SEO meta, social sharing for Open Graph and Twitter/X, and page data, and being an example of how including all the base, extra, and custom front-matter variables in the markdown file affects the rendered page.
image: /images/firstblog.jpg
image_alt:  A table with journal, pen, and coffee cup

# Base fields for "authored" pages
author: John Doe
date_created: 2025-07-07

# Extra fields
is_toc: true
og_title: Open Graph Max Data
og_description: This is a custom description for the first post example for the blog for Open Graph.
og_image: /images/ogfirstblog.jpg
og_image_alt: A table with journal, pen, coffee cup, and a plant
x_title: Max Data for X
x_description: This is a custom description for the first post example for the blog for X/Twitter.
x_image: /images/xfirstblog.jpg
x_image_alt: A black screen with 'First Post' in text
x_card: summary
x_creator_handle: @johndoe

# Custom page fields
foobar: lorem ipsum dolor sit
foobaz: ipsum lorem sit dolor
---

## Content Data Block
Each content page, a blog or article, is generated from a single markdown file (`*.md`) that may contain a front-matter data block defined at the head of the file. The JAMStart front-matter data schema defines a set of base and extra variables names. The base variables, while not required, are expected. The extra variables are optional.  All of the variables are available to use in the markdown portion accessed via `{{<variable_name>}}`. You can also define your own custom variables, which are accessible in the page data via the `{{meta.<variable_name>}}`.


## Base Front Matter Data

The base front-matter data should be in every markdown file. It adds metadata to each markdown file, creates specific SEO benefits, and creates a nice preview when shared on social media platforms. The _image_ and _image_alt_ fields are important for social sharing and SEO, and should ideally be 2x1 aspect ratio for best display on social media platforms. The _image_alt_ provides a description of the image for accessibility and SEO purposes. The _author_ and _date_created_ fields are important for "authored" content pages, such as blogs and articles, and create an automatic byline. For non 'authored" pages, such as the blog list or article list, these fields should not be included.

| Base Field | Note | Default | Rendering |
|------------|------|---------|---------|
| _title_ | The title of the page. | If not defined, it looks for the first H1 heading in the content. If that is also not found, it defaults to the file name without the extension. | the _title_ will be shown in an H1 heading at the top of the page. |
| _description_ | A short description of the page. | If not defined, it defaults to the first paragraph of the content after the first H1 heading.  If there is no H1 heading, it defaults to configurable site default `JMSTdefaultDescription`. | not automatically shown |
| _image_ | The main image for the page. | default is no image. | If defined, the image will be shown at the top of the page |
| _image_alt_ | The alt text for the main image. | The image_alt provides a description of the image for accessibility and SEO purposes. | not automatically shown |
| _author_ | The author of the page. | If absent, it assumes the page is not an authored page and defaults to '' (empty string), this prevents the byline () from being displayed. Content pages should have an author. | if defined a byline is shown, if not no byline is shown |
| _date_created_ | The creation date of the page. | Format of YYYY-MM-DD, if not defined it defaults to the current date at noon when the page is rendered or statically built. | shown in the byline |

It doesn't have to have any of these variables defined in your markdown file (and you can checkout the [No Front Matter](./secondpost) for example of a page without any variable defined) but 

To add these variables to your markdown file, you can add them in the front matter section at the top of the file.  The front matter section is defined by three dashes `---` at the top and bottom of the section.  You can see an example below:

### Base Data Block
```yml
---
# Base fields
title: Maximum Front Matter
description: page description
image: /images/firstblog.jpg
image_alt: A table with journal, pen, and coffee cup
# Base fields for "authored" pages
author: John Doe
date_created: 2026-01-05
---
```

## Extra Front Matter Data
There are extra front-matter variables that can customize a page further. The `og_*` variables allow you to customize the Open Graph social share data for the page, and the `x_*` variables allow you to customize the Twitter/X social share data for the page.

| Extra Field | Note | Default |
|-------------|------|---------|
| _is_toc_ | Boolean indicating if the page displays a table of contents. | false |
| _og_title_ | Open Graph title override. | 'JMSTOgBrand - ' + _title_ |
| _og_description_ | Open Graph description override. | same as _description_ |
| _og_image_ | Open Graph image override. | same as _image_ |
| _og_image_alt_ | Open Graph image alt text override. | same as _image_alt_ |
| _x_title_ | Twitter/X title override. | same as _title_ |
| _x_description_ | Twitter/X description override. | 'JMSTTwitterBrand - ' +  _description_ |
| _x_image_ | Twitter/X image override. | same as _image_ |
| _x_image_alt_ | Twitter/X image alt text override. | same as _image_alt_ |
| _x_card_ | Twitter/X card type override. | site default = 'summary_large_image' |
| _x_creator_handle_ | Twitter/X creator handle override. | site default = '@JMSTcreatorHandleX' |

### Extra Data Block Example

This post has a fully filled out front matter data block with all of the extra fields defined.  You can see the front matter block at the top of this markdown file, but here is a snippet of the full data block.
```yml
---
# ... base fields ...

# Extra fields
is_toc: true
og_title: Open Graph Max Data
og_description: This is a custom description for the first post example for the blog for Open Graph.
og_image: /images/ogfirstblog.jpg
og_image_alt: A table with journal, pen, coffee cup, and a plant
x_title: Max Data for X
x_description: This is a custom description for the first post example for the blog for X/Twitter.
x_image: /images/xfirstblog.jpg
x_image_alt: A black screen with 'First Post' in text
x_card: summary
x_creator_handle: @johndoe
---

```

### Custom Social Share
Normally, all the SEO and social share data are the same, defined by the base front matter data.  But when you define the extra front matter variables you can customize the Open Graph and Twitter/X social share data for the page. This is useful if you want to have a different title, description, or image for different social media platforms that are pointing to the same page.  For example, when sharing this page on social media sites that support Open Graph, such as Facebook, LinkedIn, or Instagram, the share graphic is different than social media sites that support the Twitter/X cards, such as X.  You can see the actual display using the Nuxt DevTools (https://nuxt.com/docs/getting-started/nuxt-devtools) and clicking on the "Social Share" tab.

#### Comparison

Comparison of the two social share cards:
| Field | SEO | Open Graph | Twitter/X |
|-------|------------|-----------|-----------|
| Title | _{{title}}_ | _{{og_title}}_ | _{{x_title}}_ |
| Description | _{{description}}_ | _{{og_description}}_ | _{{x_description}}_ |
| Image | ![A table with journal, pen, and coffee cup](/images/firstblog.jpg) | ![A table with journal, pen, and coffee cup](/images/ogfirstblog.jpg) | ![a black screen with First Post in white text](/images/xfirstblog.jpg) |
| Image Alt | _{{image_alt}}_ | _{{og_image_alt}}_ | _{{x_image_alt}}_ |
| Card Type | N/A | N/A | _{{x_card}}_ |
| X Handle | N/A | N/A | _{{x_creator_handle}}_ |
| Author | _{{author}}_ | | |

## Custom Content Data
If you define a front matter field that is not part of the default schema, you can access it using the `meta` object.  For example, in this post we have defined two custom fields: `foobar` and `foobaz`.  You can see them below:

#### foobar
`{{ meta.foobar }}` = "{{meta.foobar}}"

#### foobaz
`{{ meta.foobaz }}` = "{{meta.foobaz}}"

## Putting it all together
Here is the result for all the data variables defined in the front matter block for this page.  You can see how the base, extra, and custom variables are all available to use in the markdown content.

| Base Field | Body Rendered | Head Meta |
|------------|---------------|-----------|
| `title` | automatic<br>`<h1>`{{title}}`</h1>` | `<title>`{{title}}`</title>` |
| `description` | author injected <br>`{{description}}` | `<meta name="description" content="{{description}}">` |
| `image` / `image_alt` | automatic<br>`<img src="`{{image}}`" alt="`{{image_alt}}`">` | none |
| `author` / `date_created` | automatic byline<br>`<span>`by {{author}} {{date_created}}`</span>` | `<meta name="author" content="`{{author}}`">` |
| _is_toc_ | a table of contents of every H2 and H3 heading. | none |

All the extra fields are available to be rendered into the body but no HTML elements are automatically generated for them. However, they **are** included in the head meta for SEO and social sharing. You can see the extra fields below and the meta tags that are generated in the head of the page.

| Extra Field | Head Meta |
|-------------|-----------|
| `og_title` | `<meta property="og:title" content="`{{og_title}}`">` |
| `og_description` | `<meta property="og:description" content="`{{og_description}}`">` |
| `og_image` | `<meta property="og:image" content="`{{og_image}}`">` |
| `og_image_alt` | `<meta property="og:image:alt" content="`{{og_image_alt}}`">` |
| `x_title` | `<meta name="twitter:title" content="`{{x_title}}`">` |
| `x_description` | `<meta name="twitter:description" content="`{{x_description}}`">` |
| `x_image` | `<meta name="twitter:image" content="`{{x_image}}`">` |
| `x_image_alt` | `<meta name="twitter:image:alt" content="`{{x_image_alt}}`">` |
| `x_card` | `<meta name="twitter:card" content="`{{x_card}}`">` |
| `x_creator_handle` | `<meta name="twitter:creator" content="`{{x_creator_handle}}`">` |

The custom fields defined, i.e. `foobar` and `foobaz`, are available to be used in the body of the page, but they are not automatically rendered and not included in the head meta.

### Additional Meta Tags
Additional head meta tags are generated for each page but they are not 'per page', not overridable from the page data block, and not available for injection into the body. They are defined once in the site defaults at `/shared/utils/siteDefaults.ts` file.  Some of the additional OG/X meta tags are shown below.  You can see the full list of meta tags in the head of the page by using the Nuxt DevTools (https://nuxt.com/docs/getting-started/nuxt-devtools) and clicking on the "Head" tab.

| Site Default | Head Meta |
|--------------|-----------|
| `og:type` | `<meta property="og:type" content="article">` |
| `og:url` | `<meta property="og:url" content="/blog/2026/firstpost">` |
| `og:site_name` | `<meta property="og:site_name" content="JAMStart">` |
| `twitter:site` | `<meta name="twitter:site" content="@JMSTsiteHandleX">` |


For example, the `og:type` is always set to `article`, and the `og:url` is always set to the page URL which is formed by the `defaults.rootUrl` + relative path, which in this case would be `"https://JMSTsiteURL.com/blog/2026/firstpost"`. `og:site_name` is always set to the site name, i.e. `<meta property="og:site_name" content="JAMStart">` and the `twitter:site` is always set to the site twitter handle, i.e. `<meta name="twitter:site" content="@JMSTsiteHandleX">` These are all defined in the site defaults and are not overridable on a per page basis.

## Final Notes
The JAMStart front-matter data schema is designed to provide a consistent and flexible way to define metadata for your content pages. By using the base fields, you can ensure that your pages are optimized for SEO and social sharing. The extra fields allow for additional customization in sharing different previews when shared on OpenGraph vs. Twitter/X social platforms. The custom fields allow you to define content once in a variable and you can use and re-use that variable within your page content.



