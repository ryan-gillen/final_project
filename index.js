//NOT GIVEN IN STARTER CODE
let db = firebase.firestore()

//STARTER CODE
firebase.auth().onAuthStateChanged(async function(user) {


  if (user) {
    // Signed in
    console.log('signed in')


//CODE ADDED 3.10 & 3/12 - LEVERAGED WEEK 7 LAB for reference
//NOT GIVEN IN STARTER CODE

  // AK ADDED 3.12 
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
  let posts = querySnapshot.docs
  for (let i=0; i<ideas.length; i++) {
    let ideaId = ideas[i].id
    let ideaData = ideas[i].data()
    let description = ideaData.description
    let link = ideaData.link
    let image = ideaData.image
    let submitter = ideaData.submitter
    let numberupvotes = ideaData.upvotes
    let numberdownvotes = ideaData.downvotes
    renderIdea(ideaId, description, link, image, submitter, numberupvotes, numberdownvotes)

  }


// STARTER CODE 

  } else {
    // Signed out
    console.log('signed out')

    //HIDE FROM WHEN SIGNED-OUT- AK ADDED 3.10 
    //NOT GIVEN IN STARTER CODE)
    document.querySelector('form').classList.add('hidden')

  //STATER CODE 

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

//NOT GIVEN IN STARTER CODE - 3/12 AK - NEED TO PLAY AROUND WITH THIS MORE 
//how do we show the right description, link, image, smubittor,vote - do we link to the ID??? 
//For EXAMPLE - ${ideaID}-${description} ??

async function renderIdea(ideaId, description, link, image, submitter, numberupvotes, numberdownvotes) {
  document.querySelector('.Submitted').insertAdjacentHTML('beforeend', `
  <div id="description" class="p-2">
  <p>$${description}</p>
</div>

<div id="link" class="p-2">
  <a href>${link}</a>
</div>

<div id="image" class="p-2">
  <img src = ${image}> 
</div>

<div id="submitter" class="p-2 italic">
  <p>${submitter}</p>
</div>

<div class="tripvote p-2">
  <form>
      <button> 👍  </button> <a id="${numberupvotes}">  </a><button> 👎  </button><a id="${numberdownvotes}"> </a>
  </form>
</div>`
  )


//   document.querySelector(`.post-${postId} .like-button`).addEventListener('click', async function(event) {
//     event.preventDefault()
//     console.log(`post ${postId} like button clicked!`)
//     let existingNumberOfLikes = document.querySelector(`.post-${postId} .likes`).innerHTML
//     let newNumberOfLikes = parseInt(existingNumberOfLikes) + 1
//     document.querySelector(`.post-${postId} .likes`).innerHTML = newNumberOfLikes
//     await db.collection('posts').doc(postId).update({
//       likes: firebase.firestore.FieldValue.increment(1)
//     })
//   })

  }
