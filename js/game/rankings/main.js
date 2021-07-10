
const DEFAULT_RANKING = 'ranking_timeattack'
let selectedRanking

(function() {
    onSelectRanking(DEFAULT_RANKING)
    addKeyEventListener()
})()

function onSelectRanking (name) {
    if (selectedRanking == name) return

    selectedRanking = name

    const selectors = document.querySelectorAll('.selector_content')
    selectors.forEach(selector => {
        selector.classList.remove('selected')
    })

    const element = document.querySelector('.' + selectedRanking)
    element.classList.add('selected')

    fetchRankings(selectedRanking)
}

function fetchRankings (name) {

    destroyRankingList()

    // レート機能は準備中だよー
    if (name == 'ranking_rate') {
        addRankingListItemElement('- ' , 'じゅんびちゅう', '')
        return
    }

    addRankingListItemElement('- ' , 'よみこみちゅう', '')

    const request = new XMLHttpRequest()

    request.open('GET', 'https://typing-ranking-server.herokuapp.com/ranking')
    request.setRequestHeader('accept', 'application/json')
    request.onload = (res) => {
        // fetch中に別のランキングが選択されたら反映しない
        if (name != selectedRanking) return
        createRankingList(res.target.response, '秒')
    }

    request.onerror = (res) => {
        // fetch中に別のランキングが選択されたら反映しない
        if (name != selectedRanking) return
        destroyRankingList()
        addRankingListItemElement('- ' , 'えらー', '')
    }

    request.send()
}

function createRankingList (json, unit) {
    const data = JSON.parse(json)
    const rankings = data.ranking
    destroyRankingList()
    rankings.forEach((ranking, index) => {
        addRankingListItemElement(index + 1, ranking.handle_name, ranking.time + unit)
    })
}

function destroyRankingList () {
    const items = document.querySelectorAll('.ranking_item')
    items.forEach(element => {
        element.remove()
    })
}

function addRankingListItemElement (rank, name, time) {
    const rankingListElement = document.querySelector('.ranking_list')

    const rankingItemElement = document.createElement('div')
    rankingItemElement.className = 'ranking_item'

    const rankElement = document.createElement('div')
    rankElement.className = 'ranking_item_rank'
    rankElement.innerHTML = rank + '位'

    const nameElement = document.createElement('div')
    nameElement.className = 'ranking_item_name'
    nameElement.innerHTML = name

    const timeElement = document.createElement('div')
    timeElement.className = 'ranking_item_time'
    timeElement.innerHTML = time

    rankingItemElement.appendChild(rankElement)
    rankingItemElement.appendChild(nameElement)
    rankingItemElement.appendChild(timeElement)

    rankingListElement.appendChild(rankingItemElement)
}

function addKeyEventListener () {
    document.body.addEventListener('keydown',
    event => {
        switch (event.key) {
            case 'Escape':
                event.preventDefault()
                location.href = '../'
                break
            case 't':
                onSelectRanking('ranking_timeattack')
                break
            case 'r':
                onSelectRanking('ranking_rate')
                break
        }
    });
}