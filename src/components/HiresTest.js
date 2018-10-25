import React from 'react';
import HiresRow from './HiresRow';

const testData = Array(320).fill(1);

for (const i in testData) {
  testData[i] = Math.random() > 0.5 ? 0 : 1;
}
console.log(testData)

export default () => {
  return (
    <div>
      {[...Array(192).keys()].map(row => (
        <HiresRow
          key={row}
          data={testData}
          scale={3}
        />
      ))}
    </div>
  );
}