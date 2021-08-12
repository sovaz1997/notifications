export const useLocalstorage = <T>(key: string): [() => T | null, (value: T) => void] => {
  let data: T | null = null;
  try {
    const localstorageValue = window.localStorage.getItem(key);
    if (localstorageValue) {
      data = JSON.parse(localstorageValue);
    }
  } catch {
    data = null;
  }

  return [
    () => data,
    (value: T) => {
      window.localStorage.setItem(key, JSON.stringify(value));
      data = value;
    }
  ];
}
