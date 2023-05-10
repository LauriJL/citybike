const TimestampConversion = (timestamp) => {
  let date = new Date(timestamp).toLocaleString();
  return date;
};

export default TimestampConversion;
