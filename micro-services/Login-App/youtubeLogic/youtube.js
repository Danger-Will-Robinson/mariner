var axios = require('axios')

module.exports = youtubeLogic = {
        getPlaylists: function(chanID, API_KEY) {

            return new Promise(resolve => {
                axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
                    params: {
                        playlistId: chanID,
                        maxResults: '50',
                        part: 'snippet,contentDetails',
                        key: API_KEY
                    }
                }).then(playlists => {
                    let videoObjects = playlists.data.items.map(e => {
                        return {
                            channelId: e.snippet.channelId,
                            videoId: e.contentDetails.videoId,
                            title: e.snippet.title,
                            description: e.snippet.description,
                            thumbnails: e.snippet.thumbnails
                        }
                    })
                    resolve(playlists.data.items)
                }).catch(err => {
                    console.log('lists catch ran error')
                    resolve(err)
                })

            })
        },

        getUploadedVideos: function(uploadsID, API_KEY) {


            return new Promise(resolve => {
                axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
                    params: {
                        playlistId: uploadsID,
                        part: 'snippet,contentDetails',
                        maxResults: '50',
                        key: API_KEY
                    }
                }).then(allVideos => {
                    let formattedVideos = allVideos.data.items.map(e => {
                        return {
                            title: e.snippet.title,
                            description: e.snippet.description,
                            thumbnails: e.snippet.thumbnails,
                            videoId: e.contentDetails.videoId,
                            date: e.contentDetails.videoPublishedAt
                        }
                    })
                    resolve(formattedVideos)
                }).catch(err => {
                    console.log('catch in get uploaded')
                    resolve(err)
                })
            })
        },
        getChannelInfo: function(id, API_KEY) {

            return new Promise(resolve => {
                axios.get('https://www.googleapis.com/youtube/v3/channels', {
                        params: {
                            id: id,
                            part: 'snippet,contentDetails,statistics',
                            maxResults: '50',
                            key: API_KEY
                        }
                    })
                    .then(deets => resolve(deets))
                    .catch(err => console.log('error in get chan infoerr'))
            })
        },
        gimmeVideos: async function(chanID, API_KEY) {
            let videos = await this.getUploadedVideos(chanID, API_KEY)
            return videos
        },
        gimmeComments: async function(chanID, API_KEY) {
            let commentObjects = await this.getComments(chanID, API_KEY)
            return videos
        },
        gimmePlaylist: async function(uploadsID, API_KEY) {
            let videoObjects = await this.getPlaylists(uploadsID, API_KEY)
            return videoObjects
        },
        gimmeAll: async function(userID, API_KEY) {
            let channelInfo = await this.getChannelInfo(userID, API_KEY)
            console.log('info is', channelInfo.data)
            if (channelInfo.data.items.length) {
                let uploadsID = channelInfo.data.items[0].contentDetails.relatedPlaylists.uploads;
                let channelId = channelInfo.data.items[0].id
                let commentObjects = await this.getComments(channelId, API_KEY)
                let videoObjects = await this.getPlaylists(uploadsID, API_KEY)

                let responseObject = {
                    videos: videoObjects,
                    comments: commentObjects
                }
                return responseObject
            } else {
                return {
                    videos: [],
                    comments: []
                }
            }
        },
        getComments: function(channelID, API_KEY) {

            return new Promise(resolve => {
                axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
                    params: {
                        allThreadsRelatedToChannelId: channelID,
                        part: 'snippet,replies',
                        key: API_KEY
                    }
                }).then(allComments => {
                    // console.log('HERE', allComments.data.items[0].snippet.topLevelComment)
                    var objs = allComments.data.items.map(e => {
                        return {
                            commentId: e.snippet.topLevelComment.id,
                            author: e.snippet.topLevelComment.snippet.authorDisplayName,
                            authorThumbnail: e.snippet.topLevelComment.snippet.authorProfileImageUrl,
                            videoId: e.snippet.topLevelComment.snippet.videoId,
                            comment: e.snippet.topLevelComment.snippet.textDisplay,
                            likeCount: e.snippet.topLevelComment.snippet.likeCount,
                            publishedAt: e.snippet.topLevelComment.snippet.publishedAt
                        }
                    })
                    resolve(objs)
                }).catch(err => {
                    console.log('error in comments')
                    resolve('error')
                })
            })
        }
    }
    // youtubeLogic.runner('ph8tel')