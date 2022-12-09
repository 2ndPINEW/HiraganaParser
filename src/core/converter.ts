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
  roman.children.forEach(child => {
    makeAnswers(child, answers)
  })
  if (roman.children.length === 0) {
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

/**
 * Romanのツリー構造から、入力済みのローマ字からパースできるひらがなで適切そうなものを返す
 * FIXME: このへんのロジック突貫工事で汚いから直したい
 */
export const romaToHiranaga = (roman: Roman, inputedRoma: string): string => {
  const hiraganas = romanToHiraganas(roman, inputedRoma, []).sort((a, b) => { return b.length - a.length })
  if (hiraganas.length >= 1) {
    return hiraganas[0]
  }
  return ''
}

/**
 * 入力済みのローマ字からパースできてるひらがなの一覧を返す
 */
const romanToHiraganas = (roman: Roman, inputedRoma: String, answers: string[]) => {
  console.log(inputedRoma)
  roman.children.forEach(child => {
    if (inputedRoma.startsWith(child.roma)) {
      romanToHiraganas(child, inputedRoma.replace(child.roma, ''), answers)
    } else {
      makeHiraganas(roman, '', answers)
    }
  })
  return answers
}

/**
 * Romanを後ろから辿っていって、ひらがなを組み立てる
 */
const makeHiraganas = (roman: Roman, hiragana: string, answers: string[]) => {
  hiragana = roman.hiragana + hiragana
  if (roman.parent) {
    makeHiraganas(roman.parent, hiragana, answers)
  } else {
    answers.push(hiragana)
  }
}