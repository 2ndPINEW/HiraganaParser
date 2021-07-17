let time

(function() {
    time = 99999
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

    postData('https://typing-server-6gsgaxcc3q-uc.a.run.app/post_score', data)
        .then(data => {
            const uploadingBtn = document.querySelector('.uploading')
            uploadingBtn.style.display = 'none'

            const completeBtn = document.querySelector('.complete')
            completeBtn.style.display = 'block'
        })
        .catch(e => {
            const uploadingBtn = document.querySelector('.uploading')
            uploadingBtn.style.display = 'none'

            const completeBtn = document.querySelector('.error')
            completeBtn.style.display = 'block'
        })

}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }
