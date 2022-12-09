import { makeAnswers, romaToHiranaga } from "./converter"
import { hiraganaToRomans, Roman } from "./parser"
import { KeyConfigs } from "./parser.interface"

export interface GameParserOption {
  hiraganas: string
  configs?: KeyConfigs
}

/**
 * タイピングゲーム向けのパーサー
 * パースしたいひらがなを引数に渡して初期化します
 */
export class GameParser {
  /** パーサーのオプション */
  private options: GameParserOption

  private roman: Roman
  private answers: string[]

  private _inputedRoma: string = ''

  get inputedRoma (): string {
    return this._inputedRoma
  }

  get notInputedRoma (): string {
    const answer = this.answers.find(answer => answer.startsWith(this._inputedRoma))
    if (answer) {
      return answer.replace(this._inputedRoma, '')
    }
    return answer ?? ''
  }

  private _inputedHiragana: string = ''

  get inputedHiragana (): string {
    return this._inputedHiragana
  }

  get notInputedHiragana (): string {
    return this.options.hiraganas.replace(this._inputedHiragana, '')
  }

  constructor (options: GameParserOption) {
    this.options = options
    this.roman = hiraganaToRomans(options.hiraganas, options.configs)
    this.answers = makeAnswers(this.roman).sort((a, b) => { return a.length - b.length })
  }

  /**
   * 次の文字を入力する、入力を受け入れたらtrueを返す
   */
  input = (char: string): boolean => {
    const newInputedString = `${this._inputedRoma}${char}`
    const canInput = this.answers.some(answer => answer.startsWith(newInputedString))
    if (canInput) {
      this._inputedRoma = newInputedString
    }

    // ここでひらがな探す
    this._inputedHiragana = romaToHiranaga(this.roman, this.inputedRoma)

    return canInput
  }

  /**
   * 入力が完了しているかどうか
   */
  isComplete = (): boolean => {
    return this.answers.some(answer => answer === this._inputedRoma)
  }
}
