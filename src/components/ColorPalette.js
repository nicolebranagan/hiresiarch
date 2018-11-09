import React from 'react';
import { COLOR_COLORS, MONO_COLORS } from '../Constants';

export default ({ 
  color, 
  selectedColor,
  setSelectedColor,
}) => {
  const map = color ? COLOR_COLORS : MONO_COLORS;
  return (
    <div 
      style={{
        display: 'inline-block',
        paddingLeft: 2,
        verticalAlign: 'top',
      }} 
      className='colors'
    >
      {map.map(color => <div key={color}>
        <input 
          type='radio' 
          name='colorSelect' 
          id={color}
          value={color} 
          checked={color === selectedColor}
          onChange={e => setSelectedColor(e.target.value)}
        />
        <label htmlFor={color} className={color} />
      </div>)}
    </div>
  );
}