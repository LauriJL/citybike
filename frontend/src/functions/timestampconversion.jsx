const TimestampConversion = (timestamp) => {
  let raw_string = JSON.stringify(timestamp);
  let dd = raw_string.slice(9, 11);
  let mm = raw_string.slice(6, 8);
  let yy = raw_string.slice(1, 5);
  let hh = raw_string.slice(12, 14);
  let MM = raw_string.slice(15, 17);
  let ss = raw_string.slice(18, 20);
  let new_date =
    hh + ":" + MM + ":" + ss + " (" + dd + "." + mm + "." + yy + ")";
  return new_date;
};

export default TimestampConversion;
