import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Videos from './components/Videos/Videos.jsx';
import Comments from './components/Comments/Comments.jsx';
import Login from './containers/LogIn/Login.jsx';
import Main from './containers/Main/Main.jsx';
import Spinner from './UI/Spinner/Spinner.jsx';


import NoContentError from './components/NoContentError/NoContentError.jsx';
import TestChart from './components/TestChart/testChart.jsx';
import queue from 'queue'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      user: '',
      userVideos:[],
      currentVideo:[],
      loading: true,
      videoComments: [],
      originalSentiments: [],
      currentTitle: '',
      commentDescription: 'Recent Comments',
      showGraph: false,
      showReplyAllModal: false,
      showModal: false,
      loadedComment: null,
      replyText: null,
      replyAll: []
    }
    console.log('this.state looks like ', this.state);
    this.changeView = this.changeView.bind(this);
  }
  
  

  componentWillMount() {

  }

  async componentDidMount() {

    // Check to see if a user is established
    // While checking, display loading component    
    let { data: {name, id} } = await axios.get('http://localhost:5000/getUser');
    if (name !== undefined || id !== undefined) {
      // Print data:
      console.log(`Username: ${name} // ID: ${id}`);
      // Get data from CR:

      // Get Videos:
      const userVideos = await axios.post('http://localhost:5001/appQuery', {
        query: `SELECT * FROM videos where user in (select idusers from users where username = '${name}')`
      });

      // Get Comments:
      const videoComments = await axios.post('http://localhost:5001/appQuery', {
        query: `SELECT * FROM comments where video in (select idvideos from videos where title = '${userVideos.data[0].title || userVideos}')`
      });
      // Fill state with content, set view to 'main', loading false.   
      // If a user comes back and there is no content, dispaly no content page.
         
      this.setState({
        user: name,
        userVideos: userVideos.data,
        currentVideo: userVideos.data[0],
        videoComments: videoComments.data,
        loading: false,
        view: userVideos.length === 0 ? 'no-content' : 'main'
      });

    } else {
      this.setState({
        loading: false,
        view: 'login'
      })
    }
    // if (this.state.view === 'login') {
    //   const currentUser = await axios.get('http://localhost:5000/getUser');
    //   let currentUserName = currentUser.data.name
    //   console.log('currentUser is ', currentUser)
    //   console.log('currentUserName is ', currentUserName)
    //   // const userVideos = await axios.post('http://localhost:5001/appQuery', {
    //   //   query: `SELECT * FROM videos where user in (select idusers from users where username = '${currentUser.data}')`
    //   // });
    //   //added by joe
    //   console.log('checking for ', currentUser.data.id)
    //   currentUser.data = await  axios.get('http://localhost:3000/api/all-data/by-id',  {
    //     params: {
    //       id: currentUser.data.id
    //     }
    //   })

    //   const userVideos = await axios.post('http://localhost:5001/appQuery', {
    //     query: `SELECT * FROM videos where user in (select idusers from users where username = '${currentUserName}')`
    //   });

    //   console.log('userVideos in componentDidMount ', userVideos)
    //   console.log('userVideos is here title is ', userVideos.data[0].title)
    //   const videoComments = await axios.post('http://localhost:5001/appQuery', {
    //     query: `SELECT * FROM comments where video in (select idvideos from videos where title = '${userVideos.data[0].title || userVideos}')`
    //   });
    //   console.log('videoComments is in here is ', videoComments)
      
    //   console.log(currentUser.data.data[0].videos[0], 'hedsdij')
    //   this.setState({
    //     user: currentUser.data.data[0].name,
    //     userVideos:   userVideos.data,
    //     currentVideo:  userVideos.data[0],
    //     videoComments: videoComments.data
    //   });
      

    // }

    // if (this.state.user !== '' && this.state.userVideos !== [] && this.state.videoComments !== []) {
    //   this.setState({
    //     view: 'main'
    //   });
    // } else if (this.state.userVideos.length === 0 && this.state.user !== '') {
    //   this.setState({
    //     view: 'no-content'
    //   })
    // }
    console.log('state after componentDidMount ', this.state)
  }




  async analyzeComments(comments) {
    let sentComments = []
    sentComments = await axios.post('http://localhost:5001/analyze/comments', {
      comments: this.state.videoComments
    })
    console.log('analyzedComments is ', sentComments);
    this.setState({
      videoComments: sentComments.data,
      showGraph: true
    })
  }
  
  countAnalyzed(comments) {
    const scoreConversion = {
      '-5': 'Hostile',
      '-4': 'Mean',
      '-3': 'Negative',
      '-2': 'Shade',
      '-1': 'Nuetral',
       '0': 'Nuetral',
       '1': 'Nuetral',
       '2': 'Warm',
       '3': 'Positive',
       '4': 'Praise',
       '5': 'Glowing',
    }

    let storage = {};
    let data = [];
    comments.forEach((comment) => {
      let score = scoreConversion[comment.SA];
      comment.SA = score;
      if (storage[score] === undefined) {
        storage[score] = 1
      } else {
        storage[score]++
      }
    })
    for (var key in storage) {
      data.push({
        'uv': storage[key],
        'Score!': key
      })
    }
    console.log('data in countAnalyzed is ', data);
    return data;
  }

  filterSentiments(sentiment) {
    let collection = [];
    this.state.videoComments.forEach((comment) => {
      if (comment.SA === sentiment) {
        collection.push(comment);        
      }
      this.setState({
        videoComments: collection,
        showGraph:false
      })
    })
    console.log('this was clicked ', sentiment)
  }


  renderQuestions(comments) {
    console.log('render Q clicked')
    let collection = [];
    console.log('videoComments before ', this.state.videoComments)
    this.state.videoComments.forEach((comment) => {
      if (comment.hasQuestion === 'T') {
        console.log('inside if')
        collection.push(comment);
      }
    })
    this.setState({
      videoComments: collection,
      commentDescription: 'Questions'
    })
    console.log('this.state after ', this.state)
  }

  passVideo(item) {
    console.log('item in passVideo ', item)
    this.setState({
      currentTitle: item.title, 
      currentVideo: item,
      commentDescription: 'Video Comments'  
    });
    this.getComments(item)
  }

  getComments(videoTitle) {
    console.log('video title is ', videoTitle)
    axios.post('http://localhost:5001/appQuery', {
      query: `SELECT * FROM comments where video in (select idvideos from videos where title = '${videoTitle.title || videoTitle}')`
    })
    .then((response) => {
      console.log('comment response from mariner ', response.data);
      this.setState({
        videoComments: response.data,
        view: 'main'
      });
    })
    .catch(err => {
      console.log('err in CR ', err);
    })
  } 

  passComment(comment) {
    // This will allow a clicked comment to render elsewhere:
    console.log('comment is ', comment)
    this.setState({
      loadedComment: comment,
      showModal: true
    });
  }

  replyAll(comment) {
    this.state.replyAll.push(comment)
    console.log('replyAll after push ', this.state.replyAll)
    //console.log('something Changed')
    
  }

  renderGraph() {
    this.setState({
      showGraph: true
    })
  }
  
  renderReplyAll() {
    this.setState({
      showReplyAllModal: true
    })
  }

  changeView(component) {
    if (component === 'logout') {
      console.log('logout pressed')
      this.setState({
        user: undefined,
        userVideos:   [],
        currentVideo: {},
        videoComments: [],
        view: 'login'
      });
    } else {
    this.setState({
      view: component  
    });
    console.log('clicking')
    }
  }

  commentClickedHandler(e) {
    // Component props chain: "Main" > "Dashboard" >  "Recent Comments" > "Comment"
    console.log('Comment was clicked!', e.target);
    this.setState({
      showModal: true
      // loadedComment: this.state.videoComments[0]
    });
    // Make 'modal' the state, pass it the clicked comment
  }

  dismissModalHandler() {
    // Pass this down to the <Backdrop /> component, so that when it is clicked, the page
    // dimisses the modal view.
    console.log('window is ', window)
    this.setState({
      showModal: false,
      showGraph: false,
      showReplyAllModal: false
    });
  }

  captureReplyText(event) {
    // Capture text
    let replyText;
    replyText = event.target.value;
    // Set state
    this.setState({
      replyText: replyText
    });
  }

  sendMultiples() {
    let q = queue();
    let replied = this.state.replyAll;
    replied.forEach((comment) => {
      q.push(() => {
        return new Promise((resolve, reject) => {
          axios.post('http://localhost:3000/api/comments/reply', {
            chanId: this.state.currentVideo.chanId,
            videoID: this.state.currentVideo.contentId,
            commentID: comment.providedID,
            textOriginal: this.state.replyText
          })
          .then((response) => {
            console.log('in response of sendMultiples')
            resolve()
          })
          .catch((err) => {
            console.log('in err of sendMultiples')
            reject()
          })
        })
      })
    })
    q.start((err) => {
      if (err) throw err
      console.log('all done ')  
    }) 
  }

  sendReply() {
    console.log('Send Reply fired!');
    let allData;
    let accessToken;
    let refreshToken;
    // set this equal to an axios call to Joe's mongoDb that has the tokens. (POST: 3000/api/all-data/by-name 
    axios.post('http://localhost:3000/api/all-data/by-name', {
      name: this.state.user
    })
    .then((response) => {
      console.log('Recieved response from Log-in');
      allData = response.data;
      accessToken = allData[0].access_token;
      refreshToken = allData[0].refresh_token;
      console.log('All data: ', allData);
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      console.log('commentID in app.jsx', this.state.loadedComment.providedId)
      // Axios POST to comments/reply on Login
      // Need commentId, chanId, parentID in req.body
      // providedID == commentID  Ex. UgwXC-AmR5Qoc9-JYtJ4AaABAg
      // contentID ??? videoID // parentID  Ex. qPjiMYNyE1Y
      // chanId === chanId  Ex. UC4zIIM0SSi27usDj00g
      axios.post('http://localhost:3000/api/comments/replytodirect', {
        // chanId: this.state.currentVideo.chanId,
        // videoId: this.state.currentVideo.contentId,
        access_token: accessToken,
        refresh_token: refreshToken,
        commentId: this.state.loadedComment.providedId,
        textOriginal: this.state.replyText
      })
      .then((response) => {
        console.log('Successfully sent post to comments/reply', response);
      })
      .catch((err) => {
        console.log('Error sending reply to comment: ', err.message);
      });
    })
    .catch((err) => {
      console.log('Err geting tokens', err.message);
    });  

  }

  renderView() {
    if (this.state.loading === true) {
      return <Spinner />
    }
    if (this.state.view === 'login') {
      return <Login />
    }
    if (this.state.view === 'videos') {
      return <Videos videos={this.state.userVideos} changeView={this.changeView.bind(this)} pass={this.passVideo.bind(this)} serviceName='YouTube'/>
    }
    // if (this.state.view === 'comments') {
    //   return <Comments title={this.state.currentTitle} comments={this.state.videoComments} renderQuestions={this.renderQuestions.bind(this)}/>
    // }
    if (this.state.view === 'main') {
      return <Main 
              serviceName='YouTube'
              commentDescription={this.state.commentDescription}
              changeView={this.changeView.bind(this)} 
              videos={this.state.userVideos}
              currentTitle={this.state.currentTitle}
              currentVideo={this.state.currentVideo} 
              comments={this.state.videoComments} 
              commentClicked={(e) => this.commentClickedHandler(e)}
              passComment={this.passComment.bind(this)}
              sendReply={this.sendReply.bind(this)}
              replyAll={this.replyAll.bind(this)}
              showGraph={this.state.showGraph}
              showModal={this.state.showModal}
              showReplyAllModal={this.state.showReplyAllModal}
              dismissModalHandler={() => this.dismissModalHandler()}
              loadedComment={this.state.loadedComment}
              replyAllCollection={this.state.replyAll}
              renderGraph={this.renderGraph.bind(this)}
              renderReplyAll={this.renderReplyAll.bind(this)}
              sendMultiples={this.sendMultiples.bind(this)}
              analyzeComments={this.analyzeComments.bind(this)}
              countAnalyzed={this.countAnalyzed.bind(this)}
              filterSentiments={this.filterSentiments.bind(this)}
              renderQuestions={this.renderQuestions.bind(this)}
              captureText={this.captureReplyText.bind(this)}
            />
    }
    if (this.state.view === 'no-content') {
      return <NoContentError />
    }
    if (this.state.view === 'test-chart') {
      return <TestChart />
    }
  }

  render() {
  	return( 
      <div>
        {this.renderView()}
      </div>
  	)
  }
}

export default App;
