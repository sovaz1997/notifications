export const useLocalstorage = <T>(key: string, defaultValue: T): [() => T, (value: T) => void] => {
  let data: T = defaultValue;

  try {
    const localstorageValue = window.localStorage.getItem(key);
    if (localstorageValue) {
      data = JSON.parse(localstorageValue);
    }
  } catch {
    data = defaultValue;
  }

  return [
    () => data,
    (value: T) => {
      window.localStorage.setItem(key, JSON.stringify(value));
      data = value;
    }
  ];
}
