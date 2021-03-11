firebase.auth().onAuthStateChanged(async function(user) {


  if (user) {
    // Signed in
    console.log('signed in')


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

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})
