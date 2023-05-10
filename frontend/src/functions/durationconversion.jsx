const DurationConversion = (duration) => {
  let time = "";
  let days = 0;
  let hrs = 0;
  let min = 0;
  let sec = 0;

  if (duration.toString().length < 3) {
    if (duration === 60) {
      time = 1 + "m";
    } else {
      time = (duration % 60) + "s";
    }
  } else if (duration.toString().length === 3) {
    time = Math.floor(duration / 60).toFixed() + "m " + (duration % 60) + "s";
  } else if (duration.toString().length === 4 && duration < 3600) {
    time = Math.floor(duration / 60).toFixed() + "m " + (duration % 60) + "s";
  } else if (duration.toString().length === 4 && duration >= 3600) {
    hrs = Math.floor(duration / 60 / 60).toFixed();
    min = Math.floor((duration / 60) % 60);
    sec = Math.ceil((((duration / 60) % 60) % min) * 60);
    let type = isNaN(sec);
    if (!isNaN(sec)) {
      time = hrs + "h " + min + "m " + 0 + "s";
    } else {
    }
    time = hrs + "h " + min + "m " + sec + "s";
  } else {
    days = Math.floor(duration / 60 / 60 / 24);
    hrs = Math.floor(duration / 60 / 60 - 24).toFixed();
    min = Math.floor((duration / 60) % 60);
    sec = Math.ceil((((duration / 60) % 60) % min) * 60);
    time = days + "d " + hrs + "h " + min + "m " + sec + "s";
  }
  return time;
};

export default DurationConversion;
