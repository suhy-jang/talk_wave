export const getErrorMessage = (error) => {
  let errorMessage;

  if (typeof error === 'string') {
    errorMessage = error;
  } else if (Array.isArray(error) && error.length > 0) {
    errorMessage = error
      .map((err) => {
        const { path, value, msg } = err;
        return `'${path}' with value '${value}' has '${msg}' error`;
      })
      .join('\n');
  }
  return errorMessage;
};
