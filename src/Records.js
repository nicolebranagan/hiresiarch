import { Record } from 'immutable';

export const HiresRowRecord = Record({
  pixels: null,
  offsets: null,
}, 'HiresRowRecord');

export const CopyDataRecord = Record({
  rows: null,
  x: null,
  width: null,
})
