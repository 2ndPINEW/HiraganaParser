import { KEY_CONFIGS } from "./config";
import { KeyConfigs } from "./parser.interface";

let keyConfigs = KEY_CONFIGS

/**
 * ひらがなを渡したら全パターンのローマ字を返してくれる
 */
export const hiraganaToRomans = (hiraganas: string, keyConfigs: KeyConfigs = KEY_CONFIGS) => {
  keyConfigs =  keyConfigs
  const answers: string[] = []

  // Romanのツリー構造を作っていこう
  const startRoman = new Roman('')
  addNextChilds(hiraganas, startRoman, answers)

  return answers
}

const addNextChilds = (remainingHiraganas: string, parentRoman: Roman, answers: string[], duplicateFirstLetter?: boolean) => {
  // 空文字の場合は最後の文字なので、ローマ字の並びを完成させる
  if (!remainingHiraganas) {
    onCompleteMakeRoman(parentRoman, '', answers)
    return
  }

  // 「っ」の時はその次の文字を重ねたやつもいける
  if (remainingHiraganas.startsWith('っ')) {
    const nextHiraganas = remainingHiraganas.slice(1)
    addNextChilds(nextHiraganas, parentRoman, answers, true)
  }

  // 「ん」の時は次がnから始まらないならn一個でいける
  if (isArrowOneNInput(remainingHiraganas)) {
    const nextRoman = new Roman('n')
    parentRoman.addChild(nextRoman)
    const nextHiraganas = remainingHiraganas.slice(1)
    addNextChilds(nextHiraganas, nextRoman, answers, false)
  }

  const matchKeyConfigs = keyConfigs.filter(keyConfig => remainingHiraganas.startsWith(keyConfig.key))
  matchKeyConfigs.forEach(matchKeyConfig => {
    matchKeyConfig.origins.forEach(origin => {
      const nextRoman = duplicateFirstLetter ? new Roman(origin[0] + origin) : new Roman(origin)
      parentRoman.addChild(nextRoman)
      const nextHiraganas = remainingHiraganas.slice(matchKeyConfig.key.length)
      addNextChilds(nextHiraganas, nextRoman, answers)
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
  console.log(remainingHiraganas, nextHiraganas)
  if (!nextHiraganas) return false

  const matchKeyConfigs = keyConfigs.filter(keyConfig => nextHiraganas.startsWith(keyConfig.key))
  return !matchKeyConfigs.some(matchKeyConfig => 
    matchKeyConfig.origins.some(origin => origin.startsWith('n'))
  )
}

// Romanのツリー構造が完成したらローマ字に直す
const onCompleteMakeRoman = (roman: Roman, roma: string, answers: string[]) => {
  roma = roman.roma + roma
  if (roman.parent) {
    onCompleteMakeRoman(roman.parent, roma, answers)
  } else {
    answers.push(roma)
  }
}

class Roman {
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
