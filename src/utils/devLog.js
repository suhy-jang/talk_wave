export const devLog = (...args) => {
  if (process.env.NODE_DEV === 'development') {
    console.log(...args);
  }
};
