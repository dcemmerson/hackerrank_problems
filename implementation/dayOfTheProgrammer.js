function dayOfProgrammer(year) {
  if(year < 1918) {
    return calcDayOfProgrammerJulian(year);
  }
  else if(year > 1918) {
    return calcDayOfProgrammerGregorian(year);
  }
  else {
    return '26.09.1918';
  }
}

function calcDayOfProgrammerGregorian(year) {
  if(year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
    return `12.09.${year}`;
  }
  else {
    return `13.09.${year}`;
  }
}

function calcDayOfProgrammerJulian(year) {
  if(year % 4 === 0) {
    return `12.09.${year}`;
  }
  else {
    return `13.09.${year}`;
  }
}

console.log(dayOfProgrammer(2017));
console.log(dayOfProgrammer(2016));
console.log(dayOfProgrammer(1800));
