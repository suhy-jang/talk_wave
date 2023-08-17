export const devLog = (...args) => {
  if (process.env.NODE_DEV === 'development') {
    console.log(...args);
  }
};

export const devError = (...args) => {
  if (process.env.NODE_DEV === 'development') {
    console.error(...args);
  }
};
