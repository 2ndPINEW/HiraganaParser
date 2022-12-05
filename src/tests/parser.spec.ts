// 名前付きでインポートします
import { hiraganaToRomans } from '../parser';

describe('答えが一つだけ', () => {
  [
    {
      hiragana: 'あいうえお',
      ans: ['aiueo']
    }
  ].forEach(test => {
    it(test.hiragana, () => {
      expect(hiraganaToRomans(test.hiragana)).toStrictEqual(test.ans)
    })
  })
})

describe('ちっちゃいつが出てくる系', () => {
  [
    {
      hiragana: 'やっほー',
      ans: ['yahho-', 'yaxtuho-', 'yaltuho-', 'yaxtsuho-', 'yaltsuho-']
    }
  ].forEach(test => {
    it(test.hiragana, () => {
      expect(hiraganaToRomans(test.hiragana)).toStrictEqual(test.ans)
    })
  })
})

describe('「ん」が出てくる', () => {
  [
    {
      hiragana: 'あんなぱん',
      ans: ['annnapann']
    },
    {
      hiragana: 'ぱんこ',
      ans: ['panko', 'pannko', 'panco', 'pannco']
    }
  ].forEach(test => {
    it(test.hiragana, () => {
      expect(hiraganaToRomans(test.hiragana)).toStrictEqual(test.ans)
    })
  })
})