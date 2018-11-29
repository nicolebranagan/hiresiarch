import React, { PureComponent } from 'react';
import ModalHOC from './modal/ModalHOC';

class SaveModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fileName: ''
    }
  }

  setFilename = (e) => {
    this.setState({fileName: e.target.value});
  }

  render() {
    const { fileName } = this.state;
    return (
      <div style={{textAlign: 'center', paddingBottom: '1em'}}>
        <h3>Save File</h3>
        <input 
          type="text" 
          value={fileName} 
          onChange={this.setFilename}
        />
        <div>
        <button disabled={fileName === ''}>Save</button>
        <button onClick={this.props.onCloseModal}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default ModalHOC('Save')(SaveModal);
