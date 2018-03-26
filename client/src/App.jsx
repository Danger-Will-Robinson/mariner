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
        view: '',
        user: 'Sean Spencer',
        userVideos:[],
        videoComments: [],
        currentTitle: ''
      }
      console.log('this.state looks like ', this.state);
      this.changeView = this.changeView.bind(this);
    }
  
  // componentDidMount() {
  //   console.log('component mounting')
  //   this.videoRental()  
  // }
  

  // Use this function to retrieve user data after successful log in.
  componentWillMount() {
    this.videoRental();
      // axios.get('http://localhost:5000/getUser')
      // .then( response => {
      //   console.log('got user from Mariner', response.data)
      //   this.setState({
      //     user: response.data,
      //     view: 'videos'
      //   });
      //   this.videoRental();
      // })
      // .catch( err => {
      //   console.log('error in getting user name', err.message)
      // });
  }

  videoRental() {
    // if (this.state.view === 'main') {
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
      .then(() => {
        this.getComments(this.state.userVideos[0].title);
      })
      .catch(err => {
        console.log('err in videoRental ', err);
      })  
    // }
    
  }

  getComments(videoTitle) {
    console.log('video title is ', videoTitle)
    axios.post('http://localhost:5001/appQuery', {
      query: `SELECT * FROM comments where video in (select idvideos from videos where title = '${videoTitle.title || videoTitle}')`
    })
    .then((response) => {
      console.log('comment response from mariner ', response.data);
      this.setState({
        view: 'main',
        videoComments: response.data
      })
      console.log('this.state after CR ', this.state.videoComments)
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
      return <Main serviceName='YouTube' videos={this.state.userVideos} comments={this.state.videoComments}/>
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
    const LogOut = styled.button`
      margin-top: 15px;
      font-size: .9em;
      font-family: Verdana;
      height: 30px;
    `

    const Greeting = styled.span`
      padding: 5px;
      margin-right: 5px;
      margin-top: 10px;
      font-size: 1.1em;
      font-family: 'Verdana';
    `
    const Logo = styled.h1`
      font-weight: bold;
      font-size: 1.9em;
      margin-right: auto;
      margin-left: auto;
      align-items: center;
      font-family: 'Allan', cursive;
      color: #ffffff;  
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
      //     <Logo>Mariner</Logo>
      //     <Greeting>Welcome, {this.state.user}</Greeting>
      //     <LogOut><a href="http://localhost:3000/auth/logout">Log Out</a></LogOut>
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