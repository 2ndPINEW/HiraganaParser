
(function() {
    console.log('parser.js ready')
})()

class Roman {
    constructor (char, allow, done = 0, parsed = false ){
        this.char = char
        this.allow = allow
        this.done = done
        this.parsed = parsed
    }
}

class RomanToKana {
    hiragana
    romanList

    constructor (romanList) {
        this.romanToKana(romanList)
    }

    romanToKana (romanList) {
        let hiragana = ""
        let skipCount = 0

        let inputRomanList = romanList.filter(function(x) {
            return x.done > 0
        })

        for (let index = 0; index < inputRomanList.length; index++) {
            let roman = inputRomanList[index]
            if (roman.done <= 0){
                roman.parsed = false
                continue
            }

            if (skipCount > 0) {
                skipCount --
                roman.parsed = true
                continue
            }

            // done が 2 以上でn以外のとき
            if (roman.done >= 2 && roman.char != 'n') {
                hiragana += 'っ'.repeat(roman.done - 1)
                let target = ""
                let find = false

                if (roman.done == Math.max.apply(null, roman.allow)) {
                    roman.parsed = true
                    if (index + 2 < inputRomanList.length) {
                        target = roman.char + inputRomanList[index + 1].char + inputRomanList[index + 2].char
                        jsonData.two.forEach((tmp) => {
                            tmp.origin.forEach((origin) => {
                                if (target == origin && !find) {
                                    hiragana += tmp.key
                                    skipCount = 2
                                    find = true
                                }
                            })
                        })
                        jsonData.one.forEach((tmp) => {
                            tmp.origin.forEach((origin) => {
                                if (target == origin && !find) {
                                    hiragana += tmp.key
                                    skipCount = 2
                                    find = true
                                }
                            })
                        })
                    }
                    if (index + 1 < inputRomanList.length) {
                        target = roman.char + inputRomanList[index + 1].char
                        jsonData.two.forEach((tmp) => {
                            tmp.origin.forEach((origin) => {
                                if (target == origin && !find) {
                                    hiragana += tmp.key
                                    skipCount = 1
                                    find = true
                                }
                            })
                        })
                        jsonData.one.forEach((tmp) => {
                            tmp.origin.forEach((origin) => {
                                if (target == origin && !find) {
                                    hiragana += tmp.key
                                    skipCount = 1
                                    find = true
                                }
                            })
                        })
                    }
                    if (find) {
                        roman.parsed = true
                        continue
                    }
                }
            }

            // allow が [1, 2] で doneが 1以上で n の時
            if (roman.done >= 1 && Math.max.apply(null, roman.allow) >= 2 && roman.char == "n") {
                roman.parsed = true
                hiragana += 'ん'
                continue
            }

            let find = false
            if (index + 2 < inputRomanList.length) {
                let target = roman.char + inputRomanList[index + 1].char + inputRomanList[index + 2].char
                jsonData.two.forEach((tmp) => {
                    tmp.origin.forEach((origin) => {
                        if (target == origin && !find) {
                            hiragana += tmp.key
                            skipCount = 2
                            find = true
                        }
                    })
                })
                jsonData.one.forEach((tmp) => {
                    tmp.origin.forEach((origin) => {
                        if (target == origin && !find) {
                            hiragana += tmp.key
                            skipCount = 2
                            find = true
                        }
                    })
                })
            }
            if (index + 1 < inputRomanList.length && !find) {
                let target = roman.char + inputRomanList[index + 1].char
                jsonData.two.forEach((tmp) => {
                    tmp.origin.forEach((origin) => {
                        if (target == origin && !find) {
                            hiragana += tmp.key
                            skipCount = 1
                            find = true
                        }
                    })
                })
                jsonData.one.forEach((tmp) => {
                    tmp.origin.forEach((origin) => {
                        if (target == origin && !find) {
                            hiragana += tmp.key
                            skipCount = 1
                            find = true
                        }
                    })
                })
            }
            if (!find) {
                let target = roman.char
                jsonData.one.forEach((tmp) => {
                    tmp.origin.forEach((origin) => {
                        if (target == origin && !find) {
                            hiragana += tmp.key
                            find = true
                        }
                    })
                })
            }
            if (find) {
                roman.parsed = true
                continue
            }
        }
        this.hiragana = hiragana
        this.romanList = romanList
    }
}

