const axios = require('axios')
const tests = {
    login: async(id) => {
        return new Promise(resolve => {
            axios.get('http://localhost:3000/api/videos/by-id/', {
                params: {
                    id: id
                }
            }).then(userData => {
                // console.log('HERE', allComments.data.items[0].snippet.topLevelComment)
                // var objs = userData.data.items.map(e => {
                //     return {
                //         result: e.videos.length === true,
                //     }
                // })
                resolve(true)
            }).catch(err => {
                console.log('error in login')
                resolve(false)
            })
        })
    }
}
module.exports = tests