import getUserLocation from './getUserLocation.js';

export function checkin() {
  getUserLocation().then(object => {
    // Send the location to the server
    let url = "./api/checkin.php";
    let data = new FormData();
    data.append('lat', object.lat);
    data.append('lon', object.lon);
    data.append('checkin', true);
    fetch(url, {
      method: 'POST',
      body: data
    }).then(response => response.json())
      .then(json => {
        if (json.success) {
          // Change the innerText of the #checkin-bar element
          document.querySelector('#checkin-bar').innerText = `You've checked in ${json.location}`;
        }
      });
  }).catch(error => {
    console.error("Error getting user location:", error);
  });
}

export default checkin;