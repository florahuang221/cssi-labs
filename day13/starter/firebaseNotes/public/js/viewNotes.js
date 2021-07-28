let googleUserId;
let editedNoteId;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      getNotes(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html'; 
    };
  });
};

const getNotes = (userId) => {
  const notesRef = firebase.database().ref(`users/${userId}`);
  notesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    renderDataAsHtml(data);
  });
};

const renderDataAsHtml = (data) => {
  let cards = ``;
  for(const noteItem in data) {
    const note = data[noteItem];
    // For each note create an HTML card
    // and like only display if it's not archived 
    if(note.archive === true)
    {
        //we don't want to display
    }
    else
    {
        //display
        cards += createCard(note, noteItem)
    }
    console.log(noteItem);
  };
  // Inject our string of HTML into our viewNotes.html page
  document.querySelector('#app').innerHTML = cards;
};

const createCard = (note, noteId) => {
    return `
        <div class="column is-one-quarter">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">${note.title}</p>
                </header>
                <div class="card-content">
                    <div class="content">${note.text}</div>
                </div>
                <footer class="card-footer">
                    <a id="${noteId}" href="#" class="card-footer-item"
                        onclick="deleteNote('${noteId}')">
                        Delete
                    </a>
                    <a id="${noteId}" class="card-footer-item" 
                        onclick="editNote('${noteId}')">
                        Edit
                    </a>
                    <a id="${noteId}" class="card-footer-item" 
                        onclick="archiveNote('${noteId}')">
                        Archive
                    </a>
                </footer>
            </div>
        </div>`
    ;
};

const deleteNote = (noteId) => {
    if (confirm("Are you sure you want to delete?")) {
        firebase.database().ref(`users/${googleUserId}/${noteId}`).remove();
    } else {

    }
}

const editNote = (noteId) => {
    const editNoteModal = document.querySelector('#editNoteModal');
    const notesRef = firebase.database().ref(`users/${googleUserId}/${noteId}`);

    editedNoteId = noteId;    
    
    notesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        //const noteDetails = data[noteId];
        document.querySelector('#editTitleInput').value = data.title;
        document.querySelector('#editTextInput').value = data.text;
    });
    
    editNoteModal.classList.toggle('is-active');
}    

const closeEditModal = () => {
    const editNoteModal = document.querySelector('#editNoteModal');
    editNoteModal.classList.toggle('is-active');
};

const saveEditedNote = () => {
    //const saveEditBtn = document.querySelector('#saveEdit');
    //saveEditBtn.onclick = handleSaveEdit.bind(this, noteId);

    const newTitle = document.querySelector("#editTitleInput").value;
    const newNote = document.querySelector("#editTextInput").value;

    firebase.database().ref(`users/${googleUserId}/${editedNoteId}`)
        .update({
            title: newTitle,
            text: newNote
        })

    closeEditModal();
};

const archiveNote = (noteId) => {
    editedNoteId = noteId;    

    firebase.database().ref(`users/${googleUserId}/${editedNoteId}`)
        .update({
            title: "title",
            text: "text",
            archive: true
        })


    /*firebase.database().ref(`users/${googleUserId}/${noteId}`)
        .update({
            title: note.title,
            text: note.text,
            archive: true //creates a new idk lol tag or something
        })
    */
    //go back to original window? ie: back to the create notes page? oh alr yeah 
    //oh i was thinking that when we like display the cards we just don't display archived notes
};
