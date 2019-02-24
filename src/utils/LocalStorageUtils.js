import localforage from 'localforage';
import { HiresRowRecord } from '../Records';
import { List, fromJS } from 'immutable';
import saveAs from 'file-saver';

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

export const getAllSavedData = () => {
  return (async () => {
    const dictionary = await localforage.getItem(DICTIONARY_KEY);
    if (!dictionary) {
      throw new Error("No saved data to export!");
    }
    const data = {dictionary};
    for (const key of dictionary) {
      data[key] = (await localforage.getItem(key));
    }

    saveAs(new Blob([JSON.stringify(data)], {type: 'application/octet-stream'}), "full-output.data");
  })();
}

export const loadAllSavedData = data => {
  const parsedData = JSON.parse(data);
  if (!parsedData.dictionary) {
    throw new Error("Invalid data!");
  }
  return (async () => {
    for (const key of parsedData.dictionary) {
      await localforage.setItem(key, parsedData[key]);
    }
  })();
}

export const load = (filename) => localforage.getItem(filename)
  .then(data => {
    return Promise.resolve(List(
      data.map(row => HiresRowRecord({
        pixels: fromJS(row.pixels),
        offsets: fromJS(row.offsets)
      }))
    ));
  });
