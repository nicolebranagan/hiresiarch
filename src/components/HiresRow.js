import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  HIRES_VIOLET,
  HIRES_GREEN,
  HIRES_WHITE,
  HIRES_BLUE,
  HIRES_ORANGE,
  MONO,
} from '../Constants';
import { HiresRowRecord } from '../Records';

export default class HiresRow extends PureComponent {
  static propTypes = {
    scale: PropTypes.number.isRequired,
    data: PropTypes.instanceOf(HiresRowRecord).isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.bool.isRequired,
    dragging: PropTypes.bool.isRequired,
    start: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }

  componentDidMount() {
    const { canvas } = this.refs;
    canvas.addEventListener('click', this.onClick);
    canvas.addEventListener('mousemove', this.onMouseMove);

    this.drawHires();
  }

  componentWillUnmount() {
    const { canvas } = this.refs;
    canvas.removeEventListener('click', this.onClick);
    canvas.removeEventListener('mousemove', this.onMouseMove);
  }

  componentDidUpdate() {
    this.drawHires();
  }

  onMouseMove = (event) => {
    if (this.props.dragging) {
      this.onClick(event);
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
    const { width } = this.props;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, 1);
  }

  drawRect(color, x) {
    const { canvas } = this.refs;
    const { start } = this.props;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = color;
    ctx.fillRect(x - start, 0, 1, 1);
  }

  drawHiresColor() {
    const { data: {pixels, offsets}, start, width } = this.props;
    this.clearCanvas();

    for (let i = start; i < (start+width); i++) {
      if (pixels.get(i) && (pixels.get(i+1) || pixels.get(i-1))) {
        this.drawRect(HIRES_WHITE, i);
      } else {
        const even = i % 2 === 0;
        const pair = even ? [pixels.get(i), pixels.get(i+1)] : [pixels.get(i-1), pixels.get(i)];
        switch (pair.toString()) {
          case "1,0": {
            const offset = offsets.get(Math.floor(i/7));
            this.drawRect(offset ? HIRES_BLUE : HIRES_VIOLET, i);
            break;
          }
          case "0,1": {
            const offset = offsets.get(Math.floor((i+1)/7));
            this.drawRect(offset ? HIRES_ORANGE : HIRES_GREEN, i);
            break;
          }
          default:
            break;
        }
      }
    }
  }

  drawHiresMono(){
    const { data: {pixels}, start, width } = this.props;
    this.clearCanvas();
    
    for (let i = start; i < (start+width); i++) {
      const bit = pixels.get(i);
      if (bit) {
        this.drawRect(MONO, i);
      }
    }
  }

  drawHires() {
    if (this.props.color) {
      this.drawHiresColor();
    } else {
      this.drawHiresMono();
    }
  }

  render() {
    const { scale, width } = this.props;
    return (
      <canvas 
        ref="canvas" 
        height={1} 
        width={width} 
        style={{
          height: scale,
          width: width*scale,
          display: 'block',
        }}
      />
    )
  }
};
