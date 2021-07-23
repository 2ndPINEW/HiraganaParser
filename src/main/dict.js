/**
 * ローマ字変換用の辞書データだよー
 * new KeyMap()して関数叩いたらjsonData直接いじってローカルデータに保存する
 */
jsonData = {};

masterData = {
    "one": [
        {
            "key": "あ",
            "origin": ["a"]
        },
        {
            "key": "い",
            "origin": ["i", "yi"]
        },
        {
            "key": "う",
            "origin": ["u", "wu", "whu"]
        },
        {
            "key": "え",
            "origin": ["e"]
        },
        {
            "key": "お",
            "origin": ["o"]
        },
        {
            "key": "か",
            "origin": ["ka", "ca"]
        },
        {
            "key": "き",
            "origin": ["ki"]
        },
        {
            "key": "く",
            "origin": ["ku", "cu", "qu"]
        },
        {
            "key": "け",
            "origin": ["ke"]
        },
        {
            "key": "こ",
            "origin": ["ko", "co"]
        },
        {
            "key": "さ",
            "origin": ["sa"]
        },
        {
            "key": "し",
            "origin": ["si", "ci", "shi"]
        },
        {
            "key": "す",
            "origin": ["su"]
        },
        {
            "key": "せ",
            "origin": ["se", "ce"]
        },
        {
            "key": "そ",
            "origin": ["so"]
        },
        {
            "key": "た",
            "origin": ["ta"]
        },
        {
            "key": "ち",
            "origin": ["ti", "chi"]
        },
        {
            "key": "つ",
            "origin": ["tu", "tsu"]
        },
        {
            "key": "て",
            "origin": ["te"]
        },
        {
            "key": "と",
            "origin": ["to"]
        },
        {
            "key": "な",
            "origin": ["na"]
        },
        {
            "key": "に",
            "origin": ["ni"]
        },
        {
            "key": "ぬ",
            "origin": ["nu"]
        },
        {
            "key": "ね",
            "origin": ["ne"]
        },
        {
            "key": "の",
            "origin": ["no"]
        },
        {
            "key": "は",
            "origin": ["ha"]
        },
        {
            "key": "ひ",
            "origin": ["hi"]
        },
        {
            "key": "ふ",
            "origin": ["hu", "fu"]
        },
        {
            "key": "へ",
            "origin": ["he"]
        },
        {
            "key": "ほ",
            "origin": ["ho"]
        },
        {
            "key": "ま",
            "origin": ["ma"]
        },
        {
            "key": "み",
            "origin": ["mi"]
        },
        {
            "key": "む",
            "origin": ["mu"]
        },
        {
            "key": "め",
            "origin": ["me"]
        },
        {
            "key": "も",
            "origin": ["mo"]
        },
        {
            "key": "や",
            "origin": ["ya"]
        },
        {
            "key": "ゆ",
            "origin": ["yu"]
        },
        {
            "key": "よ",
            "origin": ["yo"]
        },
        {
            "key": "ら",
            "origin": ["ra"]
        },
        {
            "key": "り",
            "origin": ["ri"]
        },
        {
            "key": "る",
            "origin": ["ru"]
        },
        {
            "key": "れ",
            "origin": ["re"]
        },
        {
            "key": "ろ",
            "origin": ["ro"]
        },
        {
            "key": "わ",
            "origin": ["wa"]
        },
        {
            "key": "を",
            "origin": ["wo"]
        },
        {
            "key": "ん",
            "origin": ["nn", "n", "n'", 'xn']
        },
        {
            "key": "が",
            "origin": ["ga"]
        },
        {
            "key": "ぎ",
            "origin": ["gi"]
        },
        {
            "key": "ぐ",
            "origin": ["gu"]
        },
        {
            "key": "げ",
            "origin": ["ge"]
        },
        {
            "key": "ご",
            "origin": ["go"]
        },
        {
            "key": "ざ",
            "origin": ["za"]
        },
        {
            "key": "じ",
            "origin": ["zi", "ji"]
        },
        {
            "key": "ず",
            "origin": ["zu"]
        },
        {
            "key": "ぜ",
            "origin": ["ze"]
        },
        {
            "key": "ぞ",
            "origin": ["zo"]
        },
        {
            "key": "だ",
            "origin": ["da"]
        },
        {
            "key": "ぢ",
            "origin": ["di"]
        },
        {
            "key": "づ",
            "origin": ["du"]
        },
        {
            "key": "で",
            "origin": ["de"]
        },
        {
            "key": "ど",
            "origin": ["do"]
        },
        {
            "key": "ば",
            "origin": ["ba"]
        },
        {
            "key": "び",
            "origin": ["bi"]
        },
        {
            "key": "ぶ",
            "origin": ["bu"]
        },
        {
            "key": "べ",
            "origin": ["be"]
        },
        {
            "key": "ぼ",
            "origin": ["bo"]
        },
        {
            "key": "ぱ",
            "origin": ["pa"]
        },
        {
            "key": "ぴ",
            "origin": ["pi"]
        },
        {
            "key": "ぷ",
            "origin": ["pu"]
        },
        {
            "key": "ぺ",
            "origin": ["pe"]
        },
        {
            "key": "ぽ",
            "origin": ["po"]
        },
        {
            "key": "ぁ",
            "origin": ["la", "xa"]
        },
        {
            "key": "ぃ",
            "origin": ["li", "xi"]
        },
        {
            "key": "ぅ",
            "origin": ["lu", "xu"]
        },
        {
            "key": "ぇ",
            "origin": ["le", "xe"]
        },
        {
            "key": "ぉ",
            "origin": ["lo", "xo"]
        },
        {
            "key": "ゃ",
            "origin": ["lya", "xya"]
        },
        {
            "key": "ゅ",
            "origin": ["lyu", "xyu"]
        },
        {
            "key": "ょ",
            "origin": ["lyo", "xyo"]
        },
        {
            "key": "ヵ",
            "origin": ["lka", "xka"]
        },
        {
            "key": "ヶ",
            "origin": ["lke", "xke"]
        },
        {
            "key": "ゎ",
            "origin": ["lwa", "xwa"]
        },
        {
            "key": "っ",
            "origin": ["ltu", "xtu", "ltsu"]
        },
        {
            "key": "ゔ",
            "origin": ["vu"]
        },
        {
            "key": "ー",
            "origin": ["-"]
        },
        {
            "key": "？",
            "origin": ["?"]
        },
        {
            "key": "！",
            "origin": ["!"]
        },
        {
            "key": "、",
            "origin": [",", "、"]
        },
        {
            "key": "。",
            "origin": [".", "。"]
        }
    ],
    "two": [
        {
            "key": "うぁ",
            "origin": ["wha"]
        },
        {
            "key": "うぃ",
            "origin": ["whi", "wi"]
        },
        {
            "key": "うぇ",
            "origin": ["whe", "we"]
        },
        {
            "key": "うぉ",
            "origin": ["who"]
        },
        {
            "key": "うぉ",
            "origin": ["who"]
        },
        {
            "key": "いぇ",
            "origin": ["ye"]
        },
        {
            "key": "きゃ",
            "origin": ["kya"]
        },
        {
            "key": "きぃ",
            "origin": ["kyi"]
        },
        {
            "key": "きゅ",
            "origin": ["kyu"]
        },
        {
            "key": "きぇ",
            "origin": ["kye"]
        },
        {
            "key": "きょ",
            "origin": ["kyo"]
        },
        {
            "key": "くゃ",
            "origin": ["qya"]
        },
        {
            "key": "くゅ",
            "origin": ["qyu"]
        },
        {
            "key": "くょ",
            "origin": ["qyo"]
        },
        {
            "key": "くぁ",
            "origin": ["qwa", "qa", "kwa"]
        },
        {
            "key": "くぃ",
            "origin": ["qwi", "qi", "qyi"]
        },
        {
            "key": "くぅ",
            "origin": ["qwu"]
        },
        {
            "key": "くぇ",
            "origin": ["qwe", "qe", "qye"]
        },
        {
            "key": "くぉ",
            "origin": ["qwo", "qo"]
        },
        {
            "key": "ぐぁ",
            "origin": ["gwa"]
        },
        {
            "key": "ぐぃ",
            "origin": ["gwi"]
        },
        {
            "key": "ぐぅ",
            "origin": ["gwu"]
        },
        {
            "key": "ぐぇ",
            "origin": ["gwe"]
        },
        {
            "key": "くぉ",
            "origin": ["gwo"]
        },
        {
            "key": "しゃ",
            "origin": ["sya", "sha"]
        },
        {
            "key": "しぃ",
            "origin": ["syi"]
        },
        {
            "key": "しゅ",
            "origin": ["syu", "shu"]
        },
        {
            "key": "しぇ",
            "origin": ["sye", "she"]
        },
        {
            "key": "しょ",
            "origin": ["syo", "sho"]
        },
        {
            "key": "すぁ",
            "origin": ["swa"]
        },
        {
            "key": "すぃ",
            "origin": ["swi"]
        },
        {
            "key": "すぅ",
            "origin": ["swu"]
        },
        {
            "key": "すぇ",
            "origin": ["swe"]
        },
        {
            "key": "すぉ",
            "origin": ["swo"]
        },
        {
            "key": "ちゃ",
            "origin": ["tya", "cya", "cha"]
        },
        {
            "key": "ちぃ",
            "origin": ["tyi", "cyi"]
        },
        {
            "key": "ちゅ",
            "origin": ["tyu", "cyu", 'chu']
        },
        {
            "key": "ちぇ",
            "origin": ["tye", "cye", "che"]
        },
        {
            "key": "ちょ",
            "origin": ["tyo", "cyo", "cho"]
        },
        {
            "key": "つぁ",
            "origin": ["tsa"]
        },
        {
            "key": "つぃ",
            "origin": ["tsi"]
        },
        {
            "key": "つぇ",
            "origin": ["tse"]
        },
        {
            "key": "つぉ",
            "origin": ["tso"]
        },
        {
            "key": "てぁ",
            "origin": ["tha"]
        },
        {
            "key": "てぃ",
            "origin": ["thi"]
        },
        {
            "key": "てゅ",
            "origin": ["thu"]
        },
        {
            "key": "てぇ",
            "origin": ["the"]
        },
        {
            "key": "てょ",
            "origin": ["tho"]
        },
        {
            "key": "とぁ",
            "origin": ["twa"]
        },
        {
            "key": "とぃ",
            "origin": ["twi"]
        },
        {
            "key": "とぅ",
            "origin": ["twu"]
        },
        {
            "key": "とぇ",
            "origin": ["twe"]
        },
        {
            "key": "とぉ",
            "origin": ["two"]
        },
        {
            "key": "にゃ",
            "origin": ["nya"]
        },
        {
            "key": "にぃ",
            "origin": ["nyi"]
        },
        {
            "key": "にゅ",
            "origin": ["nyu"]
        },
        {
            "key": "にぇ",
            "origin": ["nyu"]
        },
        {
            "key": "にょ",
            "origin": ["nyu"]
        },
        {
            "key": "ひゃ",
            "origin": ["hya"]
        },
        {
            "key": "ひぃ",
            "origin": ["hyi"]
        },
        {
            "key": "ひゅ",
            "origin": ["hyu"]
        },
        {
            "key": "ひぇ",
            "origin": ["hye"]
        },
        {
            "key": "ひょ",
            "origin": ["hyo"]
        },
        {
            "key": "みゃ",
            "origin": ["mya"]
        },
        {
            "key": "みぃ",
            "origin": ["myi"]
        },
        {
            "key": "みゅ",
            "origin": ["myu"]
        },
        {
            "key": "みぇ",
            "origin": ["mye"]
        },
        {
            "key": "みょ",
            "origin": ["myo"]
        },
        {
            "key": "りゃ",
            "origin": ["rya"]
        },
        {
            "key": "りぃ",
            "origin": ["ryi"]
        },
        {
            "key": "りゅ",
            "origin": ["ryu"]
        },
        {
            "key": "りぇ",
            "origin": ["rye"]
        },
        {
            "key": "りょ",
            "origin": ["ryo"]
        },
        {
            "key": "ふぁ",
            "origin": ["fa", "fwa"]
        },
        {
            "key": "ふぃ",
            "origin": ["fi", "fwi", "fyi"]
        },
        {
            "key": "ふぅ",
            "origin": ["fwu"]
        },
        {
            "key": "ふぇ",
            "origin": ["fe", "fwe", "fye"]
        },
        {
            "key": "ふぉ",
            "origin": ["fo", "fwo"]
        },
        {
            "key": "ふゃ",
            "origin": ["fya"]
        },
        {
            "key": "ふゅ",
            "origin": ["fyu"]
        },
        {
            "key": "ふょ",
            "origin": ["fyo"]
        },
        {
            "key": "ぎゃ",
            "origin": ["gya"]
        },
        {
            "key": "ぎぃ",
            "origin": ["gyi"]
        },
        {
            "key": "ぎゅ",
            "origin": ["gyu"]
        },
        {
            "key": "ぎぇ",
            "origin": ["gye"]
        },
        {
            "key": "ぎょ",
            "origin": ["gyo"]
        },
        {
            "key": "じゃ",
            "origin": ["zya", "ja", "jya"]
        },
        {
            "key": "じぃ",
            "origin": ["zyi", "jyi"]
        },
        {
            "key": "じゅ",
            "origin": ["zyu", "ju", "jyu"]
        },
        {
            "key": "じぇ",
            "origin": ["zye", "je", "jye"]
        },
        {
            "key": "じょ",
            "origin": ["zyo", "jo", "jyo"]
        },
        {
            "key": "ぢゃ",
            "origin": ["dya"]
        },
        {
            "key": "ぢぃ",
            "origin": ["dyi"]
        },
        {
            "key": "ぢゅ",
            "origin": ["dyu"]
        },
        {
            "key": "ぢぇ",
            "origin": ["dye"]
        },
        {
            "key": "ぢょ",
            "origin": ["dyo"]
        },
        {
            "key": "びゃ",
            "origin": ["bya"]
        },
        {
            "key": "びぃ",
            "origin": ["byi"]
        },
        {
            "key": "びゅ",
            "origin": ["byu"]
        },
        {
            "key": "びぇ",
            "origin": ["bye"]
        },
        {
            "key": "びょ",
            "origin": ["byo"]
        },
        {
            "key": "ぴゃ",
            "origin": ["pya"]
        },
        {
            "key": "ぴぃ",
            "origin": ["pyi"]
        },
        {
            "key": "ぴゅ",
            "origin": ["pyu"]
        },
        {
            "key": "ぴぇ",
            "origin": ["pye"]
        },
        {
            "key": "ぴょ",
            "origin": ["pyo"]
        },
        {
            "key": "ゔぁ",
            "origin": ["va"]
        },
        {
            "key": "ゔぃ",
            "origin": ["vi", "vyi"]
        },
        {
            "key": "ゔぇ",
            "origin": ["ve", "vye"]
        },
        {
            "key": "ゔぉ",
            "origin": ["vo"]
        },
        {
            "key": "ゔゃ",
            "origin": ["vya"]
        },
        {
            "key": "ゔゅ",
            "origin": ["vyu"]
        },
        {
            "key": "ゔょ",
            "origin": ["vyo"]
        },
        {
            "key": "でゃ",
            "origin": ["dha"]
        },
        {
            "key": "でぃ",
            "origin": ["dhi"]
        },
        {
            "key": "でゅ",
            "origin": ["dhu"]
        },
        {
            "key": "でぇ",
            "origin": ["dhe"]
        },
        {
            "key": "でょ",
            "origin": ["dho"]
        },
        {
            "key": "どぁ",
            "origin": ["dwa"]
        },
        {
            "key": "どぃ",
            "origin": ["dwi"]
        },
        {
            "key": "どぅ",
            "origin": ["dwu"]
        },
        {
            "key": "どぇ",
            "origin": ["dwe"]
        },
        {
            "key": "どぉ",
            "origin": ["dwo"]
        },
    ]
};

