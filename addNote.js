export default function addNote(projectId, customerId, myName, myAvatar, myID) {
 //region handle add note form
 const addNoteForm = document.querySelector('#add-note-form');
 const notesContainer = document.querySelector('#notes-container');
 const noteStatus = document.querySelector('#note-status');

 addNoteForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const noteText = document.querySelector('#note-text').value.trim();
  if (!noteText) return;

  try {
   const response = await fetch('api/notes/note.php', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     action: 'add',
     object_id: projectId,
     object_type: 'project',
     note: noteText,
     customer_id: customerId
    })
   });

   // Log the raw response text
   const responseText = await response.text();
   console.log(responseText);

   // Parse the response text as JSON
   const data = JSON.parse(responseText);

   if (data.success) {
    // Create new note element
    const noteElement = document.createElement('div');
    noteElement.className = 'note border rounded mb-2';
    noteElement.id = `note-${data.note_id}`;

    // Get current user data
    const userName = myName;
    const userAvatar = myAvatar;
    const userId = myID;

    let noteTextFormatted = noteText.replace(/\n/g, '<br>');

    noteElement.innerHTML = `
                <div class="card-body" dir="auto">
                    <p class="mt-3">${noteTextFormatted}</p>
                </div>
                <div class="card-footer">
                    <div class="d-flex align-items-start">
                        <a href="user?id=${userId}">
                            <img class="me-3 avatar-sm rounded-circle" src="${userAvatar}" alt="${userName}">
                        </a>
                        <div class="w-100 overflow-hidden">
                            <h4 class="my-0">
                                <a href="user?id=${userId}">${userName}</a>
                            </h4>
                            <span class="small">
                                <span datetime="true">Just now</span>
                                <a href="#" data-bs-toggle="modal" data-bs-target="#editNote${data.note_id}"><i class="fa-solid fa-pencil"></i></a>
                            </span>
                        </div>
                    </div>
                </div>
                <form method="post">
                    <input type="hidden" name="note_id" value="${data.note_id}">
                    <div id="editNote${data.note_id}" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="editNote${data.note_id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Edit Note</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                                </div>
                                <div class="modal-body">
                                    <textarea name="editnote" dir="auto" class="form-control" rows="10">${noteText}</textarea>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#delete-note-confirm-${data.note_id}" class="btn btn-danger">Delete</button>
                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" tabindex="-1" role="dialog" id="delete-note-confirm-${data.note_id}" aria-labelledby="delete-note-confirm-${data.note_id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header bg-danger text-white">
                                    <h4 class="modal-title">Delete this note?</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                                </div>
                                <div class="modal-body">
                                    ${noteText}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                                    <a href="project?id=${projectId}&delete_note=${data.note_id}" class="btn btn-danger">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            `;

    // Insert the new note at the top of the notes container
    notesContainer.insertBefore(noteElement, notesContainer.firstChild);

    // Clear form and show success message
    addNoteForm.reset();
    noteStatus.textContent = 'Note added successfully';
    noteStatus.className = 'text-success ms-2';

    // Clear success message after 3 seconds
    setTimeout(() => {
     noteStatus.textContent = '';
    }, 3000);

   } else {
    throw new Error(data.error || 'Failed to add note');
   }
  } catch (error) {
   console.error('Error:', error);
   console.error('Full error details:', error.stack);
   noteStatus.textContent = error.message;
   noteStatus.className = 'text-danger ms-2';
  }
 });
 //endregion handle add note form
}