var axios = require('axios')
var chanID = 'UCCooOt2LDAfz-5giM99biUQ'
var API_KEY = 'AIzaSyBWQ8TlTFX-NlJf-KELSfbtk_4ebMj1_3A'

module.exports = youtubeLogic = {
    getPlaylists: function(chanID, API_KEY) {

        return new Promise(resolve => {
            axios.get('https://www.googleapis.com/youtube/v3/playlists', {
                params: {
                    channelId: chanID,
                    maxResults: '25',
                    part: 'snippet, contentDetails',
                    key: API_KEY
                }
            }).then(playlists => {
                resolve(playlists.data)
            }).catch(err => {
                resolve(err)
            })

        })
    },

    getVideos: function(playlists, API_KEY) {
        let uploadsIdFind = playlists.items.find(e => e.snippet.title === 'uploads')
        let uploadsId = uploadsIdFind.id
        return new Promise(resolve => {
            axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
                params: {
                    playlistId: uploadsId,
                    part: 'snippet, contentDetails',
                    maxResults: '50',
                    key: API_KEY
                }
            }).then(allVideos => {
                resolve(allVideos)
            }).catch(err => {
                resolve(err)
            })
        })
    },
    runner: async function() {
        let list = await this.getPlaylists(chanID, API_KEY);
        let videos = await this.getVideos(list, API_KEY);

        return videos
    }
}