// let db = firebase.firestore()


firebase.auth().onAuthStateChanged(async function(user) {
  //console.log (user.displayName)

  if (user) {
    // Signed in
    console.log('signed in')

    // db.collection('users').doc(user.uid).set({
    //   name: user.displayName,
    //   email: user.email
    // })


    // Sign-out button
    document.querySelector('.sign-in-or-sign-out').innerHTML = `
      <button class="text-pink-500 underline sign-out w-1/3 m-8 text-right">Sign Out</button>
    `
    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })


 

      // Listen for the form submit and create/render the new post

      //let destinationValue = document.querySelector('.destinationPoint').value

      //let destinationValue = document.getElementsByClassName('.destinationPoint')[0].value

      //let destinationValue = document.querySelector('.destinationPoint').getAttribute('destinationPoint')


      document.querySelector('form').addEventListener('submit', async function(event) {
        console.log("clicked")
        event.preventDefault()
        let postUsername = user.displayName
        let postDescription = document.querySelector('#description').value
        let postLink = document.querySelector('#link').value
        let postImageUrl = document.querySelector('#image-url').value
        let postDestination = 'Puerto-Escondido'

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
        document.querySelector('#image-url').value = '' // clear the image url field
  
        renderPost(post)
      })


    //FROM KELLOGRAM - MADE NO UPDATES 

    

    
    
    // let destinationValue = document.querySelector('.destinationPoint').value
    // console.log(destinationValue)

    console.log('tyring to get destinationValue')
    let destinationValue = document.querySelector('#Puerto-Escondido')
    let attribute = destinationValue.getAttribute('id')  
    console.log(attribute)

    //if(attribute == 'Puerto-Escondido') {}

    let response = await fetch('/.netlify/functions/get_posts')
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


//THIS IS THE COPY FROM KELLOGRAM FOR REFERENCE 
//ATTEMPTED TO RECREATE THIS CODE BELOW -AK

// async function renderPost(post) {
//   let postId = post.id
//   document.querySelector('.posts').insertAdjacentHTML('beforeend', `
//     <div class="post-${postId} md:mt-16 mt-8 space-y-8">
//       <div class="md:mx-0 mx-4">
//         <span class="font-bold text-xl">${post.username}</span>
//       </div>

//       <div>
//         <img src="${post.imageUrl}" class="w-full">
//       </div>

//       <div class="text-3xl md:mx-0 mx-4">
//         <button class="like-button">❤️</button>
//         <span class="likes">${post.likes}</span>
//       </div>

//       <div class="comments text-sm md:mx-0 mx-4 space-y-2">
//         ${renderComments(post.comments)}
//       </div>

//       <div class="w-full md:mx-0 mx-4">
//         ${renderCommentForm()}
//       </div>
//     </div>
//   `)


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


    // <div class="tripvote p-2">
    // <form>
    //   <button> 👍 </button> ${post.likes} <button> 👎  </button> ${post.unlikes}
    // </form>
    // </div>


    

  //RG (3/15/21): 

//180-223
//   // listen for the like button on this post
//   let likeButton = document.querySelector(`.post-${postId} .like-button`)
//   likeButton.addEventListener('click', async function(event) {
//     event.preventDefault()
//     console.log(`post ${postId} like button clicked!`)
//     let currentUserId = firebase.auth().currentUser.uid

//     let response = await fetch('/.netlify/functions/like', {
//       method: 'POST',
//       body: JSON.stringify({
//         postId: postId,
//         userId: currentUserId
//       })
//     })
//     if (response.ok) {
//       let existingNumberOfLikes = document.querySelector(`.post-${postId} .likes`).innerHTML
//       let newNumberOfLikes = parseInt(existingNumberOfLikes) + 1
//       document.querySelector(`.post-${postId} .likes`).innerHTML = newNumberOfLikes
//     }
//   })

// //listen for unlike button on post 
//   let unlikeButton = document.querySelector(`.posts-${postId} .unlike-button`)
//   unlikeButton.addEventListener('click', async function(event) {
//     event.preventDefault()
//     console.log(`post ${postId} like button clicked!`)
//     let currentUserId = firebase.auth().currentUser.uid


//     let response = await fetch('/.netlify/functions/like', {
//       method: 'POST',
//       body: JSON.stringify({
//         postId: postId,
//         userId: currentUserId
//       })

//     })
//     if (response.ok) {
//       let existingNumberOfUnLikes = document.querySelector(`.post-${postId} .unlikes`).innerHTML
//       let newNumberOfUnLikes = parseInt(existingNumberOfUnLikes) + 1
//       document.querySelector(`.post-${postId} .unlikes`).innerHTML = newNumberOfUnLikes
//     }
//   })


//Reference from Kelloogram on listen for the like button on this post

  // // listen for the like button on this post
  // let likeButton = document.querySelector(`.post-${postId} .like-button`)
  // likeButton.addEventListener('click', async function(event) {
  //   event.preventDefault()
  //   console.log(`post ${postId} like button clicked!`)
  //   let currentUserId = firebase.auth().currentUser.uid

  //   let response = await fetch('/.netlify/functions/like', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       postId: postId,
  //       userId: currentUserId
  //     })
  //   })
  //   if (response.ok) {
  //     let existingNumberOfLikes = document.querySelector(`.post-${postId} .likes`).innerHTML
  //     let newNumberOfLikes = parseInt(existingNumberOfLikes) + 1
  //     document.querySelector(`.post-${postId} .likes`).innerHTML = newNumberOfLikes
  //   }
  // })


  }
