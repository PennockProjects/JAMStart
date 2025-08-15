---
title: Git Repos
description: The Git Projects page is meant as an example of Markdown content page using an external API and displaying external data using a custom content component.
--- 

***Replace this ~~content~~ to your git repo content***

{{ description }}

The `app/component/GitList.vue` component uses `useFetch()` to fetch public GitHub repositories (by default it fetches Pennock Projects repositories including the JAMStart repo, by this can be changed.)  It is invoked from the content Markdown page with `::GitList`

## Pennock Project Repos
::GitList