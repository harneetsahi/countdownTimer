const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const deadline = document.querySelector(".deadline");
const giveaway = document.querySelector(".giveaway");
const items = document.querySelectorAll(".deadline-format h4");

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// expiration date and time for the offer
// date format is: year month day hour min sec
// Note: month starts from index 0 so 6th month means july

// let futureDate = new Date(2024, 6, 23, 23, 59, 59); // hard-coded so we create a new one below

const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 23, 59, 59); /// this will keep adding 10 days to keep this project running forever

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const seconds = futureDate.getSeconds();
const date = futureDate.getDate();

let month = futureDate.getMonth();
month = months[month];

let days = futureDate.getDay();
days = weekdays[days];

giveaway.textContent = `
giveaway ends on ${days}, ${date} ${month} ${year} ${hours}:${minutes}:${seconds}
`;

// future time in miliseconds
const futureTime = futureDate.getTime();
console.log(futureTime);

// timer
function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;

  //// milisecond values: 24 hours, 60 mins, 60 seconds, 1000 ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  let days = t / oneDay;
  days = Math.floor(days);

  let hours = Math.floor((t % oneDay) / oneHour);

  let minutes = Math.floor((t % oneHour) / oneMinute);

  let seconds = Math.floor((t % oneMinute) / 1000);

  /// set values
  const values = [days, hours, minutes, seconds];

  // adds 0 before the number if it's less than 10
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });

  // when time expires, the html should change
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `
    <h4 class='expired'>sorry, this giveaway  has expired</h4>
    `;
  }
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
