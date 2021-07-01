#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
from typing import List
import sys
import termios
import random
import time

endQuestionNumber = 20

with open ('./dict.json', 'r') as f:
    jsonData = json.load(f)

class Roman:
    char = ""
    allow = []
    done = 0
    parsed = False

    def __init__(self, char, allow, done = 0, parsed = False):
        self.char = char
        self.allow = allow
        self.done = done
        self.parsed = parsed

class inputChkReturnObj:
    acceptInput: bool
    isComplete: bool
    romanList: List[Roman]

    def kanaToRoman (kanas: str):
        romans = []
        skipCount = 0
        # ひらがなを2, 1で調べる
        # 小さいっからのときは次のっ以外の文字までの場所を探してあったっの数 + 1のroman突っ込む
        for index, kana in enumerate(kanas):
            if (skipCount > 0):
                skipCount -= 1
                continue
            if (kana == 'ん'):
                find = False
                # 最後の要素ならn一個追加
                if (index + 1 == len(kanas)):
                    romans.append(Roman("n", [2]))
                    continue
                for tmp in jsonData["one"]:
                    for origin in tmp["origin"]:
                        # 次の文字を探して最初のローマ字がnかないなら n,[2]
                        if ((index >= len(kanas) and not find) or (kanas[index + 1] == tmp["key"] and origin[0] == 'n' and not find)):
                            romans.append(Roman("n", [2]))
                            find = True
                if (not find):
                    # 次の文字を探して最初のローマ字がn以外なら n,[1,2] をappend
                    romans.append(Roman("n", [1, 2]))
            elif (kana == 'っ'):
                # 連続した「っ」の最後のindexを取得する
                endIndex = index
                for tmpIndex in range(len(kanas)):
                    if (tmpIndex < index):
                        continue
                    if (kana != kanas[tmpIndex]):
                        endIndex = tmpIndex - 1
                        break
                # っが終わる次2文字を探して最初の1文字をっの数だけ重ねてappend
                # その後ろのローマ字を順にappend
                find = False
                if (len(kanas) > endIndex + 2 and not find):
                    target = kanas[endIndex + 1] + kanas[endIndex + 2]
                    for tmp in jsonData["two"]:
                        if (target == tmp["key"] and not find):
                            romans.append(Roman(tmp['origin'][0][0], [endIndex - index + 2]))
                            for origin in tmp["origin"][0][1:]:
                                romans.append(Roman(origin, [1]))
                            find = True
                            skipCount = endIndex - index + 2

                if (len(kanas) > endIndex + 1 and not find):
                    target = kanas[endIndex + 1]
                    for tmp in jsonData["one"]:
                        if (target == tmp["key"] and not find):
                            romans.append(Roman(tmp['origin'][0][0], [endIndex - index + 2]))
                            for origin in tmp["origin"][0][1:]:
                                romans.append(Roman(origin, [1]))
                            find = True
                            skipCount = endIndex - index + 1
                if (not find):
                    print('パース失敗')
            else:
                find = False
                if (len(kanas) > index + 1 and not find):
                    target = kanas[index] + kanas[index + 1]
                    for tmp in jsonData["two"]:
                        if (target == tmp["key"] and not find):
                            for origin in tmp["origin"][0]:
                                romans.append(Roman(origin, [1]))
                            find = True
                            skipCount = 1

                if (len(kanas) > index and not find):
                    target = kanas[index]
                    for tmp in jsonData["one"]:
                        if (target == tmp["key"] and not find):
                            for origin in tmp["origin"][0]:
                                romans.append(Roman(origin, [1]))
                            find = True
                            skipCount = 0
                if (not find):
                    print('パース失敗')
        return romans
        
    def romanToKana (romanList: List[Roman]):
        kana = ""
        skipCount = 0

        inputRomanList = [x for x in romanList if x.done > 0]
        for index, roman in enumerate(inputRomanList):
            if (roman.done <= 0):
                roman.parsed = False
                continue

            if (skipCount > 0):
                skipCount -= 1
                roman.parsed = True
                continue

            # done が 2 以上でn以外のとき
            if (roman.done >= 2 and roman.char != 'n'):
                # っを done の数-1入れる
                kana += 'っ' * (roman.done - 1)
                target = ""
                find = False

                if (roman.done == max(roman.allow)):
                    roman.parsed = True
                    # これの入力が完了してるなら次の文字があるならそれも含めて調査
                    if (index + 2 < len(inputRomanList)):
                        target = roman.char + inputRomanList[index + 1].char + inputRomanList[index + 2].char
                        for tmp in jsonData['two']:
                            for origin in tmp["origin"]:
                                if (target == origin and not find):
                                    kana += tmp["key"]
                                    skipCount = 2
                                    find = True
                        for tmp in jsonData['one']:
                            for origin in tmp["origin"]:
                                if (target == origin and not find):
                                    kana += tmp["key"]
                                    skipCount = 2
                                    find = True
                    if (index + 1 < len(inputRomanList)):
                        target = roman.char + inputRomanList[index + 1].char
                        for tmp in jsonData['two']:
                            for origin in tmp["origin"]:
                                if (target == origin and not find):
                                    kana += tmp["key"]
                                    skipCount = 1
                                    find = True
                        for tmp in jsonData['one']:
                            for origin in tmp["origin"]:
                                if (target == origin and not find):
                                    kana += tmp["key"]
                                    skipCount = 1
                                    find = True
                    if (find): 
                        roman.parsed = True
                        continue

            # allow が [1, 2] で doneが 1以上で n の時
            if (roman.done >= 1 and max(roman.allow) >= 2 and roman.char == 'n'):
                roman.parsed = True
                kana += 'ん'
                continue
            
            find = False
            # それ以外の時は3文字づつパース
            if (index + 2 < len(inputRomanList)):
                target = roman.char + inputRomanList[index + 1].char + inputRomanList[index + 2].char
                for tmp in jsonData['two']:
                    for origin in tmp["origin"]:
                        if (target == origin and not find):
                            kana += tmp["key"]
                            skipCount = 2
                            find = True
                for tmp in jsonData['one']:
                    for origin in tmp["origin"]:
                        if (target == origin and not find):
                            kana += tmp["key"]
                            skipCount = 2
                            find = True
            if (index + 1 < len(inputRomanList)):
                target = roman.char + inputRomanList[index + 1].char
                for tmp in jsonData['two']:
                    for origin in tmp["origin"]:
                        if (target == origin and not find):
                            kana += tmp["key"]
                            skipCount = 1
                            find = True
                for tmp in jsonData['one']:
                    for origin in tmp["origin"]:
                        if (target == origin and not find):
                            kana += tmp["key"]
                            skipCount = 1
                            find = True
            if (not find):
                target = roman.char
                for tmp in jsonData['one']:
                    for origin in tmp["origin"]:
                        if (target == origin and not find):
                            kana += tmp["key"]
                            find = True
            if (find): 
                roman.parsed = True
                continue
            
        return kana, romanList
                
    def checkRomanList (self, romanList: List[Roman]):
        for roman in romanList:
            # 許可された最大値を超えちゃってないか確認
            allow = max(roman.allow)
            if (allow < roman.done):
                raise ValueError('ParseError: 入力完了数が許可された最大値を超えています')
        return inputChkReturnObj.romanToKana(romanList)

    def checkComplete (romanList: List[Roman]):
        for roman in romanList:
            if (roman.done != max(roman.allow)):
                return False
        return True

    def __init__(self, romanList: List[Roman], acceptInput = False, isComplete = False):
        self.acceptInput = acceptInput
        self.romanList = romanList
        
        if (isComplete):
            self.isComplete = True
        else:
            self.isComplete = inputChkReturnObj.checkComplete(self.romanList)

