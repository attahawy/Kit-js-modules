import formatMysqlDatetime from "./dateFormat.js";

function updateNotifications() {
 fetch('api/newNotifications.php')
   .then(response => response.json())
   .then(data => {
     let notificationList = document.querySelector('#topBarNotifications');
     notificationList.innerHTML = ''; // Clear the current list
     data.forEach(notification => {
       let listItem = document.createElement('a');
       listItem.href = `${notification.object_type}?id=${notification.object_id}`;
       listItem.classList.add('dropdown-item', 'p-0', 'notify-item', 'card', 'unread-noti', 'text-wrap', 'shadow-none', 'mb-2', 'p-2');
       listItem.innerHTML = `${notification.text} <br><span class="small text-uppercase text-muted">${formatMysqlDatetime(notification.time)}</span>`;
       notificationList.appendChild(listItem);
     });

     // Show the badge if the list of notifications isn't empty
     let badge = document.querySelector('#notifications-badge');
     if (data.length > 0) {
       badge.style.display = 'block';
     } else {
       badge.style.display = 'none';
     }
   })
   .catch(error => console.error('Error:', error));
}

export default updateNotifications;