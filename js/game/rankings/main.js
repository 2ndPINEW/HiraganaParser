
(function() {
    fetchRankings()
})()

function fetchRankings () {
    const request = new XMLHttpRequest()

    request.open('GET', 'https://typing-ranking-server.herokuapp.com/ranking')
    request.setRequestHeader('accept', 'application/json')
    request.onload = (res) => {
        createRankingList(res.target.response)
    }
    request.send()
}

function createRankingList (json) {
    const data = JSON.parse(json)
    const rankings = data.ranking
    destroyRankingList()
    rankings.forEach((ranking, index) => {
        addRankingListItemElement(index + 1, ranking.handle_name, ranking.time)
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
    timeElement.innerHTML = time + '秒'

    rankingItemElement.appendChild(rankElement)
    rankingItemElement.appendChild(nameElement)
    rankingItemElement.appendChild(timeElement)

    rankingListElement.appendChild(rankingItemElement)
}
