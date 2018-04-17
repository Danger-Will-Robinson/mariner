const axios = require('axios')

module.exports = youtubeLogic = {


    replyToComment: (commentId, chanId, parentId, commentText, accessToken, refresh_token, keys) => {

        return new Promise(resolve => {
            const google = require('googleapis')
            const youTubeDataApi = google.google.youtube('v3')

            const OAuth2 = google.google.auth.OAuth2

            const oauth2Client = new OAuth2(keys.youTube.clientID, keys.youTube.clientSecret, [])

            // put the tokens in the header
            oauth2Client.setCredentials({
                refresh_token: refresh_token,
                access_token: accessToken
            });

            //default set to tokens are in header
            google.google.options({ auth: oauth2Client })

            //build youtube commentResource object for request body
            let params = {
                auth: oauth2Client,
                part: "snippet",
                resource: {
                    snippet: {
                        channelId: chanId,
                        topLevelComment: {
                            snippet: {
                                textOriginal: commentText
                            }
                        },
                        videoId: parentId,
                        commentId: commentId,
                    }
                }
            }
            youTubeDataApi.commentThreads.insert(params, (err, info) => {
                if (err) {
                    console.log('Failure posting comment. This is how you messed up:', err.message);
                    resolve("failed posting comment");
                } else {
                    console.log('comment posted', info.statusText);
                    resolve("posted comment");
                }
            });
        })
    },

    addComment: (chanId, parentId, commentText, accessToken, refresh_token, keys) => {

        return new Promise(resolve => {

            const oauth2Client = new OAuth2(keys.youTube.clientID, keys.youTube.clientSecret, [])

            // put the tokens in the header
            oauth2Client.setCredentials({
                refresh_token: refresh_token,
                access_token: accessToken
            });
            //default set to tokens are in header
            google.google.options({ auth: oauth2Client })

            //build youtube commentResource object for request body
            let params = {
                auth: oauth2Client,
                part: "snippet",
                resource: {
                    snippet: {
                        channelId: chanId,
                        videoId: parentId,
                        topLevelComment: {
                            snippet: {
                                textOriginal: commentText
                            }
                        }
                    }
                }
            }
            youTubeDataApi.commentThreads.insert(params, (err, info) => {
                if (err) {
                    console.log('Failure posting comment. This is how you messed up:', err.message);
                    resolve("failed posting comment");
                } else {
                    console.log('comment posted', info.statusText);
                    resolve("posted comment");
                }
            });
        })

    },
    getPlaylists: function(chanID, API_KEY, token) {
        console.log('plays runn, has token:', token)
        let params = {
            playlistId: chanID,
            maxResults: '50',
            part: 'snippet,contentDetails',
            key: API_KEY
        }
        if (token) {
            params.pageToken = token
        }
        return new Promise(resolve => {
            axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
                params: params
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
                youtubeLogic.videoHolder = youtubeLogic.videoHolder.concat(videoObjects)
                if (playlists.data.nextPageToken) {
                    console.log('Found another page of videos, current count:', youtubeLogic.videoHolder.length)
                    resolve(youtubeLogic.getPlaylists(chanID, API_KEY, playlists.data.nextPageToken))
                } else {
                    console.log('done getting all videos with', youtubeLogic.videoHolder.length)
                    resolve(youtubeLogic.videoHolder)
                }

            }).catch(err => {
                console.error('lists catch ran error', err.message)
                resolve(err)
            })

        })
    },
    videoHolder: [],

    getUploadedVideos: function(uploadsID, API_KEY, token) {
        console.log('getUploaded running')
        if (token) {
            console.log('inside of recursion')
        }
        return new Promise(resolve => {
            let params = {
                part: 'snippet,contentDetails',
                playlistId: uploadsID,

                maxResults: '50',
                key: API_KEY
            }
            if (token) {
                params.pageToken = token
            }

            axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
                params: params
            }).then(allVideos => {
                let formattedVideos = allVideos.data.items.map(youtubeLogic.formattVideos)
                console.log('foratted sample:', formattedVideos[0])
                youtubeLogic.videoHolder.concat(formattedVideos)
                console.log(allVideos, 'SDFDSDFSDSDFSDFSFDSFDs')
                if (allVideos.data.nextPageToken) {
                    resolve(youtubeLogic.getUploadedVideos(uploadsID, API_KEY, token))
                } else {
                    resolve(youtubeLogic.videoHolder)
                }
            }).catch(err => {
                console.log('catch in get uploaded', err.response.data)
                resolve(err)
            })
        })
    },

    formattVideos: (e) => {
        return {
            title: e.snippet.title,
            description: e.snippet.description,
            thumbnails: e.snippet.thumbnails,
            videoId: e.contentDetails.videoId,
            date: e.contentDetails.videoPublishedAt
        }
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
                .catch(err => console.log('error in get chan infoerr', err.message))
        })
    },
    gimmeVideos: async function(chanID, API_KEY) {
        let videos = await this.getUploadedVideos(chanID, API_KEY)
        console.log('all videos first', videos[0])
        if (videos)
            return videos
    },
    gimmeComments: async function(chanID, API_KEY) {
        let commentObjects = await this.getComments(chanID, API_KEY)
        return commentObjects
    },
    gimmePlaylist: async function(uploadsID, API_KEY) {
        let videoObjects = await this.getPlaylists(uploadsID, API_KEY)
        return videoObjects
    },
    gimmeAll: async function(userID) {
        let API_KEY = require('../config/keys').youTube.API_KEY
        let channelInfo = await this.getChannelInfo(userID, API_KEY)
        if (channelInfo.data.items.length) {
            let uploadsID = channelInfo.data.items[0].contentDetails.relatedPlaylists.uploads;
            let channelId = channelInfo.data.items[0].id
            let commentObjects = await this.getComments(channelId, API_KEY)
                // let videoObjects = await this.getUploadedVideos(uploadsID, API_KEY)
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
    commentHolder: [],

    getNextCommentPage: function(pageToken, channelID, API_KEY) {
        return new Promise(resolve => {
            axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
                    params: {
                        allThreadsRelatedToChannelId: channelID,
                        part: 'snippet,replies',
                        maxResults: '100',
                        pageToken: pageToken,
                        key: API_KEY
                    }
                })
                .then(allComments => {
                    console.log('holder now', youtubeLogic.commentHolder.length)

                    youtubeLogic.commentHolder = youtubeLogic.commentHolder.concat(allComments.data.items.map(this.commentFormatter))
                    if (allComments.data.nextPageToken) {
                        console.log('again!!')
                        youtubeLogic.getNextCommentPage(allComments.data.nextPageToken, channelID, API_KEY)
                    } else {
                        console.log('done')
                        resolve(youtubeLogic.commentHolder)
                    }
                }).catch(err => {
                    resolve([err.message])
                })
        })
    },
    getComments: async function(channelID, API_KEY, token) {

        return new Promise(resolve => {
            let commentHolder = []
            let params = {
                allThreadsRelatedToChannelId: channelID,
                part: 'snippet,replies',
                maxResults: '100',
                key: API_KEY
            }
            if (token) {
                params.pageToken = token
            }
            axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
                params: params
            }).then(async function(allComments) {

                if (allComments.data.nextPageToken) {

                    youtubeLogic.commentHolder = youtubeLogic.commentHolder.concat(allComments.data.items.map(youtubeLogic.commentFormatter))
                    console.log('found another page of comments, current count:', youtubeLogic.commentHolder.length)

                    resolve(youtubeLogic.getComments(channelID, API_KEY, allComments.data.nextPageToken))

                } else {
                    let formattedComments = allComments.data.items.map(youtubeLogic.commentFormatter)
                    console.log('finished gettting comments total:', formattedComments.length + youtubeLogic.commentHolder.length)
                    resolve(youtubeLogic.commentHolder.concat(formattedComments))

                }

            }).catch(err => {
                console.log('error here is', err.message)
                resolve(err.message)
            })
        })
    },
    commentFormatter: (e) => {
        return {
            commentId: e.snippet.topLevelComment.id,
            author: e.snippet.topLevelComment.snippet.authorDisplayName,
            authorThumbnail: e.snippet.topLevelComment.snippet.authorProfileImageUrl,
            videoId: e.snippet.topLevelComment.snippet.videoId,
            comment: e.snippet.topLevelComment.snippet.textDisplay,
            likeCount: e.snippet.topLevelComment.snippet.likeCount,
            publishedAt: e.snippet.topLevelComment.snippet.publishedAt
        }
    },
    getReplies: (commentId, API_KEY) => {
        //returns an array of replies to a comment by id
        return new Promise(resolve => {
            axios.get('https://www.googleapis.com/youtube/v3/comments', {
                    part: "snippet",
                    maxResults: 50,
                    parentId: commentId,
                    key: API_KEY
                })
                .then(comments => {
                    resolve(comments.data.items)
                }).catch(err => {
                    resolve(err.message)
                })

        })
    }
}