class inputChkReturnObj {
    isAcceptInput
    romanList
    
    constructor (romanList, isAcceptInput = false) {
        this.isAcceptInput = isAcceptInput
        this.romanList = romanList
    }

    checkRomanList (romanList) {
        romanList.forEach(roman => {
            allow = Math.max.apply(null, roman.allow)
            if (allow < roman.done)
                throw 'ParseError: 入力完了数が許可された最大値を超えています'
        })
        return new RomanToKana(romanList)
    }

    kanaToRoman (hiraganas) {
        let romans = []
        let skipCount = 0
        let find = false

        for (let index = 0; index < hiraganas.length; index++) {
            let hiragana = hiraganas[index]
            if (skipCount > 0) {
                skipCount--
                continue
            }

            if (hiragana == 'ん') {
                find = false
                if (index + 1 == hiraganas.length) {
                    romans.push(new Roman('n', [2]))
                    continue
                }
                jsonData.one.forEach((tmp) => {
                    tmp.origin.forEach((origin) => {
                        if ((index >= hiraganas.length && !find) ||
                            (hiraganas[index + 1] == tmp.key && origin[0] == 'n' && !find)) {
                            romans.push(new Roman('n', [2]))
                            find = true
                        }
                    })
                })
                if (!find) {
                    romans.push(new Roman('n', [1, 2]))
                }
            }
            else if (hiragana == 'っ') {
                let endIndex = index
                for (let tmpIndex = 0; tmpIndex < hiraganas.length; tmpIndex++) {
                    if (tmpIndex < index) continue
                    if (hiragana != hiraganas[tmpIndex]) {
                        endIndex = tmpIndex - 1
                        break
                    }
                }
                find = false
                if (hiraganas.length > endIndex + 2 && !find) {
                    let target = hiraganas[endIndex + 1] + hiraganas[endIndex + 2]
                    jsonData.two.forEach((tmp) => {
                        if (target == tmp.key && !find) {
                            romans.push(new Roman(tmp.origin[0][0], [endIndex - index + 2]))
                            let origins = tmp.origin[0].slice(1)
                            for (var i = 0; i < origins.length; i++) {
                                let origin = origins[i]
                                romans.push(new Roman(origin, [1]))
                            }
                            find = true
                            skipCount = endIndex - index + 2
                        }
                    })
                }

                if (hiraganas.length > endIndex + 1 && !find) {
                    let target = hiraganas[endIndex + 1]
                    jsonData.one.forEach((tmp) => {
                        if (target == tmp.key && !find) {
                            romans.push(new Roman(tmp.origin[0][0], [endIndex - index + 2]))
                            let origins = tmp.origin[0].slice(1)
                            for (var i = 0; i < origins.length; i++) {
                                let origin = origins[i]
                                romans.push(new Roman(origin, [1]))
                            }
                            find = true
                            skipCount = endIndex - index + 1
                        }
                    })
                }
                
                if (!find) {
                    throw "ParseError1" + hiraganas
                }
            }
            else {
                find = false
                if (hiraganas.length > index + 1 && !find) {
                    let target = hiraganas[index] + hiraganas[index + 1]
                    jsonData.two.forEach((tmp) => {
                        if (target == tmp.key && !find) {
                            let origins = tmp.origin[0]
                            for (var i = 0; i < origins.length; i++) {
                                let origin = origins[i]
                                romans.push(new Roman(origin, [1]))
                            }
                            find = true
                            skipCount = 1
                        }
                    })
                }
                if (hiraganas.length > index && !find) {
                    let target = hiraganas[index]
                    jsonData.one.forEach((tmp) => {
                        if (target == tmp.key && !find) {
                            let origins = tmp.origin[0]
                            for (var i = 0; i < origins.length; i++) {
                                let origin = origins[i]
                                romans.push(new Roman(origin, [1]))
                            }
                            find = true
                            skipCount = 0
                        }
                    })
                }
                if (!find) {
                    throw "ParseError2" + hiraganas
                }
            }
        }
        return romans
    }
}

