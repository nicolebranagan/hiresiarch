import React from 'react';

export default ({
  x,
  y,
  width,
  height,
  scale,
}) => {
  return(<div
    style={{
      position: 'absolute',
      left: x*scale,
      top: y*scale,
      border: '1px solid grey',
      width: scale*width-1,
      height: scale*height-1,
    }}
  />)
};