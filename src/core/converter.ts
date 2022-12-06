import { KEY_CONFIGS } from "./config"
import { hiraganaToRomans, Roman } from "./parser"
import { KeyConfigs } from "./parser.interface"

/**
 * ひらがなからローマ字入力できる組み合わせを全部返す
 */
export const hiraganaToRomas = (hiraganas: string, configs: KeyConfigs = KEY_CONFIGS): string[] => {
  const roman = hiraganaToRomans(hiraganas, configs)
  const answers = makeAnswers(roman)
  return answers
}

/**
 * Romanのツリー構造を後ろに辿っていって、ローマ字入力できる組み合わせを作る
 */
export const makeAnswers = (roman: Roman, answers?: string[]) => {
  if (!answers) {
    answers = []
  }
  roman.childs.forEach(child => {
    makeAnswers(child, answers)
  })
  if (roman.childs.length === 0) {
    makeRomas(roman, '', answers)
  }
  return answers
}

// Romanのツリー構造を後ろから前に辿っていってローマ字の並びを作る
const makeRomas = (roman: Roman, roma: string, answers: string[]) => {
  roma = roman.roma + roma
  if (roman.parent) {
    makeRomas(roman.parent, roma, answers)
  } else {
    answers.push(roma)
  }
}