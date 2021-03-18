
firebase.auth().onAuthStateChanged(async function(user) {
  //console.log (user.displayName)

  if (user) {
    // Signed in
    console.log('signed in')

   

    //WELCOME USER NAME (WHEN SIGNED IN) 
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


 
      
     
  
    




    console.log('pre netlify call')

   

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

          <button class="bg-clip-text text-gray-800 underline destination-${destinationPoint.classId} ">${destinationPoint.id}</button>


      </div>
    `)
  }
    



 


 




