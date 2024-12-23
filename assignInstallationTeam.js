export default function assignInstallationTeam() {
 //region assign installation team
 const assignInstallationTeamForm = document.querySelector('#assignInstallationTeamForm');
 if (assignInstallationTeamForm) {
  assignInstallationTeamForm.addEventListener('submit', function (e) {
   e.preventDefault();
   const formData = new FormData(assignInstallationTeamForm);
   fetch('api/installations/assign_installation_team.php', {
    method: 'POST',
    body: formData
   })
    .then(response => response.json())
    .then(data => {
     const assignMessage = document.querySelector('#assignMessage');
     if (assignMessage) {
      assignMessage.textContent = data.message;
     }
     if (data.success) {
      // reload the page
      location.reload();
     }
    })
    .catch(error => {
     console.error('Error:', error);
    });
  });
 }
 //endregion assign installation team
}