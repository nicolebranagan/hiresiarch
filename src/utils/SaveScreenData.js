import saveAs from 'file-saver';
import { HIRES_OFFSETS } from '../Constants';

const rowToBytes = ({pixels, offsets}) => {
  const output = [];
  for (let i = 0; i < offsets.size; i++) {
    const outputByte = offsets.get(i) ? 1 : 0;
    const pixelBytes = pixels.slice(i*7, (i+1)*7).reverse().toArray();
    output.push(parseInt([outputByte, ...pixelBytes].join(''), 2));
  }
  return output;
};

const byteize = grandArray => {
  let grandOutput = '';
  for (let i = 0; i < (grandArray.length / 16); i++) {
    const subset = grandArray.slice(i*16, (i+1)*16);
    const dataString = ".byte " + subset.map(num => `$${num.toString(16)}`).join(', ') + '\n';
    grandOutput += dataString;
  }
  return grandOutput;
};

export default data => {
  const rawRows = data.map(rowToBytes).toArray();

  const grandArray = Array(8192).fill(9);
  for (let i = 0; i < 192; i++) {
    const rowToInsert = rawRows[i];
    const removedItems = grandArray.splice(HIRES_OFFSETS[i], rowToInsert.length, ...rowToInsert);
    if (removedItems.length !== rowToInsert.length) {
      throw new Error("Couldn't build grandArray")
    }
  }

  const grandOutput = byteize(grandArray);
  saveAs(new Blob([grandOutput], {type: 'application/octet-stream'}), "screen.dat");
};

export const SaveCopyArea = copy => {
  const { rows, x, width } = copy;
  const rawRows = rows.map(rowToBytes).map(row => row.slice((x/7), (x + width)/7)).toArray().flat();
  return `; width: ${width/7} height: ${rows.size}\n`+byteize(rawRows);
};
