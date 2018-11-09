import { HIRES_OFFSETS } from '../Constants';
import { List, fromJS } from 'immutable';
import { HiresRowRecord } from '../Records';

export default rawFile => {
  const regEx = /\$(.*?)[,|\n]/g;
  const bytes = rawFile
    .match(regEx)
    .map(str => str.slice(1, -1))
    .map(str => parseInt(str, 16));
  
  let data = List();
  for (let i = 0; i < 192; i++) {
    const offset = HIRES_OFFSETS[i];
    const row = bytes.slice(offset, offset + 40);

    let pixels = [];
    const offsets = [];
    for (let j = 0; j < 40; j++) {
      const byte = row[j].toString(2).padStart(8, '0');
      offsets.push(byte[0] === 1);
      pixels = pixels.concat(byte.slice(1).split('').map(Number).reverse());
    }

    data = data.push(new HiresRowRecord({
      pixels: fromJS(pixels),
      offsets: fromJS(offsets)
    }));
  }
  return data;
};
