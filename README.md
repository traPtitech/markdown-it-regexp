# @traptitech/markdown-it-regexp

**Forked from https://github.com/rlidwka/markdown-it-regexp**

Make simple [markdown-it](https://github.com/markdown-it/markdown-it) plugins easier.

## Usage:

```js
var MD     = require('markdown-it')
var Plugin = require('markdown-it-regexp')

var plugin = Plugin(
  // regexp to match
  /@(\w+)/,

  // this function will be called when something matches
  function(match) {
    var url = 'http://example.org/u/' + match[1]

    return '<a href="' + md.utils.escape(url) + '">'
         + md.utils.escape(match[1])
         + '</a>'
  }
)

var md = MD()
  .use(plugin)
  .render("hello @user")

// prints out:
// <p>hello <a href="http://example.org/u/user">user</a></p>
```

[Live demo as jsfiddle](https://jsfiddle.net/arve0/nz0Lb6ox/).

## Fair warning:

1. it could be slower than you expect
2. it is a draft, breaking changes might happen
