//let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {


  if (user) {
    // Signed in
    console.log('signed in')

    // RG: Ensure the signed-in user is in the users collection (not sure if we'll need this in the end?)
    db.collection('users').doc(user.uid).set({
      name: user.displayName,
      email: user.email
    })

    // ADDING SIGNOUT BUTTON - AK ADDED 3.10 (NOT GIVEN IN STARTER CODE)
    document.querySelector('.sign-in-or-sign-out').innerHTML = `
      <button class="text-blue-500 underline sign-out">Sign Out</button>
    `
    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })















  } else {
    // Signed out
    console.log('signed out')

    //HIDE FROM WHEN SIGNED-OUT- AK ADDED 3.10 (NOT GIVEN IN STARTER CODE)
    document.querySelector('form').classList.add('hidden')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())
    //console.log ('firebase new auth success')

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }
    //console.log ('firebase auth config sucess')
    

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
    console.log ('start firebaseUI auth success')

  }
})
