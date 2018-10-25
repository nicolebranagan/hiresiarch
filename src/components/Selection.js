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
      width: width-1,
      height: height-1,
    }}
  />)
};