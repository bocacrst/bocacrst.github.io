import React, { Component } from 'react';
import classes from './Modal.module.css';
import BackDrop from '../BackDrop/BackDrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

   render(){
    return(
        <React.Fragment>
            <BackDrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div className={classes.Modal} style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)'}}>
                {this.props.children}
            </div>
        
    
        </React.Fragment>
       )
   }
};

export default Modal;