const formData = document.querySelector('form')
const searchBox = document.querySelector('input')
const oneMsg = document.querySelector('#one')
const twoMsg = document.querySelector('#two')

formData.addEventListener('submit', (event) => {
    
    event.preventDefault();
    const location = searchBox.value;
    oneMsg.textContent = 'Loading...'
    twoMsg.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {

                oneMsg.textContent = data.error
                
            } else {

                oneMsg.textContent = data.location
                twoMsg.textContent = data.forecast

            }
        })
    })

})