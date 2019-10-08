const schedule = require("node-schedule");

const setScheduleHour = hour => {
  let j = schedule.scheduleJob(hour + " * * *", () => {
    console.log("I work every day");
  });
};

const setScheduleMinutes = minutes => {
  let j = schedule.scheduleJob(minutes + "* * * *", () => {
    console.log("I work every hour");
  });
};

const setScheduleSeconds = seconds => {
  let j = schedule.scheduleJob(seconds + "* * * * *", () => {
    console.log("I work every minute");
  });
};

module.exports = { setScheduleHour, setScheduleMinutes, setScheduleSeconds };
