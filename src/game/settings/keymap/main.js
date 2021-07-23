
config = {};

uiLayout = {
    "one": [
        "あ",
        "い",
        "う",
        "え",
        "お",

        "か",
        "き",
        "く",
        "け",
        "こ",

        "さ",
        "し",
        "す",
        "せ",
        "そ",

        "た",
        "ち",
        "つ",
        "て",
        "と",

        "な",
        "に",
        "ぬ",
        "ね",
        "の",

        "は",
        "ひ",
        "ふ",
        "へ",
        "ほ",

        "ま",
        "み",
        "む",
        "め",
        "も",

        "や",
        "",
        "ゆ",
        "",
        "よ",

        "ら",
        "り",
        "る",
        "れ",
        "ろ",

        "わ",
        "",
        "を",
        "",
        "ん",

        "が",
        "ぎ",
        "ぐ",
        "げ",
        "ご",

        "ざ",
        "じ",
        "ず",
        "ぜ",
        "ぞ",

        "だ",
        "ぢ",
        "づ",
        "で",
        "ど",

        "ば",
        "び",
        "ぶ",
        "べ",
        "ぼ",

        "ぱ",
        "ぴ",
        "ぷ",
        "ぺ",
        "ぽ",

        "ぁ",
        "ぃ",
        "ぅ",
        "ぇ",
        "ぉ",

        "ゃ",
        "",
        "ゅ",
        "",
        "ょ",

        "ヵ",
        "",
        "",
        "ヶ",
        "",

        "ゎ",
        "っ",
        "",
        "",
        "",

        "ー",
        "？",
        "！",
        "、",
        "。"
    ],
    "two": [
        "うぁ",
        "うぃ",
        "",
        "うぇ",
        "うぉ",

        "",
        "いぇ",
        "",
        "",
        "",
        
        "きゃ",
        "きぃ",
        "きゅ",
        "きぇ",
        "きょ",

        "くゃ",
        "",
        "くゅ",
        "",
        "くょ",

        "くぁ",
        "くぃ",
        "くぅ",
        "くぇ",
        "くぉ",

        "ぐぁ",
        "ぐぃ",
        "ぐぅ",
        "ぐぇ",
        "ぐぉ",

        "しゃ",
        "しぃ",
        "しゅ",
        "しぇ",
        "しょ",

        "すぁ",
        "すぇ",
        "すぅ",
        "すぇ",
        "すぉ",

        "ちゃ",
        "ちぃ",
        "ちゅ",
        "ちぇ",
        "ちょ",

        "つぁ",
        "つぃ",
        "",
        "つぇ",
        "つぉ",

        "てぁ",
        "てぃ",
        "てゅ",
        "てぇ",
        "てょ",

        "とぁ",
        "とぃ",
        "とぅ",
        "とぇ",
        "とぉ",

        "にゃ",
        "にぃ",
        "にゅ",
        "にぇ",
        "にょ",

        "ひゃ",
        "ひぃ",
        "ひゅ",
        "ひぇ",
        "ひょ",

        "みゃ",
        "みぃ",
        "みゅ",
        "みぇ",
        "みょ",

        "りゃ",
        "りぃ",
        "りゅ",
        "りぇ",
        "りょ",

        "ふぁ",
        "ふぃ",
        "ふぅ",
        "ふぇ",
        "ふぉ",

        "ふゃ",
        "",
        "ふゅ",
        "",
        "ふょ",

        "ぎゃ",
        "ぎぃ",
        "ぎゅ",
        "ぎぇ",
        "ぎょ",

        "じゃ",
        "じぃ",
        "じゅ",
        "じぇ",
        "じょ",

        "ぢゃ",
        "ぢぃ",
        "ぢゅ",
        "ぢぇ",
        "ぢょ",

        "びゃ",
        "びぃ",
        "びゅ",
        "びぇ",
        "びょ",

        "ぴゃ",
        "ぴぃ",
        "ぴゅ",
        "ぴぇ",
        "ぴょ",

        "ゔぁ",
        "ゔぃ",
        "ゔ",
        "ゔぇ",
        "ゔぉ",

        "ゔゃ",
        "",
        "ゔゅ",
        "",
        "ゔょ",

        "でゃ",
        "でぃ",
        "でゅ",
        "でぇ",
        "でょ",

        "どぁ",
        "どぃ",
        "どぅ",
        "どぇ",
        "どぉ"
    ]
};

(function() {
    window.console.log('キーマップ変更のUIいい感じにならないかなー')

    config = new KeyMap()

    createTable()
})()

function destroyTable () {
    const tableArea = document.querySelector('.keymap_table_area')
    tableArea.innerHTML = ''
}

function createTable () {
    destroyTable()
    const tableArea = document.querySelector('.keymap_table_area')

    const tmpOne = sliceByNumber(uiLayout.one, 5)
    tmpOne.forEach(keys => {
        const rowTitle = createRowTitle(keys)
        tableArea.appendChild(rowTitle)

        const row = createRow(keys)
        tableArea.appendChild(row)
    });

    const tmpTwo = sliceByNumber(uiLayout.two, 5)
    tmpTwo.forEach(keys => {
        const rowTitle = createRowTitle(keys)
        tableArea.appendChild(rowTitle)

        const row = createRow(keys)
        tableArea.appendChild(row)
    });
}

function createRowTitle (keys) {
    const keyRowTitleElement = document.createElement('div')
    keyRowTitleElement.className = 'key_row_title'

    keys.forEach(key => {
        const rowElement = document.createElement('div')
        rowElement.innerHTML = key
        rowElement.className = 'row_title'
        rowElement.onclick = select

        keyRowTitleElement.appendChild(rowElement)
    })

    return keyRowTitleElement
}

function createRow (keys) {
    const keyRowElement = document.createElement('div')
    keyRowElement.className = 'key_row'
    
    keys.forEach(key => {
        let origins = ''

        jsonData.one.forEach(map => {
            if (map.key == key) {
                origins = map.origin.join('<br>')
            }
        })

        jsonData.two.forEach(map => {
            if (map.key == key) {
                origins = map.origin.join('<br>')
            }
        })

        const rowElement = document.createElement('div')
        rowElement.innerHTML = origins
        rowElement.className = 'row'

        keyRowElement.appendChild(rowElement)
    })

    return keyRowElement
}

function sliceByNumber (array, number) {
    const length = Math.ceil(array.length / number)
    return new Array(length).fill().map((_, i) =>
        array.slice(i * number, (i + 1) * number)
    )
}

function keyAdd () {
    const targetKey = document.querySelector('.keymap_target').value
    const targetOrigin = document.querySelector('.keymap_origin').value

    if (!targetKey || !targetOrigin) return

    config.addKeyMap(targetKey, targetOrigin)
    createTable()
}

function keyDelete () {
    const targetKey = document.querySelector('.keymap_target').value
    const targetOrigin = document.querySelector('.keymap_origin').value

    if (!targetKey || !targetOrigin) return

    config.deleteKeyMap(targetKey, targetOrigin)
    createTable()
}

function select (ev) {
    const targetKey = document.querySelector('.keymap_target')
    const targetOrigin = document.querySelector('.keymap_origin')

    targetKey.value = ev.toElement.innerHTML
    targetOrigin.value = ''
}

function reset () {
    config.reset()
    createTable()
}

function returnToHome () {
    location.href = '../../'
}