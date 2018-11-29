import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { getDictionary, load } from '../utils/LocalStorageUtils';
import ModalHOC from './modal/ModalHOC';

const Loading = () => <span>loading</span>;

class LoadModal extends PureComponent {
  static propTypes = {
    onLoad: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      dictionary: null,
      selected: null,
    }
  }

  componentDidMount() {
    getDictionary().then(dictionary => this.setState({
      dictionary,
      loaded: true
    }));
  }

  onChange = (selected) => {
    this.setState({selected})
  }

  onLoad = () => {
    const { selected } = this.state;
    const { onLoad, onCloseModal } = this.props;
    load(selected.value).then(data => {
      onLoad(data);
      onCloseModal();
    });
  }

  getOptions() {
    const { dictionary } = this.state;
    return dictionary.map(filename => ({
      value: filename,
      label: filename,
    }));
  }
  
  render() {
    const { loaded, selected } = this.state;
    if (!loaded) {
      return <Loading />
    } else {
      return (
        <div style={{textAlign: 'center', paddingBottom: '1em'}}>
          <h3>Load File</h3>
          <Select
            value={selected}
            onChange={this.onChange}
            options={this.getOptions()}
          />
          <button 
            disabled={!selected} 
            onClick={this.onLoad} 
          >
            Load
          </button>
          <button onClick={this.props.onCloseModal}>Cancel</button>
        </div>
      )
    }
  }
}

export default ModalHOC('Load')(LoadModal);
