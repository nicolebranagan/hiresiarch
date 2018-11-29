import React from 'react';

export default ({children}) => (
  <div
    style={{
      margin: "15% auto",
      backgroundColor: "antiquewhite",
      borderWidth: "4px",
      borderColor: "black",
      borderStyle: "double",
      width: "40%",
    }}

    onClick={(e) => {e.stopPropagation();}}
  >
    {children}
  </div>
);
