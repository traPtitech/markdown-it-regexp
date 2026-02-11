# @traptitech/markdown-it-regexp

Original: [rlidwka/markdown-it-regexp](https://github.com/rlidwka/markdown-it-regexp)

A [markdown-it](https://github.com/markdown-it/markdown-it) plugin that makes simple regexp replacement easier.

## Installation

```bash
npm install @traptitech/markdown-it-regexp
```

## Usage

```typescript
import MarkdownIt from 'markdown-it'
import RegexpPlugin from '@traptitech/markdown-it-regexp'

const md = MarkdownIt().use(
  RegexpPlugin(/@(\w+)/, (match) => {
    const url = 'http://example.org/u/' + match[1]
    return `<a href="${url}">${match[1]}</a>`
  })
)

console.log(md.render('hello @user'))
// prints: <p>hello <a href="http://example.org/u/user">user</a></p>
```

## API

```typescript
function RegexpPlugin(
  regexp: RegExp,
  replacer: (match: RegExpMatchArray) => string
): (md: MarkdownIt) => void
```

- `regexp`: Regular expression to match in inline text
- `replacer`: Function that receives the match array and returns HTML string

## Development

```bash
# Build
npm run build

# Test
npm test
```
