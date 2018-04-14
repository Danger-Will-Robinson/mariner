import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Videos from './components/Videos/Videos.jsx';
import Comments from './components/Comments/Comments.jsx';
import Login from './containers/LogIn/Login.jsx';
import Main from './containers/Main/Main.jsx';
import NoContentError from './components/NoContentError/NoContentError.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'login',
      user: '',
      userVideos:[],
      currentVideo:[],
      videoComments: [],
      currentTitle: '',
      showModal: false,
      loadedComment: null
    }
    console.log('this.state looks like ', this.state);
    this.changeView = this.changeView.bind(this);
  }
  

  componentWillMount() {

  }

  async componentDidMount() {
    if (this.state.view === 'login') {
      const currentUser = await axios.get('http://localhost:5000/getUser');
      console.log('currentUser is ', currentUser)
      const userVideos = await axios.post('http://localhost:5001/appQuery', {
        query: `SELECT * FROM videos where user in (select idusers from users where username = '${currentUser.data}')`
      });
      console.log('userVideos is ', userVideos)
      const videoComments = await axios.post('http://localhost:5001/appQuery', {
        query: `SELECT * FROM comments where video in (select idvideos from videos where title = '${userVideos.data[0].title || userVideos.data[0].videoTitle}')`
      });
      console.log('videoComments is ', videoComments)

      this.setState({
        user: currentUser.data,
        userVideos: userVideos.data,
        currentVideo: userVideos.data[0],
        videoComments: videoComments.data
      });
    }

    if (this.state.user !== '' && this.state.userVideos !== [] && this.state.videoComments !== []) {
      this.setState({
        view: 'main'
      });
    } else if (this.state.userVideos.length === 0) {
      this.setState({
        view: 'no-content'
      })
    }
    console.log('state after componentDidMount ', this.state)
  }

  videoRental() {
    if (this.state.view === 'main') {
      axios.post('http://localhost:5001/appQuery', {
      query: `SELECT * FROM videos where user in (select idusers from users where username = '${this.state.user}')`
      })
      .then(response => {
        console.log('response from mariner ', response);
        this.setState({
          userVideos: response.data
        })
        console.log('this.state after rental ', this.state)
      })
      .catch(err => {
        console.log('err in videoRental ', err);
      })  
    }
  }

  getComments(videoTitle) {
    console.log('video title is ', videoTitle)
    axios.post('http://localhost:5001/appQuery', {
      query: `SELECT * FROM comments where video in (select idvideos from videos where title = '${videoTitle.title || videoTitle}')`
    })
    .then((response) => {
      console.log('comment response from mariner ', response.data);
      this.setState({
        videoComments: response.data
      });
      console.log('this.state after CR ', this.state.videoComments)
      })
    .then(() => {
      this.setState({
        view: 'main'
      });
    })
    .catch(err => {
      console.log('err in CR ', err);
    })
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
      videoComments: collection
    })
    console.log('this.state after ', this.state)
  }

  passVideo(item) {
    // console.log('item in passVideo ', item)
    this.setState({
      currentTitle: item.title, 
      currentVideo: item  
    });
    this.getComments(item)
  }

  

  changeView(component) {
    this.setState({
      view: component  
    });
    console.log('clicking')
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
    this.setState({
      showModal: false
    });
  }

  renderView() {
    if (this.state.view === 'login') {
      return <Login />
    }
    if (this.state.view === 'videos') {
      return <Videos videos={this.state.userVideos} changeView={this.changeView.bind(this)} pass={this.passVideo.bind(this)} serviceName='YouTube'/>
    }
    // if (this.state.view === 'comments') {
    //   return <Comments title={this.state.currentTitle} comments={this.state.videoComments} renderQuestions={this.renderQuestions.bind(this)}/>
    // }
    if (this.state.view === 'main' || this.state.view === 'comments') {
      return <Main 
              serviceName='YouTube'
              changeView={this.changeView.bind(this)} 
              videos={this.state.userVideos}
              currentTitle={this.state.currentTitle}
              currentVideo={this.state.currentVideo} 
              comments={this.state.videoComments} 
              commentClicked={(e) => this.commentClickedHandler(e)} 
              showModal={this.state.showModal}
              dismissModalHandler={() => this.dismissModalHandler()}
              loadedComment={this.state.loadedComment}
              renderQuestions={this.renderQuestions.bind(this)}
            />
    }
    if (this.state.view === 'no-content') {
      return <NoContentError />
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