const mockLocalStorage = (() => {
  let store = {} as Storage;

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    removeItem(key: string) {
      delete store[key];
    },

    clear() {
      store = {} as Storage;
    },
  };
})();

mockLocalStorage.setItem('layout-resizable', JSON.stringify('?cols=1'));
mockLocalStorage.setItem(
  'components-resizable',
  JSON.stringify([
    { id: 2, name: 'RigInfoVue', label: 'Rig Status', locationIndex: 0 },
  ]),
);

export default mockLocalStorage;
