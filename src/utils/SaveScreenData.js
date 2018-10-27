import saveAs from 'file-saver';

const screenHole = [0, 0, 0, 0, 0, 0, 0, 0];

export default data => {
  const rawRows = data.map(({pixels, offsets}) => {
    const output = [];
    for (let i = 0; i < offsets.size; i++) {
      const byteOut = []
      const outputByte = offsets.get(i) ? 1 : 0;
      byteOut.push(outputByte);
      pixels.toArray().slice(i*7, (i+1)*7).reverse().forEach(byte => byteOut.push(byte));
      output.push(parseInt(byteOut.join(''), 2));
    }
    return output;
  }).toArray();

  const rawBlocks = [...Array(8).keys()].flatMap(box1 => [...Array(8).keys()].map(box2 => {

    return [
      ...rawRows[box1+box2*8],
      ...rawRows[(box1+box2*8)+64],
      ...rawRows[(box1+box2*8)+128],
      ...screenHole
    ]
  }));

  const grandArray = rawBlocks.reduce((prev, curr) => [...prev, ...curr], []);
  let grandOutput = '';
  for (let i = 0; i < (grandArray.length / 16); i++) {
    const subset = grandArray.slice(i*16, (i+1)*16);
    const dataString = ".byte " + subset.map(num => `$${num.toString(16)}`).join(', ') + '\n';
    grandOutput += dataString;
  }
  console.log(grandArray.length)
  saveAs(new Blob([grandOutput], {type: 'application/octet-stream'}), "screen.dat");
};
