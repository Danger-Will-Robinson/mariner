import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		view: 'videos'
  	}
  	//console.log('this.state looks like ', this.state);
    this.changeView = this.changeView.bind(this);
  }

  changeView(component) {
    this.setState({
      view: component  
    });
  }

  render() {
  	return(
      <h1>Mariner</h1>   
  	)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));