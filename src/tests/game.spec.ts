// 名前付きでインポートします
import { HiraganaParser } from '..';

describe('HiraganaParserのテスト', () => {
  it ('きんにく - kni', () => {
    const parser = new HiraganaParser({ hiraganas: 'きんにく' })
    parser.input('k')
    parser.input('n')
    parser.input('i')
    expect(parser.inputedHiragana).toBe('き')
    expect(parser.notInputedHiragana).toBe('んにく')
  })

  it ('きんにく - knin', () => {
    const parser = new HiraganaParser({ hiraganas: 'きんにく' })
    parser.input('k')
    parser.input('n')
    parser.input('i')
    parser.input('n')
    expect(parser.inputedHiragana).toBe('き')
    expect(parser.notInputedHiragana).toBe('んにく')
  })

  it ('最後まで入力済みの場合はcompleteフラグが立つこと', () => {
    const parser = new HiraganaParser({ hiraganas: 'きんにく' })
    parser.input('k')
    parser.input('i')
    parser.input('n')
    parser.input('n')
    parser.input('n')
    parser.input('i')
    parser.input('k')
    parser.input('u')
    expect(parser.inputedHiragana).toBe('きんにく')
    expect(parser.notInputedHiragana).toBe('')
    expect(parser.isComplete()).toBe(true)
  })
})
