import formatMysqlDatetime from './dateFormat.js';

export default function initializeHistoryButtons() {
        //region fetch history of project, generate table rows and append them to the previously empty row
    document.querySelectorAll('.historyButton').forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.dataset.projectId;
            fetch(`api/getHistory.php?id=${projectId}`)
                .then(response => response.json())
                .then(data => {
                    let tableBody = document.querySelector(`#project-${projectId} tbody`);
                    let tableRows = '';
                    data.forEach(item => {
                        tableRows += `<tr><td colspan="3">${item.user} ${item.action}</td><td>${formatMysqlDatetime(item.time)}</td></tr>`;
                    });
                    tableBody.insertAdjacentHTML('beforeend', tableRows);

                    // Create a new h3 element
                    let h3 = document.createElement('h3');
                    h3.textContent = 'Project history';

                    // Replace the button with the h3 element
                    this.parentNode.replaceChild(h3, this);
                })
                .catch(error => console.error('Error:', error));
        });
    });
    //endregion fetch history of project, generate table rows and append them to the previously empty row
}
