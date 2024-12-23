export function initializeMentions(noteText, mentionsDropdown) {
    let usersList = [];

    // Fetch the list of users from the API
    fetch('api/mentions/users.php')
        .then(response => response.json())
        .then(data => {
            usersList = data;
        })
        .catch(error => console.error('Error fetching users:', error));

    noteText.addEventListener('input', function(e) {
        const cursorPosition = noteText.selectionStart;
        const text = noteText.value;
        const lastAtSymbol = text.lastIndexOf('@', cursorPosition - 1);

        if (lastAtSymbol !== -1 && (lastAtSymbol === 0 || text.charAt(lastAtSymbol - 1) === ' ')) {
            const query = text.substring(lastAtSymbol + 1, cursorPosition);
            if (query.length >= 1) {
                const matchedUsers = usersList.filter(user =>
                    user.name.toLowerCase().startsWith(query.toLowerCase())
                );
                if (matchedUsers.length > 0) {
                    displayMentionsDropdown(matchedUsers, noteText, cursorPosition, mentionsDropdown);
                } else {
                    mentionsDropdown.style.display = 'none';
                }
            } else {
                mentionsDropdown.style.display = 'none';
            }
        } else {
            mentionsDropdown.style.display = 'none';
        }
    });

    function displayMentionsDropdown(users, textarea, cursorPosition, dropdown) {
        dropdown.innerHTML = '';
        users.forEach(user => {
            const div = document.createElement('div');
            div.textContent = user.name;
            div.style.padding = '5px';
            div.style.cursor = 'pointer';
            div.addEventListener('click', function() {
                insertUserAtCaret(user.name, textarea, dropdown);
            });
            dropdown.appendChild(div);
        });

        const rect = textarea.getBoundingClientRect();
        dropdown.style.left = rect.left + window.pageXOffset + 'px';
        dropdown.style.top = rect.bottom + window.pageYOffset + 'px';
        dropdown.style.width = rect.width + 'px';
        dropdown.style.display = 'block';
    }

    function insertUserAtCaret(userName, textarea, dropdown) {
        const cursorPosition = textarea.selectionStart;
        const text = textarea.value;
        const lastAtSymbol = text.lastIndexOf('@', cursorPosition - 1);
        const textBeforeAt = text.substring(0, lastAtSymbol);
        const textAfterCursor = text.substring(cursorPosition);
        textarea.value = textBeforeAt + '@' + userName + ' ' + textAfterCursor;
        const newCursorPosition = (textBeforeAt + '@' + userName + ' ').length;
        textarea.selectionStart = textarea.selectionEnd = newCursorPosition;
        textarea.focus();
        dropdown.style.display = 'none';
    }

    // Hide dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target !== noteText && !mentionsDropdown.contains(e.target)) {
            mentionsDropdown.style.display = 'none';
        }
    });
}
