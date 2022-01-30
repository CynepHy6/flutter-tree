import map from './map'
import { mapperSingleLine, mapperMultiLine } from './mapper'
import { symbols, triggers } from './constants'
import { replaceSpecial } from './special'

function isSingleAbbr(text: string): boolean {
  return !text.includes(symbols.enter)
}

const lastCommaRe = new RegExp(',$')
export function expand(text: string): string {
  text = filter(text)
  const expanded = map(isSingleAbbr(text) ? mapperSingleLine(text) : mapperMultiLine(text))
  return replaceSpecial(expanded).replace(lastCommaRe, '')
}

export function validate(text: string): boolean {
  return isSingleAbbr(text) ? validateSingleLine(text) : validateMultiLine(text)
}

const FALSE_ABBR = '>]' + '|]\\[' + '|]\\s>\\s' + '|(>|\\[|,){2}' + '|^[^,>[\\]]+$' + '|]>'
const FALSE_ABBR_RE = new RegExp(FALSE_ABBR, 'gi')

function validateSingleLine(abbr: string): boolean {
  if (abbr === '' || abbr.match(FALSE_ABBR_RE)) {
    return false
  }

  let left = 0,
    right = 0
  for (let i = 0; i < abbr.length; i++) {
    switch (abbr[i]) {
      case symbols.childrenBuilder:
        left++
        break
      case symbols.childrenEnd:
        right++
        break
      case symbols.childrenSeparator:
        if (left === 0) {
          return false
        }
        break
      case symbols.childBuilder:
        break
      default:
        if (abbr[i].match(/\W/i)) {
          return false
        }
    }
  }

  return left === right
}

function validateMultiLine(abbr: string): boolean {
  return true
}

function filter(text: string): string {
  text = text.trim()
  if (text.includes(symbols.childrenBuilder)) {
    return limitAbbr(text)
  } else {
    return removeEndTriggers(text)
  }
}

function removeEndTriggers(text: string): string {
  text = text.replace(/\,\]/g, symbols.childrenEnd)
  return triggers.some(e => text.endsWith(e)) ? removeEndTriggers(text.slice(0, -1)) : text
}

function limitAbbr(abbr: string): string {
  let text = '',
    block = 0,
    flag = false
  const index = Array.from(abbr).findIndex((char, pos) => {
    text += char
    switch (char) {
      case symbols.childrenBuilder:
        flag = true
        block++
        break
      case symbols.childrenEnd:
        block--
        break
    }
    if (!block && flag) {
      return pos
    }
  })
  return text.slice(0, index + 1)
}
