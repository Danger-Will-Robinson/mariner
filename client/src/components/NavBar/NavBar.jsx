import React from 'react';
import classes from './NavBar.css';
import MarinerLogo from '../../../assets/simple-boat-icon-73971.png';
import TitleBar from './TitleBar/TitleBar.jsx';
import NavServiceSelector from './NavServiceSelector/NavServiceSelector.jsx';

const navBar = (props) => (
  <div className={classes.NavBar}>
    <img  onClick={ ()=> props.changeView('main') } src={MarinerLogo} className={classes.appLogo}></img>
    <TitleBar serviceName={props.serviceName} />
    <NavServiceSelector changeView={props.changeView} renderQuestions={props.renderQuestions} analyzeComments={props.analyzeComments} renderGraph={props.renderGraph}/>
    <div href="http://localhost:3000/auth/logout" className={classes.logOutButton}>
      <span onClick={ ()=> props.changeView('logout') } className={classes.logOutText} >
          Log Out
     </span>
    </div>
  </div>
);

export default navBar;