(function() {
    /**
     * ローカルストレージにキーマップが保存されていたらそこから復元
     * 保存されていないならマスターのデータを突っ込む
     */
    let tmp = localStorage.getItem('keymap')
    
    if (tmp) {
        try {
            jsonData = JSON.parse(tmp)
        } catch (error) {
            window.console.error('load default keymap')
            window.console.error(error)
            jsonData = { ...masterData }
        }
    } else {
        jsonData = { ...masterData }
    }
})()

/**
 * jsonData直接いじるわw
 * ごめん
 */
class KeyMap {
    /**
     * キーマップを追加する、同じoriginがあった場合は削除する
     * @param {*} key 
     * @param {*} origin 
     */
    addKeyMap (targetKey, targetOrigin) {
        this.deleteAllKeyMap(targetOrigin)

        let tmpJsonData = {
            "one": [],
            "two": []
        }

        jsonData.one.forEach(dict => {
            let tmpDict = {
                key: dict.key,
                origin: dict.origin
            }

            if (dict.key == targetKey) {
                tmpDict.origin.push(targetOrigin)
                tmpJsonData.one.push(tmpDict)
            } else {
                tmpJsonData.one.push(dict)
            }
        });

        jsonData.two.forEach(dict => {
            let tmpDict = {
                key: dict.key,
                origin: dict.origin
            }

            if (dict.key == targetKey) {
                tmpDict.origin.push(targetOrigin)
                tmpJsonData.two.push(tmpDict)
            } else {
                tmpJsonData.two.push(dict)
            }
        });

        this.saveKeyMap(tmpJsonData)
    }

