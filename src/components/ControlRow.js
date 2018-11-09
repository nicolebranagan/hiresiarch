import React from 'react';

export default ({ 
  color, 
  drawingmult,
  onToggleColor,
  setDrawingmult,
}) => {
  return (
    <div style={{display: 'block'}}>
      <div style={{display: 'inline-block'}}>
        <input type="range" min={1} max={8} value={drawingmult} onChange={setDrawingmult} />
      </div>
      <div style={{display: 'inline-block'}}>
        Color/Mono: <input type="checkbox" checked={color} onChange={onToggleColor} />
      </div>
    </div>
  );
}