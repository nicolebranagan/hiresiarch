import React from 'react';

export default ({
  onClick,
  children
}) => (
  <div 
    style={{
      position: 'fixed',
      zIndex: 1,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundColor: `rgba(0,0,0,0.4)`,
    }}
    onClick={onClick}
  >
    {children}
  </div>
);
