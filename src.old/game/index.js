
(function() {
    addKeyEventListener()
})()

function addKeyEventListener () {
    document.body.addEventListener('keydown',
    event => {
        switch (event.key) {
            case 'r':
                event.preventDefault()
                location.href = './rankings/'
                break
            case 't':
                event.preventDefault()
                location.href = './timeattack/'
                break
            case 's':
                event.preventDefault()
                location.href = './settings/keymap'
                break
        }
    });
}