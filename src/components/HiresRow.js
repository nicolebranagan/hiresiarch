import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const HIRES_WIDTH = 280;
const HIRES_VIOLET = "#FF00FF";
const HIRES_GREEN = "#00FF00";
const HIRES_WHITE = "#FFFFFF";
const HIRES_BLUE = "#0055FF";
const HIRES_ORANGE = "#FF5500";

export default class HiresRow extends PureComponent {
  static propTypes = {
    scale: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired, // onClick(dataIndex)
  }

  componentDidMount() {
    this.drawHires();
  }

  componentDidUpdate(lastProps) {
    if (lastProps.data !== this.props.data) {
      this.drawHires();
    }
  }

  onClick() {

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
