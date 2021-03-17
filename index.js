//let db = firebase.firestore()
//NEED TO REMOVE when product moves to the backend via exports handler - AK

firebase.auth().onAuthStateChanged(async function(user) {
  //console.log (user.displayName)

  if (user) {
    // Signed in
    console.log('signed in')

    // db.collection('users').doc(user.uid).set({
    //   name: user.displayName,
    //   email: user.email
    // })

    //WELCOME USER NAME (WHEN SIGNED IN) - ADDED AK
    let welcome = document.querySelector('.welcome')
    welcome.insertAdjacentHTML('beforeend',`<h class="p-10 text-gray-200 text-lg font-monospace"> Hey ${user.displayName}!</h>`)

    // Sign-out button
    document.querySelector('.sign-in-or-sign-out').innerHTML = `
      <button class="text-pink-500 underline sign-out w-1/3 m-8 text-right">Sign Out</button>
    `
    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })


  //THIS THE COPY FROM KELLOGRAM FOR REFERENCE 
  //ATTEMPTED TO RECREATE THIS CODE BELOW -AK

    // Listen for the form submit and create/render the new post

    // document.querySelector('form').addEventListener('submit', async function(event) {
    //   event.preventDefault()
    //   let postUsername = user.displayName
    //   let postImageUrl = document.querySelector('#image-url').value
    //   let response = await fetch('/.netlify/functions/create_post', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       userId: user.uid,
    //       username: postUsername,
    //       imageUrl: postImageUrl
    //     })
    //   })
    //   let post = await response.json()
    //   document.querySelector('#image-url').value = '' // clear the image url field
    //   renderPost(post)
    // })

      // Listen for the form submit and create/render the new post

      // RG (3/15/21): commented so we can call from yourtrip.js:
      // document.querySelector('.form').addEventListener('submit', async function(event) {
      //   event.preventDefault()
      //   let postUsername = user.displayName
      //   let postDescription = document.querySelector('#descriptionform').value
      //   let postLink = document.querySelector('#linkform').value
      //   let postImageUrl = document.querySelector('#imageform').value
      //   let response = await fetch('/.netlify/functions/create_post', {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       userId: user.uid,
      //       username: postUsername,
      //       description: postDescription,
      //       url: postLink,
      //       imageUrl: postImageUrl
      //     })
      //   })
  
      //   let post = await response.json()
      //   document.querySelector('#descriptionform').value = '' 
      //   document.querySelector('#linkform').value = '' 
      //   document.querySelector('#imageform').value = '' // clear the image url field
  
      //   renderPost(post)
      // })


    // FROM KELLOGRAM - MADE NO UPDATES 

    console.log('pre netlify call')

    // let response = await fetch('/.netlify/functions/get_posts')
    // console.log('get_posts called successfully')

    // let posts = await response.json()
    // for (let i=0; i<posts.length; i++) {
    //   let post = posts[i]
    //   renderPost(post)
    // }

    // RG (3/15/21): to get destination points to print to the homescreen:
    let response = await fetch('/.netlify/functions/get_destinationPoints')
    let destinationPoints = await response.json()
    for (let i=0; i<destinationPoints.length; i++) {
      let destinationPoint = destinationPoints[i]
      console.log(destinationPoint)
      renderDestinationPoint(destinationPoint)

      console.log(destinationPoint.id)

      document.querySelector(`.destination-${destinationPoint.classId}`).addEventListener('click', async function(event) {
        console.log('destination clicked')

        if (destinationPoint.id == 'Paris') { 
          document.location.href = 'paris.html'

        } else if (destinationPoint.id == 'Puerto Escondido') {
          document.location.href = 'puertoescondido.html'

        } else {
          alert ('destination not found')
        }

        
      })

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



  //RG (3/15/21): 
  async function renderDestinationPoint(destinationPoint) {
    //let destinationId = destinationPoint.id
    document.querySelector('.trips').insertAdjacentHTML('beforeend', `

      <div class="w-1/2 p-10 text-center text-gray-800 font-bold hover:text-pink-800">



          <img class="object-contain h-80 width-90 rounded-full"
            src="${destinationPoint.imageUrl}">

          <button class="bg-clip-text text-transparent bg-gradient-to-r from-gray-50 to-gray-400 underline destination-${destinationPoint.classId} ">${destinationPoint.id}</button>


      </div>
    `)
  }
    

  // RG (3/15/21): commented so that we can call from yourtrip.js:
  // listen for the like button on this post
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

  // RG (3/15/21): commented so that we can call from yourtrip.js:
  // listen for the post comment button on this post
  // let postCommentButton = document.querySelector(`.post-${postId} .post-comment-button`)
  // postCommentButton.addEventListener('click', async function(event) {
  //   event.preventDefault()
  //   console.log(`post ${postId} post comment button clicked!`)

  //   // get the text of the comment
  //   let postCommentInput = document.querySelector(`.post-${postId} input`)
  //   let newCommentText = postCommentInput.value
  //   console.log(`comment: ${newCommentText}`)

  //   // create a new Object to hold the comment's data
  //   let newComment = {
  //     postId: postId,
  //     username: firebase.auth().currentUser.displayName,
  //     text: newCommentText
  //   }

  //   // call our back-end lambda using the new comment's data
  //   await fetch('/.netlify/functions/create_comment', {
  //     method: 'POST',
  //     body: JSON.stringify(newComment)
  //   })

  //   // insert the new comment into the DOM, in the div with the class name "comments", for this post
  //   let commentsElement = document.querySelector(`.post-${postId} .comments`)
  //   commentsElement.insertAdjacentHTML('beforeend', renderComment(newComment))

  //   // clears the comment input
  //   postCommentInput.value = ''
  // })
//}

// RG (3/15/21): commented so that we can call from yourtrip.js:
// given an Array of comment Objects, loop and return the HTML for the comments
// function renderComments(comments) {
//   if (comments) {
//     let markup = ''
//     for (let i = 0; i < comments.length; i++) {
//       markup += renderComment(comments[i])
//     }
//     return markup
//   } else {
//     return ''
//   }
// }

// RG (3/15/21): commented so that we can call from yourtrip.js:
// return the HTML for one comment, given a single comment Object
// function renderComment(comment) {
//   return `<div><strong>${comment.username}</strong> ${comment.text}</div>`
// }

// RG (3/15/21): commented so that we can call from yourtrip.js:
// return the HTML for the new comment form
// function renderCommentForm() {
//   let commentForm = ''
//   commentForm = `
//     <input type="text" class="mr-2 rounded-lg border px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500" placeholder="Add a comment...">
//     <button class="post-comment-button py-2 px-4 rounded-md shadow-sm font-medium text-white bg-purple-600 focus:outline-none">Post</button>
//   `
//   return commentForm
// }
