function getUserLocation() {
 return new Promise((resolve, reject) => {
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    return resolve({ lat, lon });
   }, function(error) {
    reject("Error occurred. Error code: " + error.code);
    // error.code can be:
    // 0: unknown error
    // 1: permission denied
    // 2: position unavailable (error response from location provider)
    // 3: timed out
   });
  } else {
   reject("Geolocation is not supported by this browser.");
  }
 });
}

export default getUserLocation;