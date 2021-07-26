const googleSignIn = () => {
    console.log("calling google sign-in!");
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(result => {
            //do something with result
            console.log(`Result is ${result}`);
            const credential = result.credential;
            const token = credential.accessToken;

            const user = result.user;
            window.location = 'writeNote.html';

            console.log(user.uid);
        })
        .catch(error => {
            //something bad happens
            console.log(error);
        });
}

const signIn = () => {
    console.log("calling sign-in!");

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)

    .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
    });

    }