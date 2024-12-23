/**
 * convert an int representing seconds to a string representing the duration in a human readable format
 */
export default function duration(seconds) {
  let duration = '';
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;
  if (hours > 0) {
    duration += `${hours}h `;
  }
  if (minutes > 0) {
    duration += `${minutes}m `;
  }
  if (remainingSeconds > 0) {
    duration += `${remainingSeconds}s`;
  }
  return duration.trim();
}
