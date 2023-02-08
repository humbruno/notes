const getCurrentDateFormat = () => {
  const date = new Date();

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  const currentDate = `${month}, ${day} ${year}`;

  return currentDate;
};

export default getCurrentDateFormat;
