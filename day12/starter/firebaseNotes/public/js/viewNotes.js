window.onload = () => {
    // when the page loads, check user logged in state
    firebase.auth().onAuthStateChanged(function(user) {
    
    // if logged in, get user notes from db   
    if (user) {
        console.log('Logged in as: ' + user.displayName);
    //  display notes on page 
        const googleUserId = user.uid;
        getNotes(googleUserId);
    } else {
        window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
    });
};

const getNotes = (userId) => {
    console.log(userId);
    const userRef = firebase.database().ref(`users/${userId}`);
    userRef.on('value', (snapshot) => {
        writeNotesToHTML(snapshot.val());
    });
};

const writeNotesToHTML = (data) => {
    const noteRenderArea = document.querySelector("#app");
    for(let noteKey in data)
    {
        //create html string for one note
        let noteHTML = createHtmlForNote(data[noteKey]);
        //append new html to earlier html
        noteRenderArea.innerHTML += noteHTML;
    }
};

//returns a string of html for one note
const createHtmlForNote = (note) => {
    //todo create elements and add to notes data
    return `<div class="column is-one-third">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            ${note.title}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            ${note.text}
                        </div>
                    </div>
                </div>
            </div>`;
};