import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		videos: []
  	}
  	console.log('this.state looks like ', this.state);
  }

  render() {
  	return(
      <h1>Mariner</h1>   
  	)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));