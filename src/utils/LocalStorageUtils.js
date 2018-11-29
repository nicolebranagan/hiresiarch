import localforage from 'localforage';

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
