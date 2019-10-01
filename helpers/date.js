const getNumberWeek = date => {
  let oneJan = new Date(date.getFullYear(), 0, 1);
  numberWeek = Math.ceil(
    ((date - oneJan) / 86400000 + oneJan.getDay() + 1) / 7
  );
  return numberWeek;
};

module.exports = getNumberWeek;
