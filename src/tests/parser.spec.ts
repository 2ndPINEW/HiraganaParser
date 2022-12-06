// 名前付きでインポートします
import { hiraganaToRomans } from '../';

describe('答えが一つだけ', () => {
  [
    {
      hiragana: 'あいうえお',
      ans: [ 'aiueo', 'aiwueo', 'aiwhueo', 'ayiueo', 'ayiwueo', 'ayiwhueo' ]
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
      ans: ['yahho-', 'yaltuho-', 'yaxtuho-', 'yaltsuho-', 'yaxtsuho-']
    },
    {
      hiragana: 'ぽっちゃ',
      ans: [
        'pottilya',     'pottixya',     'pocchilya',
        'pocchixya',    'pottya',       'poccya',
        'poccha',       'poltutilya',   'poltutixya',
        'poltuchilya',  'poltuchixya',  'poltutya',
        'poltucya',     'poltucha',     'poxtutilya',
        'poxtutixya',   'poxtuchilya',  'poxtuchixya',
        'poxtutya',     'poxtucya',     'poxtucha',
        'poltsutilya',  'poltsutixya',  'poltsuchilya',
        'poltsuchixya', 'poltsutya',    'poltsucya',
        'poltsucha',    'poxtsutilya',  'poxtsutixya',
        'poxtsuchilya', 'poxtsuchixya', 'poxtsutya',
        'poxtsucya',    'poxtsucha'
      ],
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
      ans: [
        'annnapann', "annnapan'",
        'annnapaxn', "an'napann",
        "an'napan'", "an'napaxn",
        'axnnapann', "axnnapan'",
        'axnnapaxn'
      ]
    },
    {
      hiragana: 'ぱんこ',
      ans: [
        'panko',  'panco',
        'pannko', 'pannco',
        "pan'ko", "pan'co",
        'paxnko', 'paxnco'
      ]
    }
  ].forEach(test => {
    it(test.hiragana, () => {
      expect(hiraganaToRomans(test.hiragana)).toStrictEqual(test.ans)
    })
  })
})