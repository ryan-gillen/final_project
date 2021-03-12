//NOT GIVEN 
let db = firebase.firestore()

//STARTER CODE
firebase.auth().onAuthStateChanged(async function(user) {


  if (user) {
    // Signed in
    console.log('signed in')

  //CODE ADDED 3.10 & 3/12 - LEVERAGED Week 7 LAB for reference

  // AK ADDED 3.12 NOT GIVEN IN STARTER CODE
  // Ensures the signed-in user is in the users collection - NOT SURE IF IT IS NEEDED 
    db.collection('users').doc(user.uid).set({
      name: user.displayName,
      email: user.email
        })

    // ADDING SIGNOUT BUTTON - AK ADDED 3.10 
    document.querySelector('.sign-in-or-sign-out').innerHTML = `
      <button class="text-blue-500 underline sign-out">Sign Out</button>
    `
    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })

    // Listen for the form submit and create/render the new post - ADDED AK 3.12
     document.querySelector('form').addEventListener('submit', async function(event) {
      event.preventDefault()
      let description = document.querySelector('#description').value
      let link = document.querySelector('#link').value
      let image = document.querySelector('#image').value
      let submitter = document.querySelector('#submitter').value
      let numberupvotes = 0
      let numberdownvotes = 0
      let docRef = await db.collection('ideas').add({ 
        ideadescription: description, 
        idealink: link, 
        ideaimage: image,
        ideasubmitter: submitter,
        upvotes: 0,
        downvotes: 0, 
        created: firebase.firestore.FieldValue.serverTimestamp()
      })

    //newly created documents - ADDED AK 3.12
      letideaID = docRef.id 
      renderIdea(ideaId, description, link, image, submitter, numberupvotes, numberdownvotes)
    })

  //Render ideas when the page it loaded - ADDED AK 3.12
  let querySelector = await db.collection('ideas').orderBy('created').get()











// STARTER CODE 

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
