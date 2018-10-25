import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  HIRES_WIDTH,
  HIRES_VIOLET,
  HIRES_GREEN,
  HIRES_WHITE,
  HIRES_BLUE,
  HIRES_ORANGE,
} from '../Constants';

export default class HiresRow extends PureComponent {
  static propTypes = {
    scale: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired, // onClick(dataIndex)
  }

  componentDidMount() {
    const { canvas } = this.refs;
    canvas.addEventListener('click', this.onClick);

    this.drawHires();
  }

  componentWillUnmount() {
    const { canvas } = this.refs;
    canvas.removeEventListener('click', this.onClick);
  }

  componentDidUpdate(lastProps) {
    if (lastProps.data !== this.props.data) {
      this.drawHires();
    }
  }

  onClick = (event) => {
    const { canvas } = this.refs;
    const { scale, onClick } = this.props;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / scale);
    onClick(x);
  }

  clearCanvas() {
    const { canvas } = this.refs;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, HIRES_WIDTH, 1);
  }

  drawRect(color, x, width) {
    const { canvas } = this.refs;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = color;
    ctx.fillRect(x, 0, width, 1);
  }

  drawHires() {
    const { data } = this.props;
    this.clearCanvas();
    
    let offset = false;
    let pair = [];
    let drawPos = 0;
    for (let i = 0; i < data.length; i++) {
      const bit = data[i];
      if (i % 8 === 0) {
        // The first bit of each byte defines
        offset = bit === 1;
      } else {
        pair.push(bit);
        if (pair.length === 2) {
          switch (pair.toString()) {
            case "0,1": {
              this.drawRect(offset ? HIRES_BLUE : HIRES_VIOLET, drawPos, 2);
              break;
            }
            case "1,0": {
              this.drawRect(offset ? HIRES_ORANGE : HIRES_GREEN, drawPos, 2);
              break;
            }
            case "1,1": {
              this.drawRect(HIRES_WHITE, drawPos, 2);
              break;
            }
            default:
              break;
          }
          drawPos += 2;
          pair = [];
        }
      }
    }
  }

  render() {
    const { scale } = this.props;
    return (
      <canvas 
        ref="canvas" 
        height={1} 
        width={HIRES_WIDTH} 
        style={{
          height: scale,
          width: HIRES_WIDTH*scale,
          display: 'block',
        }}
      />
    )
  }
};
