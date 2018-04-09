import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Videos from './components/Videos/Videos.jsx';
import Comments from './components/Comments/Comments.jsx';
import Login from './containers/LogIn/Login.jsx';
import Main from './containers/Main/Main.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'login',
      user: '',
      userVideos:[],
      videoComments: [],
      currentTitle: '',
      showModal: false
    }
    console.log('this.state looks like ', this.state);
    this.changeView = this.changeView.bind(this);
  }
  

  componentWillMount() {

  }

  async componentDidMount() {
    if (this.state.view === 'login') {
      const currentUser = await axios.get('http://localhost:5000/getUser');
      const userVideos = await axios.post('http://localhost:5001/appQuery', {
        query: `SELECT * FROM videos where user in (select idusers from users where username = '${currentUser.data}')`
      });
      const videoComments = await axios.post('http://localhost:5001/appQuery', {
        query: `SELECT * FROM comments where video in (select idvideos from videos where title = '${userVideos.data[0].title || userVideos.data[0].videoTitle}')`
      });

      this.setState({
        user: currentUser.data,
        userVideos: userVideos.data,
        videoComments: videoComments.data
      });
    }

    if (this.state.user !== '' && this.state.userVideos !== [] && this.state.videoComments !== []) {
      this.setState({
        view: 'main'
      });
    }
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
        collection.push(comment);
      }
    })
    this.setState({
      view: 'comments',
      videoComments: collection
    })
    console.log('this.state after ', this.state.videoComments)
  }

  passVideo(item) {
    // console.log('item in passVideo ', item)
    this.setState({
      currentTitle: item.title   
    });
    this.getComments(item)
  }

  

  changeView(component) {
    this.setState({
      view: component  
    });
    console.log('clicking')
  }

  commentClickedHandler() {
    // Component props chain: "Main" > "Dashboard" >  "Recent Comments" > "Comment"
    console.log('Comment was clicked!', this);
    this.setState({
      showModal: true
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
      return <Videos videos={this.state.userVideos} changeView={this.changeView.bind(this)} pass={this.passVideo.bind(this)}/>
    }
    if (this.state.view === 'comments') {
      return <Comments title={this.state.currentTitle} comments={this.state.videoComments}/>
    }
    if (this.state.view === 'main') {
      return <Main 
              serviceName='YouTube' 
              videos={this.state.userVideos} 
              comments={this.state.videoComments} 
              commentClicked={() => this.commentClickedHandler()} 
              showModal={this.state.showModal}
              dismissModalHandler={() => this.dismissModalHandler()}
            />
    }
  }

  render() {
    const NavBar = styled.div`
      background-color: grey;
      margin: 0px;
      padding: 5px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    `

    const Greeting = styled.span`
      padding: 5px;
      margin-right: 5px;
      margin-top: 10px;
      font-size: 1.1em;
      font-family: 'Verdana';
    `
    const ShowAllComments = styled.button`
      float: left;
    `
    const ShowQuestions = styled.button`
      float: left;
    `
    const ShowVideos = styled.button`
      float: left;
    `

  	return(
      // <div>
      //   <NavBar>
      //     <ShowQuestions onClick={this.renderQuestions.bind(this)}>Show Questions</ShowQuestions>
      //     <ShowAllComments onClick={() => this.getComments(this.state.currentTitle).bind(this)}>Show All Comments</ShowAllComments>
      //     <ShowVideos onClick={() => this.changeView('videos')}>Show Videos</ShowVideos>
      //     <Greeting>Welcome, {this.state.user}</Greeting>
      //   </NavBar>
      //   <div className="main">
      //     {this.renderView()}
      //   </div>
      // </div>   
      <div>
        {this.renderView()}
      </div>
  	)
  }
}

export default App;