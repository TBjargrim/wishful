let testDateString = '2015-10-14';
export function changedDate(date) {
  function getTheDay(date) {
    return date.slice(8, 10);
  }

  function getMonth(date) {
    let months = [
      'Januari',
      'Februari',
      'Mars',
      'April',
      'Maj',
      'Juni',
      'Juli',
      'Augusti',
      'September',
      'Oktober',
      'November',
      'December',
    ];

    let splitDate = date.split('-');
    let getMonth = splitDate[1];
    if (getMonth && getMonth.slice(0, 1) == 0) {
      let noZero = getMonth.slice(1, 2);
      let getOneLessNumber = (noZero -= 1);
      return months[getOneLessNumber];
    } else if (getMonth && getMonth.slice(0, 1) == 1) {
      let getOneLessNumber = (getMonth -= 1);
      return months[getOneLessNumber];
    } else {
      return 'not a date!';
    }
  }

  return getTheDay(date) + ' ' + getMonth(date);
}

// console.log(birthdate)

// const testDate = '1993-02-07';
// console.log(testDate.split('-'))

// const event = new Date(Date.UTC(2022, 10, 1));
// let options = {  year: 'numeric', month: 'long', day: 'numeric' };
// console.log(event.toLocaleString('sv-SE'));

export const saveLocalStorage = async (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
