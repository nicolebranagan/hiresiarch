import React from 'react';
import { HIRES_HEIGHT, HIRES_WIDTH } from '../Constants';
import HiresRow from './HiresRow';
import Selection from './Selection';

export default ({ data, color, dragging, x, y, drawingmult, setXY }) => (
  <div style={{position: 'relative', display: 'inline-block'}}>
    {[...Array(HIRES_HEIGHT).keys()].map(row => (
      <HiresRow
        key={row}
        data={data.get(row)}
        start={0}
        width={HIRES_WIDTH}
        onClick={setXY.bind(undefined, row)}
        scale={2}
        color={color}
        dragging={dragging}
      />
    ))}
    <Selection
      x={x} 
      y={y} 
      scale={2}
      width={7*drawingmult}
      height={8*drawingmult}
    />
  </div>
);