var axios = require('axios')
var chanID = 'UCCooOt2LDAfz-5giM99biUQ'
var API_KEY = 'AIzaSyBWQ8TlTFX-NlJf-KELSfbtk_4ebMj1_3A'

// 🔥 Node 7.6 has async/await! Here is a quick run down on how async/await works


async function go() {
    try {
        const playlistsPromise = axios.get('https://www.googleapis.com/youtube/v3/playlists', {
            params: {
                channelId: chanID,
                maxResults: '25',
                part: 'snippet, contentDetails',
                key: API_KEY
            }
        });

        // const [word, user, name] = await Promise.all([wordPromise, userPromise, namePromise]);

        const playlists = await Promise.all(['playlistsPromise'])
            // const uploads = playlists.find(e => e.snippet.title === 'uploads')

        // const allVideos = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        //     params: {
        //         playlistId: uploads.id,
        //         part: 'snippet, contentDetails',
        //         maxResults: '50',
        //         key: API_KEY
        //     }
        // });
        console.log('all videos', playlists)
            // // many requests should be concurrent - don't slow things down!
            // // fire off three requests and save their promises
            // const wordPromise = axios('http://www.setgetgo.com/randomword/get.php');
            // const userPromise = axios('https://randomuser.me/api/');
            // const namePromise = axios('https://uinames.com/api/');
            // // await all three promises to come back and destructure the result into their own variables
            // const [word, user, name] = await Promise.all([wordPromise, userPromise, namePromise]);
            // console.log(word.data, user.data, name.data); // cool, {...}, {....}
    } catch (e) {
        console.error(e); // 💩
    }
}

go(); // console.log('at the end', getVideos(), 'end of playlist values')