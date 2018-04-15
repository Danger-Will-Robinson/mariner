import React from 'react';
import classes from './Main.css';

import NavBar from '../../components/NavBar/NavBar.jsx';
import NoContentError from '../../components/NoContentError/NoContentError.jsx';
import Dashboard from '../../components/Dashboard/Dashboard.jsx';
import Modal from '../../components/Modal/Modal.jsx';

const main = (props) => {
console.log('props in main ', props)
return (
  <div className={classes.Main}>
    <NavBar serviceName={props.serviceName} changeView={props.changeView} renderQuestions={props.renderQuestions} analyzeComments={props.analyzeComments}/>
    <Dashboard
      commentDescription={props.commentDescription} 
      activeContent={props.currentVideo}
      currentTitle={props.currentTitle} 
      recentComments={props.comments} 
      commentClicked={props.commentClicked}
      passComment={props.passComment} />
    <Modal 
      show={props.showModal} 
      dismissModalHandler={props.dismissModalHandler}
      loadedComment={props.loadedComment}/>
  </div>
);

}
export default main;