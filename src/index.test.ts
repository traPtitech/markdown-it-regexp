import { describe, it, expect } from 'vitest'
import MarkdownIt from 'markdown-it'
import RegexpPlugin from './index.js'

describe('markdown-it-regexp', () => {
  it('should replace matched pattern with custom HTML', () => {
    const md = MarkdownIt().use(
      RegexpPlugin(/@(\w+)/, (match) => {
        return `<a href="http://example.org/u/${match[1]}">${match[1]}</a>`
      })
    )

    const result = md.render('hello @user')
    expect(result).toBe('<p>hello <a href="http://example.org/u/user">user</a></p>\n')
  })

  it('should handle multiple mentions in one line', () => {
    const md = MarkdownIt().use(
      RegexpPlugin(/@(\w+)/, (match) => {
        return `<span class="mention">@${match[1]}</span>`
      })
    )

    const result = md.render('hello @alice and @bob')
    expect(result).toBe(
      '<p>hello <span class="mention">@alice</span> and <span class="mention">@bob</span></p>\n'
    )
  })

  it('should work with different patterns', () => {
    const md = MarkdownIt().use(
      RegexpPlugin(/#(\d+)/, (match) => {
        return `<a href="/issues/${match[1]}">#${match[1]}</a>`
      })
    )

    const result = md.render('see issue #123')
    expect(result).toBe('<p>see issue <a href="/issues/123">#123</a></p>\n')
  })

  it('should handle no matches', () => {
    const md = MarkdownIt().use(
      RegexpPlugin(/@(\w+)/, (match) => {
        return `<span>${match[1]}</span>`
      })
    )

    const result = md.render('hello world')
    expect(result).toBe('<p>hello world</p>\n')
  })

  it('should support multiple plugins', () => {
    const md = MarkdownIt()
      .use(
        RegexpPlugin(/@(\w+)/, (match) => {
          return `<span class="user">@${match[1]}</span>`
        })
      )
      .use(
        RegexpPlugin(/#(\d+)/, (match) => {
          return `<span class="issue">#${match[1]}</span>`
        })
      )

    const result = md.render('hello @user see #42')
    expect(result).toBe(
      '<p>hello <span class="user">@user</span> see <span class="issue">#42</span></p>\n'
    )
  })

  it('should handle special regex flags', () => {
    const md = MarkdownIt().use(
      RegexpPlugin(/hello/i, (match) => {
        return `<strong>${match[0]}</strong>`
      })
    )

    const result = md.render('HELLO world')
    expect(result).toBe('<p><strong>HELLO</strong> world</p>\n')
  })

  it('should work with capture groups', () => {
    const md = MarkdownIt().use(
      RegexpPlugin(/(\w+):(\w+)/, (match) => {
        return `<span data-key="${match[1]}" data-value="${match[2]}">${match[0]}</span>`
      })
    )

    const result = md.render('status:active')
    expect(result).toBe(
      '<p><span data-key="status" data-value="active">status:active</span></p>\n'
    )
  })
})
