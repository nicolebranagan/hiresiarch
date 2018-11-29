import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import ModalHOC from './modal/ModalHOC';
import { isFilenameValid, save } from '../utils/LocalStorageUtils';

class SaveModal extends PureComponent {
  static propTypes = {
    data: PropTypes.instanceOf(List).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      fileName: ''
    }
  }

  setFilename = (e) => {
    this.setState({fileName: e.target.value});
  }

  onSave = () => {
    const { data, onCloseModal } = this.props;
    const { fileName } = this.state;
    save(fileName, data).then(onCloseModal).catch(e => alert(e));
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
        <button 
          disabled={!isFilenameValid(fileName)} 
          onClick={this.onSave} 
        >
          Save
        </button>
        <button onClick={this.props.onCloseModal}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default ModalHOC('Save')(SaveModal);
