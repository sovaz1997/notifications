export const memoize = <T>(fn: () => Promise<T>): () => Promise<T> => {
  let result: T | null = null;

  return () => {
    return new Promise((resolve) => {
      if (result) {
        resolve(result);
      } else {
        fn().then((fnResult) => {
          result = fnResult;
          resolve(result);
        });
      }
    });
  };
};
