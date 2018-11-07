import React from 'react';
import { COLOR_COLORS, MONO_COLORS } from '../Constants';

export default ({ 
  color, 
  selectedColor,
  drawingmult,
  setSelectedColor,
  onToggleColor,
  setDrawingmult,
}) => {
  const map = color ? COLOR_COLORS : MONO_COLORS;
  return (
    <div style={{display: 'block'}}>
      <div style={{display: 'inline-block'}}>
        <input type="range" min={1} max={8} value={drawingmult} onChange={setDrawingmult} />
      </div>
      <div style={{display: 'inline-block'}}>
        Color/Mono: <input type="checkbox" checked={color} onChange={onToggleColor} />
      </div>
      <div style={{display: 'inline-block'}} className='colors'>
        {map.map(color => <span key={color}>
          <input 
            type='radio' 
            name='colorSelect' 
            id={color}
            value={color} 
            checked={color === selectedColor}
            onChange={e => setSelectedColor(e.target.value)}
          />
          <label htmlFor={color} className={color} />
        </span>)}
      </div>
    </div>
  );
}