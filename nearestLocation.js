import getUserLocation from './getUserLocation.js';

const locations = {
 'Park Mall': {lat: 30.0444, lon: 31.2357},
 'The Silver Star Mall': {lat: 30.033333, lon: 31.233334},
 'Twin Tower Mall': {lat: 30.045876, lon: 31.224466},
 'Hurghada': {lat: 27.257896, lon: 33.811607},
 'Factory': {lat: 30.050498, lon: 31.233702},
 'Head Office': {lat: 30.044281, lon: 31.340002},
 'Call Center': {lat: 30.050498, lon: 31.233702},
 'Samy Studio': {lat: 30.84779520, lon: 32.31252480},
};

function distance(lat1, lon1, lat2, lon2) {
 var theta = lon1 - lon2;
 var dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
 dist = Math.acos(dist);
 dist = rad2deg(dist);
 var miles = dist * 60 * 1.1515;
 return (miles * 1.609344 * 1000);
}

function deg2rad(deg) {
 return (deg * Math.PI / 180);
}

function rad2deg(rad) {
 return (rad * 180 / Math.PI);
}

const object = await getUserLocation();
   let checkin = {
     lat: object.lat,
     lon: object.lon
   };

   let nearestLocation = 'Unknown Location';
   let minDistance = Infinity;

   for (let locationName in locations) {
     let dist = distance(checkin.lat, checkin.lon, locations[locationName].lat, locations[locationName].lon);
     if (dist < minDistance) {
       minDistance = dist;
       nearestLocation = locationName;
     }
   }

export default nearestLocation;