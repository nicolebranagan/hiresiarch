import React from 'react';
import HiresRow from './HiresRow';

export default ({ 
  data, 
  color, 
  dragging, 
  drawSelectedColor,
  startx,
  starty,
}) => {
  return (
    <div style={{display: 'inline-block', paddingLeft: '2px'}}>
      {[...Array(8).keys()].map(row => (
        <HiresRow
          key={row}
          data={data.get(starty+row)}
          start={startx}
          width={7}
          onClick={column => drawSelectedColor(starty+row, startx+column)}
          scale={48}
          color={color}
          dragging={dragging}
        />
      ))}
    </div>
  );
}
