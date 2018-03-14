import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';

class App extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		view: 'videos',
      user: 'ph8tel',
      userVideos:[]
  	}
  	console.log('this.state looks like ', this.state);
    this.changeView = this.changeView.bind(this);
  }
  
  componentWillMount() {
    console.log('component mounting')
    this.videoRental()  
  }

  videoRental() {
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

  changeView(component) {
    this.setState({
      view: component  
    });
  }

  render() {
    const NavBar = styled.div`
      background-color: grey;
      margin: 0px;
      padding: 20px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    `
    const LogOut = styled.button`
      margin-top: 15px;
      font-size: .9em;
      height: 30px;
    `

  	return(
      <div>
        <NavBar>
          <LogOut>Log Out</LogOut>
        </NavBar>

      </div>   
  	)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));