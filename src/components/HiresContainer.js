import React, { PureComponent } from 'react';
import { HIRES_BYTE_WIDTH, HIRES_HEIGHT, Colors, COLOR_COLORS, MONO_COLORS, ColorCodes } from '../Constants';
import HiresRow from './HiresRow';

export default class HiresContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: Array(HIRES_HEIGHT).fill(Array(HIRES_BYTE_WIDTH).fill(0)),
      color: true,
      selectedColor: Colors.WHITE,
    };
  }

  onToggleColor = (event) => {
    this.setState({
      color: event.target.checked,
      selectedColor: event.target.checked ? this.state.selectedColor : Colors.BLACK,
    });
  }

  onClick(row, column) {
    const { data, selectedColor, color } = this.state;
    if (color) {
      // Essentially, we treat the resolution in color mode as having halved
      column = Math.floor(column / 2) * 2;
    }
    const byte = Math.floor(column / 7) * 8;
    const byteOffset = byte + column % 7 + 1;
    const newData = [...data];
    newData[row] = [...data[row]];
    if (color) {
      const codes = ColorCodes[selectedColor];
      if (selectedColor === Colors.VIOLET || selectedColor === Colors.GREEN) {
        newData[row][byte] = 0;
      } else if (selectedColor === Colors.BLUE || selectedColor === Colors.ORANGE) {
        newData[row][byte] = 1;
      }
      newData[row][byteOffset] = codes[0];

      if ((byteOffset + 1) % 8 === 0) {
        if (selectedColor === Colors.VIOLET || selectedColor === Colors.GREEN) {
          newData[row][byteOffset+1] = 0;
        } else if (selectedColor === Colors.BLUE || selectedColor === Colors.ORANGE) {
          newData[row][byteOffset+1] = 1;
        }
        newData[row][byteOffset+2] = codes[1];
      } else {
        newData[row][byteOffset+1] = codes[1];
      }
    } else {
      newData[row][byteOffset] = selectedColor === Colors.BLACK ? 0 : 1;
    }

    this.setState({
      data: newData,
    });
  }

  renderColorOptions() {
    const { color, selectedColor } = this.state;
    const map = color ? COLOR_COLORS : MONO_COLORS;
    return (
      <span>
        {map.map(color => <span key={color}>
          <input 
            type='radio' 
            name='colorSelect' 
            value={color} 
            checked={color === selectedColor}
            onChange={(e) => this.setState({selectedColor: e.target.value})}
          />
          {color}
        </span>)}
      </span>
    )
  }

  render() {
    const { data, color } = this.state;

    return (
      <div>
        <div>
          <span>Color/Mono: <input type="checkbox" checked={color} onChange={this.onToggleColor} /></span>
          <span>Color: {this.renderColorOptions()} </span>
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
