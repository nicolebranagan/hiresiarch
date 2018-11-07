import React from 'react';
import HiresRow from './HiresRow';

export default ({ 
  data, 
  color, 
  dragging, 
  drawSelectedColor,
  startx,
  starty,
  drawingmult,
}) => {
  return (
    <div style={{display: 'inline-block', paddingLeft: '2px'}}>
      {[...Array(8*drawingmult).keys()].map(row => (
        <HiresRow
          key={row}
          data={data.get(starty+row)}
          start={startx}
          width={drawingmult*7}
          onClick={column => drawSelectedColor(starty+row, startx+column)}
          scale={48 / drawingmult}
          color={color}
          dragging={dragging}
        />
      ))}
    </div>
  );
}
