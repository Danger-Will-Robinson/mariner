import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import Videos from './components/Videos.jsx';
import Comments from './components/Comments.jsx';

class App extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		view: 'videos',
      user: 'ph8tel',
      userVideos:[],
      videoComments: [],
      currentTitle: ''
  	}
  	console.log('this.state looks like ', this.state);
    this.changeView = this.changeView.bind(this);
  }
  
  componentWillMount() {
    console.log('component mounting')
    this.videoRental()  
  }

  videoRental() {
    if (this.state.view === 'videos') {
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
    console.log('video title is is ', videoTitle)
    axios.post('http://localhost:5001/appQuery', {
      query: `SELECT * FROM comments where video in (select idvideos from videos where title = '${videoTitle.title}')`
    })
    .then((response) => {
      console.log('comment response from mariner ', response.data);
      this.setState({
        videoComments: response.data
      })
      console.log('this.state after CR ', this.state)
    })
    .catch(err => {
      console.log('err in CR ', err);
    })
  } 

  passVideo(item) {
    // console.log('item in passVideo ', item)
    // this.setState({
    //   currentTitle: item.title   
    // })
    this.getComments(item)
  }

  

  changeView(component) {
    this.setState({
      view: component  
    });
    console.log('clicking')
  }

  renderView() {
    if (this.state.view === 'videos') {
      return <Videos videos={this.state.userVideos} changeView={this.changeView.bind(this)} pass={this.passVideo.bind(this)}/>
    }
    if (this.state.view === 'comments') {
      return <Comments title={this.state.currentTitle} comments={this.state.videoComments}/>
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

  	return(
      <div>
        <NavBar>
          <Logo>Mariner</Logo>
          <Greeting>Welcome, {this.state.user}</Greeting>
          <LogOut>Log Out</LogOut>
        </NavBar>
        <div className="main">
          {this.renderView()}
        </div>

      </div>   
  	)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));