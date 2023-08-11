export const getErrorMessage = (error) => {
  let errorMessage;

  if (typeof error === 'string') {
    errorMessage = error;
  } else if (Array.isArray(error) && error.length > 0) {
    errorMessage = error.map((err) => err.msg).join('\n');
  }
  return errorMessage;
};
