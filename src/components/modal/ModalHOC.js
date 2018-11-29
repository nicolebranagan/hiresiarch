import React, { PureComponent, Fragment } from 'react';
import ModalOverlay from './ModalOverlay';
import ModalBox from './ModalBox';

export default buttonText => WrappedComponent => {
  class Modal extends PureComponent {
    constructor(props) {
      super(props);
  
      this.state = {
        open: false,
      }
    }
  
    onClick = () => {
      const { open } = this.state;
      this.setState({open: !open});
    }
  
    render() {
      const { open } = this.state;
      return (
        <Fragment>
          <button onClick={this.onClick}>
            {buttonText}
          </button>
          {open && <Fragment>
            <ModalOverlay onClick={this.onClick}>
              <ModalBox>
                <WrappedComponent
                  {...this.props}
                  onCloseModal={this.onClick}
                />
              </ModalBox>
            </ModalOverlay>
          </Fragment>}
        </Fragment>
      );
    }
  };

  return Modal;
} 