    /**
     * keyとoriginが一致したものをキーマップから削除する
     * @param {*} targetKey 
     * @param {*} targetOrigin 
     */
    deleteKeyMap (targetKey, targetOrigin) {
        let tmpJsonData = {
            "one": [],
            "two": []
        }

        jsonData.one.forEach(dict => {
            if (dict.key == targetKey) {
                tmpJsonData.one.push(this.getRemoveOriginObject(dict, targetOrigin))
            } else {
                tmpJsonData.one.push(dict)
            }
        });

        jsonData.two.forEach(dict => {
            if (dict.key == targetKey) {
                tmpJsonData.two.push(this.getRemoveOriginObject(dict, targetOrigin))
            } else {
                tmpJsonData.two.push(dict)
            }
        });

        this.saveKeyMap(tmpJsonData)
    }

    /**
     * Originが一致するキーマップを全部消す
     * @param {*} targetOrigin 
     */
    deleteAllKeyMap (targetOrigin) {
        let tmpJsonData = {
            "one": [],
            "two": []
        }

        jsonData.one.forEach(dict => {
            tmpJsonData.one.push(this.getRemoveOriginObject(dict, targetOrigin))
        });

        jsonData.two.forEach(dict => {
            tmpJsonData.two.push(this.getRemoveOriginObject(dict, targetOrigin))
        });

        this.saveKeyMap(tmpJsonData)
    }

    getRemoveOriginObject (dict, targetOrigin) {
        let tmpDict = {
            key: dict.key,
            origin: []
        }
        dict.origin.forEach(origin => {
            if (origin !== targetOrigin) {
                tmpDict.origin.push(origin)
            }
        })
        return tmpDict
    }

    reset () {
        jsonData = masterData
        localStorage.removeItem('keymap')
    }

    saveKeyMap = (data) => {
        jsonData = { ...data }
        localStorage.setItem('keymap', JSON.stringify(jsonData))
    }
}