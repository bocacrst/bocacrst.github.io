import React from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapedComponent)=>{
    return(props) => {
        return(
            <React.Fragment>
                <Modal show>
                    Something didn't work!
                </Modal>
                <WrapedComponent {...props}/>
            </React.Fragment>
        );
    }
}

export default withErrorHandler;