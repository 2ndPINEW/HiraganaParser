import { KEY_CONFIGS } from "./config";
import { KeyConfigs } from "./parser.interface";

/**
 * 仕様を考える
 * 関数でいいんだ
 * ひらがなを渡したら全パターンのローマ字を返してくれる
 */
export const hiraganaToRomans = (hiraganas: string, configs: KeyConfigs = KEY_CONFIGS) => {
  // Romanのツリー構造を作っていこう
  const startRoman = new Roman('')
}

class Roman {
  char: string
  childs: Roman[] = []

  constructor (char: string) {
    this.char = char
  }

  addChild (roman: Roman): void {
    this.childs.push(roman)
  }
}

const isAlphabet = (char: string) => char !== '' && 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789- ,:(){}.・!&%'.includes(char);
