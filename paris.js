// let db = firebase.firestore()


firebase.auth().onAuthStateChanged(async function(user) {
  //console.log (user.displayName)

  if (user) {
    // Signed in
    console.log('signed in')

   


    // Sign-out button
    document.querySelector('.sign-in-or-sign-out').innerHTML = `
      <button class="text-pink-500 underline sign-out w-1/3 m-8 text-right">Sign Out</button>
    `
    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })


 

    


      document.querySelector('form').addEventListener('submit', async function(event) {
        console.log("clicked")
        event.preventDefault()
        let postUsername = user.displayName
        let postDescription = document.querySelector('#description').value
        let postLink = document.querySelector('#link').value
        let postImageUrl = document.querySelector('#image-url').value
        let postDestination = 'Paris'

        let response = await fetch('/.netlify/functions/create_post', {
          method: 'POST',
          body: JSON.stringify({
            userId: user.uid,
            username: postUsername,
            description: postDescription,
            url: postLink,
            imageUrl: postImageUrl,
            destinationPoint: postDestination
          })
        })
  
        let post = await response.json()
        document.querySelector('#description').value = '' 
        document.querySelector('#link').value = '' 
        document.querySelector('#image-url').value = '' 
  
        renderPost(post)
      })


    

    

    
    
   

    console.log('tyring to get destinationValue')
    let destinationValue = document.querySelector('#Paris')
    let attribute = destinationValue.getAttribute('id')  
    console.log(attribute)

 

    let response = await fetch('/.netlify/functions/get_posts', {
      method: 'POST', 
      body: JSON.stringify({
        destinationPoint: attribute

      })
    })

    let posts = await response.json()
    for (let i=0; i<posts.length; i++) {
      let post = posts[i]
      renderPost(post)
    }



  } else {
    // Signed out
    console.log('signed out')

    // Hide the form when signed-out
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








  async function renderPost(post) {
  let postId = post.id
  console.log(post.url)
  document.querySelector('.submitted').insertAdjacentHTML('beforeend', `
    <div class="post-${postId}">

    <div id="destination" class="p-2">
      <p> ${post.description} </p>
    </div>

    <div id="link" class="p-2">
      <a href = "${post.url}"> ${post.url}</a>
    </div>

    <div id="image" class="p-2">
      <img src ="${post.imageUrl}" >
    </div>

    <div id="submitter" class="p-2 italic">
      <p> ${post.username} </p>
    </div>


    
    </div>`)


  


    

  













  


  }
