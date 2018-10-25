import React, { PureComponent } from 'react';
import { HIRES_BYTE_WIDTH, HIRES_HEIGHT } from '../Constants';
import HiresRow from './HiresRow';

export default class HiresContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: Array(HIRES_HEIGHT).fill(Array(HIRES_BYTE_WIDTH).fill(0)),
      color: true,
    };
  }

  onToggleColor = (event) => {
    this.setState({
      color: event.target.checked,
    });
  }

  onClick(row, column) {
    const { data } = this.state;
    const byte = Math.floor(column / 7);
    const byteOffset = byte * 8 + column % 7 + 1;
    const newData = [...data];
    newData[row] = [...data[row]];
    const bit = data[row][byteOffset];
    newData[row][byteOffset] = bit ? 0 : 1;
    this.setState({
      data: newData,
    });
  }

  render() {
    const { data, color } = this.state;

    return (
      <div>
        <div>
          Color: <input type="checkbox" checked={color} onChange={this.onToggleColor} />
        </div>
        {[...Array(HIRES_HEIGHT).keys()].map(row => (
          <HiresRow
            key={row}
            data={data[row]}
            onClick={this.onClick.bind(this, row)}
            scale={9}
            color={color}
          />
        ))}
      </div>
    );
  }
}
