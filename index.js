/* Your Code Here */
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}


function createEmployeeRecords(arrayofArrays){
    return arrayofArrays.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp){
    const [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10)
  });
    return this;
}

function createTimeOutEvent(dateStamp){
    const [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10)
  });
    return this;
}

function hoursWorkedOnDate(date){
  const timeIn = this.timeInEvents.find(e => e.date === date);
  const timeOut = this.timeOutEvents.find(e => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date){
   const wages = hoursWorkedOnDate.call(this, date) * this.payPerHour;
   return Number(wages);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(rec => rec.firstName === firstName);
}

function calculatePayroll(records){
    const totalPayroll = records.reduce((sum, rec) => {
    return sum + allWagesFor.call(rec);
  }, 0);

    return Number(totalPayroll);
}
