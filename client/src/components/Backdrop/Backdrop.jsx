import React from 'react';
import classes from './Backdrop.css';


// This component will be used to 'darken' the main Mariner page when the Modal is loaded.
// This should give a more layered feeling to the app.

// Modal will appear only if the 'show' property is true from the props passed to it.
// Clicking on the backdrop will dismiss it and the modal.

const backdrop = (props) => (
  props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;