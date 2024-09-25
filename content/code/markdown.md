---
title: Markdown Examples
description: Examples and snippets for authoring using Markdown
topic: Markdown
isToc: true
createAuthor: John Pennock
createDate: 2023-05-13
image: /images/MarkdownFileLogo.png
imageAlt: Markdown File Logo
---

#### Other Cheat Sheets
- [Markdown Cheat Sheet](https://markdownlivepreview.com/){target="_blank"}
- [Markdown Extended Syntax](https://www.markdownguide.org/extended-syntax/){target="_blank"}

- [Markdown Syntax Highlighting - GitHub](https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml){target="_blank"}
- [Markdown NuxtContent Usage](https://content.nuxt.com/usage/markdown){target="_blank"}

## Headers

```md
# H1 Header
## H2 Header
### H3 Header
```

## Text Decoration

```text
This is some plain text. 

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

You _**can** combine them_
```

You _**can** combine them_


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

## Tables
```markdown
#### Table
| Name | Surname |
|------|---------|
| John | Pennock |

#### Table Center Align
| Name | Surname |
|:----:|:-------:|
| John | Pennock |

#### Table Left Aligned
| Name | Surname |
|:--|:--|
| John | Pennock |

#### Table Right Aligned
| Name | Surname |
|-----:|--------:|
| John | Pennock |
```
rendered as
___
#### Table
| Name | Surname |
|------|---------|
| John | Pennock |

#### Table Center Align
| Name | Surname |
|:----:|:-------:|
| John | Pennock |

#### Table Left Aligned
| Name | Surname |
|:--|:--|
| John | Pennock |

#### Table Right Aligned
| Name | Surname |
|-----:|--------:|
| John | Pennock |

## Markdown Footnotes

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

### Code Block Syntax
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

#### Language Modifiers
The Default Language modifiers for Markdown MDC (defaults) are:
````
```json
```javascript  or ```js
```typescript  or ```ts
```html
```css
```vue
```shell
```mdc
```markdown or ```md
```yaml
````

You can override this list by configuring your `nuxt.config.ts` file with languages found [here](https://github.com/shikijs/textmate-grammars-themes/tree/main/packages/tm-grammars){target="_blank"}

Note: To add to the default ones, you have to re-specify the defaults along with the new ones.

For example to add 'c', 'python', and 'terraform' to the defaults:

```js
  content: {
    highlight: {
      langs: [ 
        'json', 'js', 'typescript', 'html', 'css', 'vue', 'shell', 'mdc', 'markdown', 'yaml',
        'c', 'python', 'terraform']
		}
	}
```


#### Showing back ticks

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

## Horizontal Rule `<hr>`

These all work

```md
<hr>
<!-- html self closing tag  -->

___
<!-- 3 underscores  -->

***
<!-- 3 asterisks  -->
```

3 dashes DOES NOT WORK

```md
---
<!-- 3 dashes does not work -->

```

___
