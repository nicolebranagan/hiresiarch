import React, { PureComponent } from 'react';
import { fromJS, List } from 'immutable';
import { HIRES_WIDTH, HIRES_BYTE_WIDTH, HIRES_HEIGHT, Colors, COLOR_COLORS, MONO_COLORS, ColorCodes } from '../Constants';
import { HiresRowRecord } from '../Records';
import SelectorBox from './SelectorBox';
import DrawingBox from './DrawingBox';

export default class HiresContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: List(Array(HIRES_HEIGHT).fill(HiresRowRecord({
        pixels: fromJS(Array(HIRES_WIDTH).fill(0)),
        offsets: fromJS(Array(HIRES_BYTE_WIDTH).fill(false)),
      }))),
      color: true,
      selectedColor: Colors.WHITE,
      dragging: false,
      startx: 0,
      starty: 0,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown = () => {
    this.setState({dragging: true});
  }

  onMouseUp = () => {
    this.setState({dragging: false});
  }

  onToggleColor = (event) => {
    this.setState({
      color: event.target.checked,
      selectedColor: event.target.checked ? this.state.selectedColor : Colors.BLACK,
    });
  }

  setXY = (y, x) => {
    console.log(y, x)
    this.setState({startx: x, starty: y});
  }

  drawSelectedColor = (row, column) => {
    const { data, selectedColor, color } = this.state;
    if (color) {
      // Essentially, we treat the resolution in color mode as having halved
      column = Math.floor(column / 2) * 2;
    }
    const byte = Math.floor(column / 7);
    let newData = data;
    if (color) {
      const codes = ColorCodes[selectedColor];
      if (selectedColor === Colors.VIOLET || selectedColor === Colors.GREEN) {
        newData = newData.setIn([row, 'offsets', byte], false);
      } else if (selectedColor === Colors.BLUE || selectedColor === Colors.ORANGE) {
        newData = newData.setIn([row, 'offsets', byte], true);
      }
      newData = newData.setIn([row, 'pixels', column], codes[0]);

      const nextByte = Math.floor((column + 1) / 7)
      if (selectedColor === Colors.VIOLET || selectedColor === Colors.GREEN) {
        newData = newData.setIn([row, 'offsets', nextByte], false);
      } else if (selectedColor === Colors.BLUE || selectedColor === Colors.ORANGE) {
        newData = newData.setIn([row, 'offsets', nextByte], true);
      }
      newData = newData.setIn([row, 'pixels', column+1], codes[1]);
    } else {
      newData = newData.setIn([row, 'pixels', column], selectedColor === Colors.BLACK ? 0 : 1);
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
    const { data, color, dragging, startx, starty } = this.state;

    return (
      <div>
        <div>
          <span>Color/Mono: <input type="checkbox" checked={color} onChange={this.onToggleColor} /></span>
          <span>Color: {this.renderColorOptions()} </span>
        </div>
        <SelectorBox 
          data={data} 
          color={color} 
          dragging={dragging}
          x={startx} 
          y={starty} 
          setXY={this.setXY} 
        />
        <DrawingBox 
          data={data} 
          color={color} 
          dragging={dragging} 
          startx={startx} 
          starty={starty} 
          drawSelectedColor={this.drawSelectedColor} 
        />
      </div>
    );
  }
}
