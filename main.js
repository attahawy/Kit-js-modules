
import formatMysqlDatetime from './dateFormat.js';
import updateNotifications from './notifications.js';

// Format the datetime for each element with the 'datetime' attribute set to 'true'
document.querySelectorAll('[datetime="true"]').forEach((element) => {
let mysqlDatetime = element.textContent;
let formattedDatetime = formatMysqlDatetime(mysqlDatetime);
element.textContent = formattedDatetime;
});

// Format the date only without time for each element with the 'data-date' attribute set to 'true'
document.querySelectorAll('[data-date="true"]').forEach((element) => {
  let mysqlDatetime = element.textContent;
  let formattedDate;
  try {
    formattedDate = new Date(mysqlDatetime).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  } catch (e) {
    formattedDate = new Date(mysqlDatetime).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
  element.textContent = formattedDate;
});




// Update notifications on page load and every 7 seconds, on the bell icon is in the top bar
document.addEventListener('DOMContentLoaded', function() {
// Fetch and update notifications on page load
updateNotifications();
// then update notifications every 7 seconds
setInterval(updateNotifications, 7000);
});

  // convert a number representing seconds to a human readable format
  // number is contained in a span with class 'duration'
  // ignore hours, just show minutes and seconds with leading zeros
  // if no value is provided, show 00:00
  document.querySelectorAll('.duration').forEach(function(duration) {
    var seconds = parseInt(duration.innerText);
    if (isNaN(seconds)) {
      duration.innerText = '00:00';
      return;
    }
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    duration.innerText = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  });