class parser:
    def newInput (ans: str, romanList: List[Roman], newInput: str):
        # 新規入力した文字が1文字以外, 答えのテキストがない
        if (len(newInput) != 1 or len(ans) < 1):
            return inputChkReturnObj(romanList)

        # roman配列がなかったら空の配列を初期値にする
        if (not romanList or romanList == []):
            romanList = inputChkReturnObj.kanaToRoman(ans)

        skipN = False
        # 入力された文字がRoman配列の順番通りなら入力値のカウントを追加して返す
        for index, roman in enumerate(romanList):
            # 入力された回数が許可された回数よりも少ない場合
            if (max(roman.allow) > roman.done and roman.char == newInput):
                roman.done += 1
                # ソロ文字で許可された回数のマックスになる場合はallowを確定させる
                if (roman.done == max(roman.allow)):
                    roman.allow = [roman.done]
                if (skipN):
                    romanList[index - 1].allow = [1]
                    romanList[index - 1].parsed = True
                return inputChkReturnObj(romanList, True)
            if (roman.allow == [1, 2] and roman.done == 1): 
                skipN = True
                continue
            if (max(roman.allow) > roman.done): break

        # パースできてない最後の文字の入力数が1以上で,allowが2以上,n以外ならその時点で入力を拒否
        for roman in romanList:
            allow = max(roman.allow)
            if (roman.char != "n" and allow >= 2 and roman.done >= 1 and allow != roman.done):
                return inputChkReturnObj(romanList)
            if (max(roman.allow) > roman.done): break

        for index, roman in enumerate(romanList):
            # 直前の文字がちっちゃいっでそれの入力が完了してるときは次の文字はRoman配列じゃなかったら拒否
            if (index > 1 and romanList[index - 1].done >= 2 and romanList[index - 1].done == max(romanList[index - 1].allow) and romanList[index - 1].char != 'n'):
                if (roman.char == newInput and roman.done < max(roman.allow)):
                    romanList[index].done += 1
                    return inputChkReturnObj(romanList, True)
                else:
                    return inputChkReturnObj(romanList)

        # 入力済みのRoman配列から入力が完了しているところまでのひらがなを取得
        parsedText, parsedRomanList = inputChkReturnObj.romanToKana(romanList)
        if (not ans.startswith(parsedText)):
            return inputChkReturnObj(romanList)
            raise ValueError('ParseError: 答えのテキストがパースした文字列から始まっていません。パースに失敗しました。')

        print(parsedText)
        notParsedText = ans.replace(parsedText, "", 1)
        notParsedTarget = ""

        for roman in parsedRomanList:
            # パースできてない最初の要素がN以外の複数の場合はx, lでも置き換えができる
            if (not roman.parsed and max(roman.allow) >= 2 and roman.done == 0 and (newInput == "x" or newInput == 'l')):
                parsedRomanList = [item for item in parsedRomanList if item.done > 0 and item.parsed]
                for tmp in jsonData["one"]:
                    for origin in tmp["origin"]:
                        if (notParsedText[0] == tmp["key"] and str(origin).startswith(newInput)):
                            for ori in origin:
                                if (newInput == ori):
                                    parsedRomanList.append(Roman(ori, [1], 1))
                                else:
                                    parsedRomanList.append(Roman(ori, [1], 0))
                            addText = tmp["key"]
                            notParsedText = ans.replace(parsedText + addText, "", 1)
                            additionalList = inputChkReturnObj.kanaToRoman(notParsedText)
                            parsedRomanList.extend(additionalList)
                            return inputChkReturnObj(parsedRomanList, True)
    
        # パースが終わっていないひらがなで再度パースできるか試す
        notParsedRomanList = [item for item in parsedRomanList if not item.parsed]
        parsedRomanList = [item for item in parsedRomanList if item.done > 0 and item.parsed]
                
        for notParsed in notParsedRomanList:
            if (notParsed.done > 0):
                notParsedTarget += notParsed.char * notParsed.done
        notParsedTarget += newInput

        kana = ""
        find = False
        for tmp in jsonData['two']:
            for origin in tmp["origin"]:
                if (str(origin).startswith(notParsedTarget) and not find and notParsedText.startswith(tmp["key"])):
                    kana += tmp["key"]
                    find = True
                    inputed = False
                    for i in origin:
                        if (not inputed):
                            parsedRomanList.append(Roman(i, [1], 1))
                        if (newInput == i):
                            inputed = True
                            continue
                        if (inputed):
                            parsedRomanList.append(Roman(i, [1], 0))
        for tmp in jsonData['one']:
            for origin in tmp["origin"]:
                if (str(origin).startswith(notParsedTarget) and not find and notParsedText.startswith(tmp["key"])):
                    kana += tmp["key"]
                    find = True
                    inputed = False
                    for i in origin:
                        if (not inputed):
                            parsedRomanList.append(Roman(i, [1], 1))
                        if (newInput == i):
                            inputed = True
                            continue
                        if (inputed):
                            parsedRomanList.append(Roman(i, [1], 0))
        if (find):
            notParsedText = notParsedText.replace(kana, "", 1)
            additionalList = inputChkReturnObj.kanaToRoman(notParsedText)
            parsedRomanList.extend(additionalList)
            return inputChkReturnObj(parsedRomanList, True)
        else:
            return inputChkReturnObj(romanList, False)

