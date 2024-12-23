export default function formatMysqlDatetime(mysqlDatetime) {
  // Convert the MySQL datetime to a JavaScript Date object
  let date = new Date(mysqlDatetime);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    // The date is not valid
    return mysqlDatetime;
  }

  const options = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  let language = 'ar'

  // if (language === 'en') {
  //   language = 'en-GB';
  // } else if (language === 'ar') {
  //   language = 'ar';
  // }

  // Use Intl.DateTimeFormat to format the date and time
  return new Intl.DateTimeFormat(language, options).format(date);
}
