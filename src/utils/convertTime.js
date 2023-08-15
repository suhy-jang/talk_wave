function convertToKoreanTime(timestamp) {
  const date = new Date(timestamp);

  const formattedDate = new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
  const formattedTime = new Intl.DateTimeFormat('default', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);

  return `${formattedDate} ${formattedTime}`;
}

export { convertToKoreanTime };
