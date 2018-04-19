import React from 'react';
import classes from './Main.css';

import NavBar from '../../components/NavBar/NavBar.jsx';
import NoContentError from '../../components/NoContentError/NoContentError.jsx';
import Dashboard from '../../components/Dashboard/Dashboard.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import ReplyAllModal from '../../components/Modal/ReplyAllModal.jsx'
import GraphModal from '../../components/Graph/GraphModal.jsx'


const main = (props) => {
console.log('props in main ', props)
return (
  <div className={classes.Main}>
    <NavBar serviceName={props.serviceName} changeView={props.changeView} renderQuestions={props.renderQuestions} analyzeComments={props.analyzeComments} renderGraph={props.renderGraph} />
    <Dashboard
      commentDescription={props.commentDescription} 
      activeContent={props.currentVideo}
      currentTitle={props.currentTitle} 
      recentComments={props.comments} 
      commentClicked={props.commentClicked}
      replyAll={props.replyAll}
      renderReplyAll={props.renderReplyAll}
      passComment={props.passComment} />
    <Modal 
      isVisible={props.showModal} 
      dismissModalHandler={props.dismissModalHandler}
      loadedComment={props.loadedComment}
      sendReply={props.sendReply}
      captureText={(event) => props.captureText(event)}/>
    <GraphModal
      comments={props.comments}
      countAnalyzed={props.countAnalyzed}
      filterSentaments={props.filterSentaments}
      isVisible={props.showGraph}
      dismissModalHandler={props.dismissModalHandler}/> 
    <ReplyAllModal 
      isVisible={props.showReplyAllModal}
      replyAllCollection={props.replyAllCollection}
      captureText={(event) => props.captureText(event)}
      sendMultiples={props.sendMultiples}
      dismissModalHandler={props.dismissModalHandler}/>   
  </div>
);

}
export default main;