def charInput():
    fd = sys.stdin.fileno()

    old = termios.tcgetattr(fd)
    new = termios.tcgetattr(fd)

    new[3] &= ~termios.ICANON
    new[3] &= ~termios.ECHO


    try:
        termios.tcsetattr(fd, termios.TCSANOW, new)
        ch = sys.stdin.read(1)

    finally:
        termios.tcsetattr(fd, termios.TCSANOW, old)

    return ch

with open ('./question.json', 'r') as f:
    questionData = json.load(f)

score = 0
miss = 0
for i in range(20):
    print()
print(str(endQuestionNumber) + "問のランダムな日本語が表示されます")
input("エンターで開始 >> ")

startTime = time.time()

while(True):
    acceptInput: bool
    isComplete: bool
    romanList: List[Roman]

    if (score >= endQuestionNumber):
        break

    ans = questionData[random.randint(0, len(questionData) - 1)]
    romans = []
    init_roman = inputChkReturnObj.kanaToRoman(ans["hiragana"])
    tmp_allowed = ""
    for tmp in init_roman:
        tmp_allowed += tmp.char * tmp.allow[0]
    print(ans["question"])
    print(ans["hiragana"])
    print(tmp_allowed)
    while(True):
        newInput = charInput()
        obj = parser.newInput(ans["hiragana"], romans, newInput)
        romans = obj.romanList
        isComplete = obj.isComplete
        print(ans["hiragana"])
        tmp_inputed = ""
        tmp_allowed = ""
        for tmp in romans:
            tmp_inputed += tmp.char * tmp.done
            tmp_allowed += tmp.char * tmp.allow[0]
            #print(tmp.char + ":" + str(tmp.allow) + ":" + str(tmp.done))
        for i in range(20):
            print()
        if (obj.acceptInput):
            print("Score: " + str(score))
            print()
            print(ans["question"])
            print(ans["hiragana"])
            print(tmp_allowed)
            print(tmp_inputed)
        else:
            miss += 1
            print("Not allow: " + newInput)
            print(ans["question"])
            print(ans["hiragana"])
            print(tmp_allowed)
            print(tmp_inputed)
        if (isComplete):
            for i in range(30):
                print()
            score += 1
            print("Complete: " + str(score))
            print()
            break

endTime = time.time()
diffTime = endTime - startTime

for i in range(20):
    print()

print('かかった時間　: ' + str(diffTime))
print('ミスタイプ　　: ' + str(miss))