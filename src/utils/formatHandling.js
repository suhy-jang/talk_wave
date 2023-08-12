export const formatMessages = (message, accessor) => {
  if (typeof message === 'string') {
    return message;
  } else if (Array.isArray(message) && message.length > 0) {
    return message.map(accessor).join('\n');
  }
};
