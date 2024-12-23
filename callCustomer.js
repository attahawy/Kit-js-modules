export default function callCustomer(phone) {
 //region handle calling customer on phone
 const agentButtons = document.querySelectorAll('.agent-btn');
 agentButtons.forEach(button => {
  button.addEventListener('click', function () {
   const agent = this.getAttribute('data-agent-id');
   const url = `https://fayyad-group.primasoft-eg.com/c2c.php?agent=${agent}&phone=${phone}&accessKey=accessKey123`;
   window.open(url, '_blank');
  });
 });
 //endregion handle calling customer on phone
}