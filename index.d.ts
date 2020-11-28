import Md from 'markdown-it'

declare function regexp(
  reg: RegExp,
  fn: (match: RegExpMatchArray) => string
): (md: Md) => void

export = regexp
