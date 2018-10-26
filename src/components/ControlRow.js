import React from 'react';
import { COLOR_COLORS, MONO_COLORS } from '../Constants';

export default ({ 
  color, 
  selectedColor,
  setSelectedColor,
  onToggleColor
}) => {
  const map = color ? COLOR_COLORS : MONO_COLORS;
  return (
    <div style={{width: '100%', textAlign: 'left'}}>
      <div style={{display: 'inline-block'}}>
        Color/Mono: <input type="checkbox" checked={color} onChange={onToggleColor} />
      </div>
      <div style={{display: 'inline-block'}}>
        {map.map(color => <span key={color}>
          <input 
            type='radio' 
            name='colorSelect' 
            value={color} 
            checked={color === selectedColor}
            onChange={e => setSelectedColor(e.target.value)}
          />
          {color}
        </span>)}
      </div>
    </div>
  );
}