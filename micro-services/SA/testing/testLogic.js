const axios = require('axios')
const tests = {
    login: async(id) => {
        return new Promise(resolve => {
            axios.post('http://localhost:3000/api/videos/by-id/', {
                    id: id
                })
                .then(userData => {
                    if (userData) {
                        resolve(true)
                    }
                    resolve(false)
                }).catch(err => {
                    console.log('error in login', )
                    resolve('error')
                })
        })
    },
    text: (text) => {
        return new Promise(resolve => {
            axios.get('http://localhost:4000/api/text/' + text)
                .then(response => {
                    if (response.data) {
                        resolve({ result: true, data: response.data.children[0].data, raw: response.data })
                    }
                    resolve(false)
                }).catch(err => {
                    console.log('error in text', err.message)
                    resolve('error')
                })
        })
    }
}
module.exports = tests