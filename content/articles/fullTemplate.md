---
title: Full Template Example # SEO
description: "Full Templates description" # SEO
image: /images/placeholder.jpg # Template Image Link, ideally 2x1, 1200 x 600 or 1200 x 630
image_alt: 'Placeholder text' #Template Image Alt Text description
author: Template Article Author
date_modified: 2026-01-03 # optional for when updated, date_created is required
is_toc: true
date_created: 2026-01-02
editor: Template Article Editor # optional, for second author
og_title: Template Open Graph Title
og_description: Template Open Graph Description
og_image: /images/placeholder.jpg # Template Open Graph Image Link, ideally 1200 x 630
og_image_alt: 'Placeholder text' # Template Open Graph Image Alt - use only if 'image_alt' not sufficient
x_title: Template Twitter Title
x_description: Template Twitter Description
x_image: /images/placeholder.jpg # Template Twitter Image Link - ideally 1200 x 600 for large card, or 800 x 800 square for summary
x_image_alt: 'Image alternate text for twitter only' # if different than 'image_alt'
x_card: 'summary' # or 'summary_large_image'
x_creator_handle: @TwitterHandle # Template Twitter Creator handle, default creator handle
---

## Full Front Matter

This is an example of an article template that includes all the front matter variables for SEO and social sharing.  It is an example for full customization.

### Social Media Overrides
If a page defined `title`, `description`, and `image` variables, the social sharing variables, i.e. the ones with `og_` or `_x` prefix are set to the same.  If you don't want that behavior, you can override them on a page.  For example, perhaps you want a different image for X/Twitter, then you would override `x_image` to make it different from what is in `image` variable.

#### H4 Headings
You can add an `<h4>` heading in Markdown by using four `#` symbols followed by a space and the heading text, for example: `#### H4 Heading`.  This is useful for creating sub-sections within your content.  Any heading level from H4 to H6 can be used in Markdown to style the content, but they are NOT used in the table of contents, which only uses H2 and H3 headings.  The table of contents is generated automatically based on the headings in the content.

## Markdown Mayhem

Here's a bunch of Markdown content to show how it looks on the web site.  You can add headings, lists, code blocks, and emojis.  The table of contents is generated automatically based on the headings in the content.  The table of contents only uses H2 and H3 headings, so if you want to create sub-sections within your content, you can use H4 to H6 headings.

### Lists
You can create ordered and unordered lists in Markdown.  Unordered lists use `-` or `*` followed by a space and the list item text.  Ordered lists use numbers followed by a period and a space.

#### Unordered List
- Item 1
- Item 2
  - Sub-item 2.1
  - Sub-item 2.2

#### Ordered List
1. First item
2. Second item
   1. Sub-item 2.1
   2. Sub-item 2.2

### Emojis
You can add emojis using the `:emoji_name:` syntax.  For example, `:smile:` will render as 😄.

### Code Blocks
You can add code blocks using triple backticks.  You can also specify the language for syntax
highlighting.  For example, the following code block is a simple C program that prints "Hello World" to the terminal.

```c
#include <stdio.h>

int main()
{
    printf("Hello World");

    return 0;
}
```