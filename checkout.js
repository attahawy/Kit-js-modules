function checkout() {
 // Send the checkout signal to the server
 let url = "./api/checkin.php";
 let data = new FormData();
 data.append('checkout', true);
 fetch(url, {
  method: 'POST',
  body: data
 }).then(response => response.json())
  .then(json => {
   if (json.success) {
    // Change the innerText of the #checkin-bar element
    document.querySelector('#checkin-bar').innerText = `You've checked out`;
   }
  });
}

export default checkout;