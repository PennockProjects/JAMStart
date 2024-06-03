---
title: Markdown
description: A cheat sheet to using Markdown
publishedAt: 2023-05-13 10:00:00
isToc: true
---

- [Markdown Cheat Sheet](https://markdownlivepreview.com/)
- [Markdown Extended Syntax](https://www.markdownguide.org/extended-syntax/)
- [Markdown Syntax Highlighting - GitHub](https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml)
- [Markdown NuxtContent Usage](https://content.nuxt.com/usage/markdown)

Markdown is a text file syntax that can get translated into html.

## Headers

```markdown
# H1 Header
## H2 Header
### H3 Header
```

## Text Decoration

```markdown
This is some text. 

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_
```

_You **can** combine them_


## Lists

```markdown
### Unordered List
 - Do the work
 - Collect benefits

### Numbered List
 1. Pay taxes
 2. Die

### Todo List
 - [ ] Buy groceries
 - [ ] Pay bills

 ### Indented List
	- Apple
		- Granny
		- Honey Crisp
	- Banana
```

#### Todo List
 - [ ] Buy groceries
 - [ ] Pay bills


## Tables
```markdown
#### Table
| Name | Surname |
|--|--|
| Pennock | John |

#### Table Center Align
| Name | Surname |
|:--:|:--:|
| Pennock | John |

#### Table Left Aligned
| Name | Surname |
|:--|:--|
| Pennock | John |

#### Table Right Aligned
| Name | Surname |
|--:|--:|
| Pennock | John |
```

rendered as =>

#### Table
| Name | Surname |
|--|--|
| Pennock | John |

#### Table Center Align
| Name | Surname |
|:--:|:--:|
| Pennock | John |

#### Table Left Aligned
| Name | Surname |
|:--|:--|
| Pennock | John |

#### Table Right Aligned
| Name | Surname |
|--:|--:|
| Pennock | John |

## Code

### Code Inline
To create a code element inline you use a single back tick **\`** at the beginning and one **\`** the end.

```markdown
OG Hello World `printf("Hello, World");`
```

produces =>

OG Hello World `printf("Hello, World");`


### Code Block
To create a pre code block you use three back ticks **\`\`\`** at the start and stop of the block

````
```
<html>
	<div>Hello!</div>
</html>
```
````

produces =>

```
<html>
	<div>Hello!</div>
</html>
```

## Adding Footnotes

```md

## Add the "[^1]" footnote reference in the text
## The number is manual.
Example text with specific[^1] footnote reference.

## Below the text add a spearate line
## "[^1]: footnote text goes here"
## number must match footnote reference
[^1]: Full footnote for 'specific' at document end

## The footnote is removed from document flow
## and placed at the bottom of the document
## in an ordered list, number is manual

```
Example text with **specific[^1]** footnote reference.

[^1]: Full footnote for **'specific'** at document end

## Code Block Syntax
You can specify a language syntax highlighting for the code block by adding a language modifier after first back ticks, for example instead of " \`\`\` " you write " \`\`\`js " or " \`\`\`html " 

Here is how markdown written specifying html:
````
```html
<html>
	<div>Hello!</div>
</html>
```
````

is rendered with html syntax highlighting:
```html
<html>
	<div>Hello!</div>
</html>
```

### Language Modifiers
Language modifiers for Markdown MDC (defaults) are:
````
```json
```js
```ts
```html
```css
```vue
```shell
```mdc
```markdown
```md
```yaml
````

### Showing back ticks

To show show back ticks inside of code blocks you add a fourth back tick \`\`\`\` to the outer markdown and then a series of three back ticks \`\`\` does not end the outer block.


`````
````
```js
let x = 1 + 1
```
````
`````

For inline code, you add an escape `\` before the back tick \`

## Links

```
## Regular link
[regular](https://www.x.com/)

## Link opens in new tab
[new tab](https://www.x.com/){:target="_blank"}
```

[regular](https://www.x.com/)

[new tab](https://www.x.com/){:target="_blank"}

* see [stackoverflow discussion](https://stackoverflow.com/questions/4425198/can-i-create-links-with-target-blank-in-markdown)

