import React from 'react';
import classes from './Main.css';

import NavBar from '../../components/NavBar/NavBar.jsx';
import NoContentError from '../../components/NoContentError/NoContentError.jsx';
import Dashboard from '../../components/Dashboard/Dashboard.jsx';
import Modal from '../../components/Modal/Modal.jsx';

const main = (props) => (
  <div className={classes.Main}>
    <NavBar serviceName={props.serviceName} changeView={props.changeView}/>
    <Dashboard 
      activeContent={props.videos[0]} 
      recentComments={props.comments} 
      commentClicked={props.commentClicked} />
    <Modal 
      show={props.showModal} 
      dismissModalHandler={props.dismissModalHandler}
      loadedComment={props.loadedComment}/>
  </div>
);

export default main;