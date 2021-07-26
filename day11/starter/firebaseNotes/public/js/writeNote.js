let googleUser, userId;

window.onload = () => {
    firebase.auth()
        .onAuthStateChanged(user => {
            if(user){
                console.log(`Logged in as: ${user.displayName}`);
                document.getElementById("welcome").innerHTML = `Welcome, ${user.displayName}. `;
                const googleUser = user;

                const userId = googleUser.uid;
            }
            else{
                window.location = 'index.html';
            }
        });
}

const submitNote = () => {
    const note = document.querySelector("#noteText").value;
    const title = document.querySelector("#noteTitle").value;
    const label = document.querySelector("#noteLabel").value;

    firebase.database().ref(`users/${userId}`).push({
        title: title,
        label: label,
        note: note,
        created: Date.now()
    })
    .then(() => {
        //tell user note is stored
        window.alert("Submitted!");
        document.querySelector("#noteText").value = "";
        document.querySelector("#noteTitle").value = "";
        document.querySelector("#noteLabel").value = "";
    })
    .catch(error => {
        console.log(error);
    })
};