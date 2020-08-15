const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.getElementById('message-1')


const getWeather = location => {
    fetch(`http://localhost:3000/weather?address=${location}`)
        .then(res => {
            res.json().then(data => {
                if (data.error) {
                    message1.textContent = data.error
                } else {
                    message1.innerHTML = `${data.address}<br>${data.forecast}`
                }
            })
        })
}

weatherForm.addEventListener('submit', e => {
    e.preventDefault()
    const location = search.value
    message1.textContent = 'Loading...'
    getWeather(location)
})