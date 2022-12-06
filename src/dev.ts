import { GameParser } from ".";

const parser = new GameParser({ hiraganas: 'きんにく' })
console.log(parser.input('k'))
console.log(parser.input('n'))
console.log(parser.input('i'))
console.log(parser.isComplete())
console.log(parser.inputedRoma)
console.log(parser.notInputedRoma)