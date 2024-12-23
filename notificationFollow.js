export default function initializeNotificationFollow(projectId) {
//region follow/unfollow notifications for this project
    document.querySelector('#bell-icon').addEventListener('click', function() {
        fetch('./api/notifications/follow.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    project_id: projectId
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Toggle bell icon color
                    this.classList.toggle('text-success');
                    this.classList.toggle('text-danger');
                    const followStatus = document.querySelector('#followStatus');
                    followStatus.innerText = data.message;
                }
            })
            .catch(error => console.error('Error:', error));
    });
    //endregion follow/unfollow notifications for this project
}