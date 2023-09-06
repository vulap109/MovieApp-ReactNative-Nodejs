const formatDate = (date) => {
  date = new Date(date);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${year}/${month}/${day}`;
};

export { formatDate };