class Parser {
    inputCheck (answer, romanList, newInput) {
        let tmpInputCheckReturnObj = new inputChkReturnObj([])
        if (newInput.length != 1 || answer.length < 1) {
            return new inputChkReturnObj(romanList)
        }

        if (!romanList || romanList == []) {
            romanList = tmpInputCheckReturnObj.kanaToRoman(answer)
        }

        let skipN = false
        // 入力された文字がRoman配列の順番通りなら入力値のカウントを追加
        for (let index = 0; index < romanList.length; index++) {
            let roman = romanList[index]
            // 入力された回数が許可された回数よりも少ない場合
            // // console.log(roman.allow)
            // // console.log(Math.max.apply(null, roman.allow))
            if (Math.max.apply(null, roman.allow) > roman.done && roman.char == newInput) {
                romanList[index].done += 1
                if (roman.done == Math.max.apply(null, roman.allow)) {
                    romanList[index].allow = [roman.done]
                }
                if (skipN) {
                    romanList[index - 1].allow = [1]
                    romanList[index - 1].parsed = true
                }
                return new inputChkReturnObj(romanList, true)
            }
            if (roman.char == 'n' && Math.max.apply(null, roman.allow) >= 2 && roman.done == 1) {
                skipN = true
                continue
            }
            if (Math.max.apply(null, roman.allow) > roman.done) break
        }

        // パースできてない最後の文字の入力数が1以上で,allowが2以上,n以外ならその時点で入力を拒否
        for (let index = 0; index < romanList.length; index++) {
            let roman = romanList[index]
            let allow = Math.max.apply(null, roman.allow)
            if (roman.char != 'n' && allow >= 2 && roman.done >= 1 && allow != roman.done){
                return new inputChkReturnObj(romanList)
            }
            if (Math.max.apply(null, roman.allow) > roman.done){
                break
            }
        }

        // 直前の文字がちっちゃいっでそれの入力が完了していて、次が未入力ならRomanに沿わない場合は無視
        for (let index = 0; index < romanList.length; index++) {
            let roman = romanList[index]
            if (index > 1 &&
                romanList[index - 1].done >= 2 &&
                romanList[index - 1].done == Math.max.apply(null, romanList[index - 1].allow) && 
                romanList[index - 1].char != 'n' &&
                roman.done < 1) {
                if (roman.char == newInput && roman.done < Math.max.apply(null, roman.allow)) {
                    romanList[index].done += 1
                    return new inputChkReturnObj(romanList, true)
                } else {
                    return new inputChkReturnObj(romanList)
                }
            }
        }

        let romanToKana = new RomanToKana(romanList)
        let parsedText = romanToKana.hiragana
        let parsedRomanList = romanToKana.romanList

        if (!answer.startsWith(parsedText)) {
            return new inputChkReturnObj(romanList)
        }

        let notParsedText = answer.replace(parsedText, '')
        let notParsedTarget = ''

        for (let romanIndex = 0; romanIndex < parsedRomanList.length; romanIndex++) {
            let roman = parsedRomanList[romanIndex]
            if (!roman.parsed && Math.max.apply(null, roman.allow) >= 2 && roman.done == 0 && (newInput == 'x' || newInput == 'l')) {
                parsedRomanList = parsedRomanList.filter(roman => roman.done > 0 && roman.parsed)
                for (let oneIndex = 0; oneIndex < jsonData.one.length; oneIndex++) {
                    let tmp = jsonData.one[oneIndex]
                    for (let originIndex = 0; originIndex < tmp.origin.length; originIndex++) {
                        let origin = tmp.origin[originIndex]
                        if (notParsedText[0] == tmp.key && origin.startsWith(newInput)) {
                            [].forEach.call(origin, function(char_origin) {
                                if (newInput == char_origin) {
                                    parsedRomanList.push(new Roman(char_origin, [1], 1))
                                } else {
                                    parsedRomanList.push(new Roman(char_origin, [1], 0))
                                }
                            })
                            let addText = tmp.key
                            notParsedText = answer.replace(parsedText + addText, '')
                            let additionalList = tmpInputCheckReturnObj.kanaToRoman(notParsedText)
                            parsedRomanList = parsedRomanList.concat(additionalList)
                            return new inputChkReturnObj(parsedRomanList, true)
                        }
                    }
                }
            }
        }

        let notParsedRomanList = parsedRomanList.filter(item => !item.parsed)
        parsedRomanList = parsedRomanList.filter(item => item.done > 0 && item.parsed)

        notParsedRomanList.forEach((notParsed) => {
            if (notParsed.done > 0) {
                notParsedTarget += notParsed.char.repeat(notParsed.done)
            }
        })
        notParsedTarget += newInput

        let hiragana = ""
        let find = false

        jsonData.two.forEach((tmp) => {
            for(let index = 0; index < tmp.origin.length; index++) {
                let origin = tmp.origin[index]
                if (origin.startsWith(notParsedTarget) && !find && notParsedText.startsWith(tmp.key)) {
                    hiragana += tmp.key
                    find  =true
                    let inputed = false
                    for (var i = 0; i < origin.length; i++) {
                        let char_origin = origin[i]
                        if (!inputed) parsedRomanList.push(new Roman(char_origin, [1], 1))
                        if (newInput == char_origin) {
                            inputed = true
                            continue
                        }
                        if (inputed) parsedRomanList.push(new Roman(char_origin, [1], 0))
                    }
                }
            }
        })
        jsonData.one.forEach((tmp) => {
            for(let index = 0; index < tmp.origin.length; index++) {
                let origin = tmp.origin[index]
                if (origin.startsWith(notParsedTarget) && ! find && notParsedText.startsWith(tmp.key)) {
                    hiragana += tmp.key
                    find  =true
                    let inputed = false
                    for (var i = 0; i < origin.length; i++) {
                        let char_origin = origin[i]
                        if (!inputed) parsedRomanList.push(new Roman(char_origin, [1], 1))
                        if (newInput == char_origin) {
                            inputed = true
                            continue
                        }
                        if (inputed) parsedRomanList.push(new Roman(char_origin, [1], 0))
                    }
                }
            }
        })
        if (find) {
            notParsedText = notParsedText.replace(hiragana, "")
            let additionalList = tmpInputCheckReturnObj.kanaToRoman(notParsedText)
            parsedRomanList = parsedRomanList.concat(additionalList)
            return new inputChkReturnObj(parsedRomanList, true)
        }
        else {
            return new inputChkReturnObj(romanList)
        }

    }
}

class Typing {
    ans
    romans
    tmpCheckObj = new inputChkReturnObj([])
    parser = new Parser()
    inputed = ""
    notInputed = ""
    isAcceptInput
    isComplete

    constructor (ans) {
        this.ans = ans
        this.romans = this.tmpCheckObj.kanaToRoman(ans.hiragana)
        this._updateInputedInfo(this.romans)
    }

    checkComplete (romans) {
        for (let i = 0; i < romans.length; i++) {
            let roman = romans[i]
            if (roman.done != Math.max.apply(null, roman.allow)) return false
        }
        return true
    }

    _updateInputedInfo (romans) {
        this.inputed = ""
        this.notInputed = ""
        romans.forEach((roman) => {
            this.inputed += roman.char.repeat(roman.done)
            this.notInputed += roman.char.repeat(roman.allow[0] - roman.done)
        })
    }

    newInput (char) {
        let tmp = this.parser.inputCheck(this.ans.hiragana, this.romans, char)
        this.isComplete = this.checkComplete(tmp.romanList)
        this.isAcceptInput = tmp.isAcceptInput || this.isComplete
        this.romans = tmp.romanList
        this._updateInputedInfo(tmp.romanList)
    }
}
