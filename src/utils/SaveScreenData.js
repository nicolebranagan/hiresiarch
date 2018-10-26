import saveAs from 'file-saver';

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

  const rawBlocks = [...Array(8).keys()].map(box => {
    const rows = rawRows.slice(box*24, (box+1)*24);
    return [
      ...rows[0],
      ...rows[3],
      ...rows[6],
      ...rows[9],
      ...rows[12],
      ...rows[15],
      ...rows[18],
      ...rows[21],


      ...rows[1],
      ...rows[4],
      ...rows[7],
      ...rows[10],
      ...rows[13],
      ...rows[16],
      ...rows[19],
      ...rows[22],

      ...rows[2],
      ...rows[5],
      ...rows[8],
      ...rows[11],
      ...rows[14],
      ...rows[17],
      ...rows[20],
      ...rows[23],
    ];
  });
  const screenHole = [0, 0, 0, 0, 0, 0, 0, 0];
  const grandArray = rawBlocks.reduce((prev, curr) => [...prev, ...curr, ...screenHole], []);
  let grandOutput = '';
  for (let i = 0; i < (grandArray.length / 16); i++) {
    const subset = grandArray.slice(i*16, (i+1)*16);
    const dataString = ".byte " + subset.map(num => `$${num.toString(16)}`).join(', ') + '\n';
    grandOutput += dataString;
  }
  saveAs(new Blob([grandOutput], {type: 'application/octet-stream'}), "screen.dat");
};
