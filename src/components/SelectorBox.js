import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HIRES_HEIGHT, HIRES_WIDTH } from '../Constants';
import HiresRow from './HiresRow';
import { List } from 'immutable';
import Selection from './Selection';

export default class SelectorBox extends PureComponent {
  static propTypes = {
    data: PropTypes.instanceOf(List).isRequired,
    color: PropTypes.bool.isRequired,
    dragging: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
    };
  }

  moveSelectorBox(row, column) {
    this.setState({
      x: column,
      y: row,
    })
  }

  render() {
    const { data, color, dragging } = this.props;
    const { x, y } = this.state;
    return (<div style={{position: 'relative'}} ref='container'>
      {[...Array(HIRES_HEIGHT).keys()].map(row => (
        <HiresRow
          key={row}
          data={data.get(row)}
          start={0}
          width={HIRES_WIDTH}
          onClick={this.moveSelectorBox.bind(this, row)}
          scale={2}
          color={color}
          dragging={dragging}
        />
      ))}
      <Selection
        x={x} 
        y={y} 
        scale={2}
        width={7}
        height={8}
      />
    </div>)
  }
}