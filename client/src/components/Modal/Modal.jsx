import React from 'react';
import classes from './Modal.css';

import Aux from '../../hoc/Aux.jsx';
import Backdrop from '../Backdrop/Backdrop.jsx';

/* 
1) Modal should render once a user clicks on a comment from anywhere in the Mariner UI.
2) Modal will show Comment in a centered box on the page. It will also have a backdrop component that will
  'darken' the background of the main Mariner page.
3) Response form will also be shown here, along with a "Reply" button.
*/

const modal = (props) => (
  <Aux>
    <Backdrop show={props.show} clicked={props.dismissModalHandler}/>
  </Aux>
);

export default modal;