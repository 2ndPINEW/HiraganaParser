let time

(function() {
    time = 9999999999999999999999999999999999999999999
    target = location.href.replace('upload.html', '')

    nickName = localStorage.getItem('nick_name')
    if (nickName) {
        const nameBox = document.querySelector('.ranking_uploader_input')
        nameBox.value = nickName
    }

    const uploadingBtn = document.querySelector('.uploading')
    uploadingBtn.style.display = 'none'

    const completeBtn = document.querySelector('.complete')
    completeBtn.style.display = 'none'

    const errorBtn = document.querySelector('.error')
    errorBtn.style.display = 'none'

    if (document.referrer == target) {
        time = localStorage.getItem('time')
    }

})()

function upload () {
    const nameBox = document.querySelector('.ranking_uploader_input')
    const nickName = nameBox.value

    if (!nickName) return

    localStorage.setItem('nick_name', nickName)

    const uploadingBtn = document.querySelector('.uploading')
    uploadingBtn.style.display = 'block'

    const rankingUploaderInput = document.querySelector('.ranking_uploader_input')
    rankingUploaderInput.style.display = 'none'

    const rankingUploaderButton = document.querySelector('.ranking_uploader_button')
    rankingUploaderButton.style.display = 'none'

    data = new Object()
    data.handle_name = nickName
    data.time = time

    json = JSON.stringify(data)

    const request = new XMLHttpRequest()

    request.open('POST', 'https://typing-ranking-server.herokuapp.com/post_score')
    request.setRequestHeader('Content-Type', 'applicaton/json')

    request.onload = () => {
        const uploadingBtn = document.querySelector('.uploading')
        uploadingBtn.style.display = 'none'

        const completeBtn = document.querySelector('.complete')
        completeBtn.style.display = 'block'
    }

    request.onerror = () => {
        const uploadingBtn = document.querySelector('.uploading')
        uploadingBtn.style.display = 'none'

        const completeBtn = document.querySelector('.error')
        completeBtn.style.display = 'block'
    }

    request.send(json)
}
