// /.netlify/functions/get_posts
console.log('inside get_posts.js')

let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()                             // define a variable so we can use Firestore
  let body = JSON.parse(event.body)

  let postsData = []                                        // an empty Array

  let destination = body.destinationPoint
  console.log(destination)
  console.log('some message')




  let postsQuery = await db.collection('posts')             // posts from Firestore
                        .where('destinationPoint', '==', destination)
                          // .orderBy('created')              // ordered by created
                           .get()
  //console.log(postsQuery)

  let posts = postsQuery.docs
  // let aPost = posts[0].data()                              // the post documents themselves
  // console.log(aPost)
  
  // loop through the post documents
  for (let i=0; i<posts.length; i++) {
    let postId = posts[i].id                                // the ID for the given post
    let postData = posts[i].data()                          // the rest of the post data
    console.log(postData)


    // add a new Object of our own creation to the postsData Array
    postsData.push({
      id: postId, 
      description: postData.description,
      destinationPoint: postData.destinationPoint,                                     
      imageUrl: postData.imageUrl,   
      url: postData.url,                    
      username: postData.username, 
      userId: postData.userId  
      // likes: likesQuery.size,                              
      // comments: commentsData                                
    })
  }
  console.log(postsData.length)



    return {
      statusCode: 200,
      body: JSON.stringify(postsData)
    }

  
  







  // return an Object in the format that a Netlify lambda function expects
  return {
    statusCode: 200,
    body: JSON.stringify(postsData)
  }
}