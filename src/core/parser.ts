import { KEY_CONFIGS } from "./config";
import { KeyConfigs } from "./parser.interface";

let keyConfigs = KEY_CONFIGS

/**
 * Romanのツリー構造を返す
 */
export const hiraganaToRomans = (hiraganas: string, configs: KeyConfigs = KEY_CONFIGS) => {
  keyConfigs = configs

  // Romanのツリー構造を作っていこう
  const startRoman = new Roman('')
  addNextChilds(hiraganas, startRoman)

  return startRoman
}

const addNextChilds = (remainingHiraganas: string, parentRoman: Roman, duplicateFirstLetter?: boolean) => {
  // 空文字の場合は最後の文字なので何もしない
  if (!remainingHiraganas) {
    return
  }

  // 「っ」の時はその次の文字を重ねたやつもいける
  if (remainingHiraganas.startsWith('っ')) {
    const nextHiraganas = remainingHiraganas.slice(1)
    addNextChilds(nextHiraganas, parentRoman, true)
  }

  // 「ん」の時は次がnから始まらないならn一個でいける
  if (isArrowOneNInput(remainingHiraganas)) {
    const nextRoman = new Roman('n')
    parentRoman.addChild(nextRoman)
    const nextHiraganas = remainingHiraganas.slice(1)
    addNextChilds(nextHiraganas, nextRoman, false)
  }

  const matchKeyConfigs = keyConfigs.filter(keyConfig => remainingHiraganas.startsWith(keyConfig.key))
  matchKeyConfigs.forEach(matchKeyConfig => {
    matchKeyConfig.origins.forEach(origin => {
      const nextRoman = duplicateFirstLetter ? new Roman(origin[0] + origin) : new Roman(origin)
      parentRoman.addChild(nextRoman)
      const nextHiraganas = remainingHiraganas.slice(matchKeyConfig.key.length)
      addNextChilds(nextHiraganas, nextRoman)
    })
  })
}

// 残りのひらがなてきに、「n」一つで「ん」を入力できるかどうか
const isArrowOneNInput = (remainingHiraganas: string): boolean => {
  // 「ん」から始まってない場合はだめ
  if (!remainingHiraganas.startsWith('ん')) {
    return false
  }
  const nextHiraganas = remainingHiraganas.slice(1)
  if (!nextHiraganas) return false

  const matchKeyConfigs = keyConfigs.filter(keyConfig => nextHiraganas.startsWith(keyConfig.key))
  return !matchKeyConfigs.some(matchKeyConfig => 
    matchKeyConfig.origins.some(origin => origin.startsWith('n'))
  )
}

export class Roman {
  roma: string
  childs: Roman[] = []
  parent: Roman | undefined

  constructor (roma: string) {
    this.roma = roma
  }

  addChild (roman: Roman): void {
    this.childs.push(roman)
    roman.parent = this
  }
}
