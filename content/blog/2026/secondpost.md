# No Front Matter

This is the second post example for the blog. It is a pure markdown page without any front-matter variables defined in the markdown content. The data for this page is derived from the defaults for the site or how NuxtContent works.

| Base Field | Rendered | Meta | Note |
|------------|----------|------|------|
| `title` | H1 _{{title}}_ | `<title>`{{title}}`</title>` |Since the `title` variable is not defined, it looks for the first H1 heading in the content, not the first heading (like an H2). If that is also not found, it defaults to the file name without the extension ("Secondpost"). In this case, "No Front Matter" is in an H1 heading, i.e. `# No Front Matter` so 'No Front Matter' is what is used as the title. |
| `description` | none | `<meta name="description" content="`<br>{{description}} `">` | Since the `description` variable is not defined, it defaults to the first paragraph of the content after the first H1 heading. |
| `image` | none | _{{image}}_ | without an image defined, no rendered image or meta tag is shown. |
| `image_alt` | none | _{{image_alt}}_ | no image alt text is defined. |
| `author` | none | _{{author}}_ | since this is absent, it assumes the page is not an authored page and the default '' (empty string) and this prevents the byline from being displayed. |
| `date_created` | none | _{{date_created}}_ | without its definition, it defaults to the current date at noon when the page is rendered or statically built.  If this is authored content, it should be shown at the top of the list to identify its absence. |

| Extra Field | Rendered | Meta | Note |
|-------------|----------|------|------|
| `is_toc` | | | defaults to false, no table of contents rendered. |
| `meta` | _`{}`_ | no custom variables defined, meta is an empty object |
| `og_title` | _{{og_title}}_ | The OpenGraph page share title is built from two parts <br> 1) The site `title_og_brand`, which is "JMSTOgBrand -" <br> 2) the page `og_title` or `title` <br> The open graph brand ensures a social post share mentions your site brand along with your article title.  You can set it to `''` (empty string) to remove this behavior. |
| `og_description` | _{{og_description}}_ | The generated OpenGraph description is usually the page description (as in this case), but you can customize it by providing a `og_description` in the front matter. |
| `og_image` | _{{og_image}}_  ![](/images/JMSTimageLandscape.png)  | The generated OpenGraph page image. Since `image` *and* `og_image` are not defined, it uses the site default image so the post at least has a picture. The image order of precedence is <br> 1) page `og_image` <br> 2) page `image` <br> 3) then site default. <br> |
| `og_image_alt` | _{{og_image_alt}}_ | no OpenGraph image alt text is defined, so defaults to the site image alt default. |
| `x_title` | _{{x_title}}_ | Similar to OpenGraph, the X/Twitter share title uses the site `title_x_brand`, which is "JMSTXBrand -", followed by the _title_. This ensures every X/Twitter social post has your site brand along with your article title.  You can customize the `x_title` and even a custom title for X/Twitter by adding `x_title` in the front matter. |
| `x_description` | _{{x_description}}_ | The X/Twitter page share description uses the site `description_x_brand` if not defined. |
| `x_image` | _{{x_image}}_ ![](/images/JMSTimageLandscape.png) | The generated X/Twitter page image. Since `image` *and* `x_image` are not defined, it uses the site default image. The image order of precedence is <br> 1) page `x_image` <br> 2) page `image` <br> 3) then site default. <br> |
| `x_image_alt` | _{{x_image_alt}}_ | no X/Twitter image alt text is defined, so defaults to the site image alt default. |
| `x_card` | _{{x_card}}_ | The X/Twitter card type is defined in the site defaults, in this case "summary".  You can customize the `x_card` by adding `x_card` in the front matter. |
| `x_creator_handle` | _{{x_creator_handle}}_ | The X/Twitter creator handle is defined in the site defaults. You can customize it by adding `x_creator_handle` in the front matter. |


---

## Table of Contents

1. [Why This Matters](#why-this-matters)
2. [Core Principles](#core-principles)
3. [Practical Breakdown](#practical-breakdown)
4. [Quick Reference](#quick-reference)
5. [FAQ](#faq)
6. [Closing Thoughts](#closing-thoughts)

## Why This Matters

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc non blandit massa enim nec dui nunc mattis enim. Sit amet nisl purus in mollis nunc sed id semper.

> "Lorem ipsum is not just filler; it helps shape rhythm, spacing, and structure before final copy arrives."

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.

---

## Core Principles

### 1. Clarity Before Complexity

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra.

### 2. Structure Supports Reading

Use these simple patterns:

- Short intro paragraphs
- Clear subheadings
- Visual separators
- Highlighted key points

### 3. Consistency Builds Trust

1. Define a format
2. Repeat it in each section
3. Add variation only where it helps comprehension

---

## Sample Markdown Elements

### Section Snapshot

| Part | Purpose | Example |
| --- | --- | --- |
| Lead | Set context | Lorem ipsum dolor sit amet |
| Body | Explain details | Consectetur adipiscing elit |
| Summary | Reinforce takeaway | Sed do eiusmod tempor |

### Mini Case Example

> **Scenario:** A draft has strong ideas but weak flow.
>
> **Fix:** Add headings, trim long sentences, and group related points.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Implementation Notes

- [x] Heading hierarchy defined
- [x] Mixed markdown elements included
- [x] Visual rhythm improved with separators
- [ ] Replace lorem text with production copy

### Inline Styles in Context

When a point is essential, mark it as **important**. When nuance matters, use *light emphasis*. For warnings, ~~avoid vague claims~~ and prefer specific statements. For technical terms, use inline snippets like `content.publish()`.

### Example Snippet

```ts
const sections = ["lead", "body", "summary"]

for (const section of sections) {
	console.log(`Render section: ${section}`)
}
```

---

## Quick Reference

### Do

- Keep paragraphs focused on one idea
- Use lists for scannable points
- Add quotes to emphasize perspective

### Avoid

- Very long blocks without headings
- Inconsistent section naming
- Decorative markdown without purpose

### Helpful Link

- [Markdown Guide](https://www.markdownguide.org/basic-syntax/)

---

## FAQ

### What is this article template for?

Lorem ipsum dolor sit amet, consectetur adipiscing elit. It demonstrates a production-like shape with placeholder content.

### Can this support SEO-friendly writing?

Yes. Replace placeholder text with keyword-focused copy, then align headings and description with search intent.[^1]

### Should every section include lists or tables?

No. Use them only when they improve clarity.

---

## Closing Thoughts

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

> Final note: Good structure makes early drafts easier to review, revise, and publish.

[^1]: This is a placeholder recommendation for demo purposes.

