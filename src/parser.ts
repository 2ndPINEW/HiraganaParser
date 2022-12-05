import { ParserConfigs } from "./config";
import { KeyConfigs } from "./parser.interface";

/**
 * 仕様を考える
 * 関数でいいんだ
 * ひらがなを渡したら全パターンのローマ字を返してくれる
 */
export const hiraganaToRomans = (hiraganas: string, configs: KeyConfigs = ParserConfigs) => {
}

const isAlphabet = (char: string) => char !== '' && 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789- ,:(){}.・!&%'.includes(char);
