---
title: Blog
description: The blog page shows a list of all the blog posts.  It uses the custom control `CollectionList`, which looks for all content files in the '/content/blog' and any children folders and provides the blog list sorted by date_created descending.  It also uses the custom control `MonkInset` to provide a large inset speech emoji in blog description.
--- 

::MonkInset{size= 'large'}
:speech_balloon:
::

This is markdown content for the blog list page. The _description_ for this page is defined in the front matter and is injected into the page content right after this.

{{ description }}

### Blog Posts

::CollectionList
