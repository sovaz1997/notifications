export const pluralize = ([a, b, c]: string[], value: number) => {
  const from11to19 = (value % 100 >= 11 && value % 100 <= 19);

  if (value % 10 === 1 && !from11to19) {
    return a;
  } else if ([2, 3, 4].includes(value % 10) && !from11to19) {
    return b;
  }

  return c;
}
