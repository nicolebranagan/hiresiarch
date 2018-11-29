import localforage from 'localforage';
import { HiresRowRecord } from '../Records';
import { List, fromJS } from 'immutable';

const DICTIONARY_KEY = '__dictionary';

export const isFilenameValid = filename => {
  return filename !== '' && !filename.startsWith('__');
}

export const save = (filename, data) => {
  return localforage.getItem(DICTIONARY_KEY)
    .then(dictionary => {
      if (dictionary) {
        if (dictionary.includes(filename)) {
          return Promise.resolve(true);
        } else {
          return localforage.setItem(
            DICTIONARY_KEY, [...dictionary, filename]
          );
        }
      } else {
        return localforage.setItem(DICTIONARY_KEY, [filename]);
      }
    })
    .then(() => localforage.setItem(filename, data.toJS()));
};

export const getDictionary = () => localforage.getItem(DICTIONARY_KEY).then(
  dict => Promise.resolve(dict || [])
);

export const load = (filename) => localforage.getItem(filename)
  .then(data => {
    return Promise.resolve(List(
      data.map(row => HiresRowRecord({
        pixels: fromJS(row.pixels),
        offsets: fromJS(row.offsets)
      }))
    ));
  });
