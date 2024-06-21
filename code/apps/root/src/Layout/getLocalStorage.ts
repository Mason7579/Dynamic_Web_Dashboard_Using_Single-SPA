export const getLocalLayout = (layoutLocalStorageKey: string) => {
  const defaultLayout = location.pathname.split('/').pop()
    ? '?cols=1'
    : '?cols=2,2';

  try {
    return JSON.parse(
      localStorage.getItem(layoutLocalStorageKey) || defaultLayout,
    );
  } catch (e) {
    //
  }
  return defaultLayout;
};

export const getLocalComponents = (componentsLocalStorageKey: string) => {
  let comps = [];

  try {
    comps = JSON.parse(localStorage.getItem(componentsLocalStorageKey) || '[]');
  } catch (e) {
    //
  }

  return comps;
};
