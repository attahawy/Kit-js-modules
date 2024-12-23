/**
 * Copy phone number to clipboard
 * @module copyPhoneNumber
 * @link project.php
 */
export default function copyPhoneNumber() {
     //region copy phone number to clipboard
    const copyButtons = document.querySelectorAll(".copyButton");

    copyButtons.forEach(button => {
        const copyMessage = button.nextElementSibling;
        const textToCopy = button.getAttribute('data-phone');

        button.addEventListener('click', function() {
            copyToClipboard(textToCopy, copyMessage, button);
        });
    });

    function copyToClipboard(text, messageElement, buttonElement) {
        navigator.clipboard.writeText(text).then(() => {
            messageElement.innerHTML = "Phone number copied.";
            buttonElement.style.display = "none";
            setTimeout(function() {
                messageElement.innerHTML = "";
                buttonElement.style.display = "inline";
            }, 1000);
        }).catch(err => {
            messageElement.innerHTML = "Failed to copy!";
            console.error('Could not copy text: ', err);
        });
    }
//endregion copy number to clipboard
}