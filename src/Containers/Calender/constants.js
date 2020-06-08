const weekday = [];
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

export const days = 7;

const getxAxis = () => {
  const axis = [];
  const milliSecondsInDay = 24 * 60 * 60 * 1000;
  const today = new Date().getTime();

  for (let i = 0; i < days; i++) {
    const date = new Date(today + i * milliSecondsInDay);
    axis.push({ day: weekday[date.getDay()], date: date.getDate() });
  }
  return axis;
};

const getyAxis = () => {
  const axis = [];
  const hours = 12;
  let startingTime = 8;
  let isPM = false;

  for (let i = 0; i < hours; i++) {
    const time = startingTime + i;
    if (time === 13) {
      startingTime = 1;
      isPM = true;
    }
    axis.push({
      time,
      unit: isPM ? "PM" : "AM",
    });
  }
  return axis;
};

export const xAxis = getxAxis();
export const yAxis = getyAxis();
