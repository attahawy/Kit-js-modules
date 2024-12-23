import formatMysqlDatetime from './dateFormat.js';

export default function orderInstallationVisit() {
 //region handle order installation visit form
 const orderForm = document.querySelector('#orderInstallationVisitForm');
 if (orderForm) {
  orderForm.addEventListener('submit', async function (e) {
   e.preventDefault();
   const orderStatus = document.querySelector('#orderStatus');

   try {
    const formData = new FormData(this);
    const response = await fetch('api/installations/order_installation_visit.php', {
     method: 'POST',
     body: formData
    });

    const responseText = await response.text();
    const data = JSON.parse(responseText);

    if (data.success === true) {
     // Format the notes and date
     const notes = data.notes.replace(/\n/g, '<br>');

     // Create new table HTML
     const newTableHtml = `
                        <table class="table border border-5">
                            <tbody>
                                <tr>
                                    <td><span data-date-process>${formatMysqlDatetime(data.set_at)}</span></td>
                                    <td><span class="badge bg-info">${data.status}</span></td>   <td>${data.team}</td>
                                    <td><a href="installation_visit?id=${data.visit_id}">View Details</a></td>
                                </tr>
                                <tr>
                                <td>${data.reason}</td>
                                <td colspan="3"></td>
                                </tr>
                            </tbody>
                        </table>
                    `;

     // Check if container exists, if not create it
     let visitsTables = document.querySelector('#installationVisitsTables');
     if (!visitsTables) {
      visitsTables = document.createElement('div');
      visitsTables.id = 'installationVisitsTables';
      // Find the parent element where we should insert the container
      const parentElement = document.querySelector('#installation .card-body');
      if (parentElement) {
       // Remove "No installation visits" message if it exists
       const noVisitsMessage = parentElement.querySelector('p');
       if (noVisitsMessage && noVisitsMessage.textContent.includes('No installation visits')) {
        noVisitsMessage.remove();
       }
       parentElement.appendChild(visitsTables);
      }
     }

     // Create wrapper for new table
     const tableWrapper = document.createElement('div');
     tableWrapper.className = 'table-responsive mb-2';
     tableWrapper.innerHTML = newTableHtml;

     // Add the new table to the container
     visitsTables.insertBefore(tableWrapper, visitsTables.firstChild);

     // Update status and reset form
     orderStatus.className = 'alert alert-success mt-3';
     orderStatus.textContent = data.message;
     this.reset();
    } else {
     throw new Error(data.error || 'Failed to order installation visit');
    }
   } catch (error) {
    console.error('Error:', error);
    orderStatus.className = 'alert alert-danger';
    orderStatus.textContent = error.message;
   }
  });
 }
 //endregion handle order installation visit form 
}