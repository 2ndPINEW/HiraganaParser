// 名前付きでインポートします
import { hiraganaToRomas } from '../index.mjs';

describe('答えが一つだけ', () => {
  [
    {
      hiragana: 'あいうえお',
      ans: [ 'aiueo', 'aiwueo', 'aiwhueo', 'ayiueo', 'ayiwueo', 'ayiwhueo' ]
    }
  ].forEach(test => {
    it(test.hiragana, () => {
      expect(hiraganaToRomas(test.hiragana).sort()).toEqual(test.ans.sort())
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
    },
    {
      hiragana: 'いっぬ',
      ans: [
        "iltunu", "ixtunu", "iltsunu", "ixtsunu",
        "yiltunu", "yixtunu", "yiltsunu", "yixtsunu"
      ]
    },
    {
      hiragana: 'ぴっあ',
      ans: [
        'piltsua', 'piltua', 'pixtsua', 'pixtua'
      ]
    },
    {
      hiragana: 'ぴっや',
      ans: [
        'piltsuya', 'piltuya', 'pixtsuya', 'pixtuya'
      ]
    }
  ].forEach(test => {
    it(test.hiragana, () => {
      expect(hiraganaToRomas(test.hiragana).sort()).toEqual(test.ans.sort())
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
    },
    {
      hiragana: 'たんい',
      ans: [
        "tan'i",
        "tan'yi",
        "tanni",
        "tannyi",
        "taxni",
        "taxnyi",
      ]
    }
  ].forEach(test => {
    it(test.hiragana, () => {
      expect(hiraganaToRomas(test.hiragana).sort()).toEqual(test.ans.sort())
    })
  })
})