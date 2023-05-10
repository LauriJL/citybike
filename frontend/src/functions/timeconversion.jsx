const TimeConversion = (timestamp) => {
  let time = "";
  let days = 0;
  let hrs = 0;
  let min = 0;
  let sec = 0;

  if (timestamp.toString().length < 3) {
    if (timestamp === 60) {
      time = 1 + "m";
    } else {
      time = (timestamp % 60) + "s";
    }
  } else if (timestamp.toString().length === 3) {
    time = Math.floor(timestamp / 60).toFixed() + "m " + (timestamp % 60) + "s";
  } else if (timestamp.toString().length === 4 && timestamp < 3600) {
    time = Math.floor(timestamp / 60).toFixed() + "m " + (timestamp % 60) + "s";
  } else if (timestamp.toString().length === 4 && timestamp >= 3600) {
    hrs = Math.floor(timestamp / 60 / 60).toFixed();
    min = Math.floor((timestamp / 60) % 60);
    sec = Math.ceil((((timestamp / 60) % 60) % min) * 60);
    let type = isNaN(sec);
    if (!isNaN(sec)) {
      time = hrs + "h " + min + "m " + 0 + "s";
    } else {
    }
    time = hrs + "h " + min + "m " + sec + "s";
  } else {
    days = Math.floor(timestamp / 60 / 60 / 24);
    hrs = Math.floor(timestamp / 60 / 60 - 24).toFixed();
    min = Math.floor((timestamp / 60) % 60);
    sec = Math.ceil((((timestamp / 60) % 60) % min) * 60);
    time = days + "d " + hrs + "h " + min + "m " + sec + "s";
  }
  return time;
};

export default TimeConversion;
