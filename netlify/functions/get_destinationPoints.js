// /.netlify/functions/get_posts
let firebase = require('./firebase')



exports.handler = async function(event) {
  console.log('inside get_destinationPoints.js')

  let db = firebase.firestore()                             // define a variable so we can use Firestore
  let destinationPointData = []                                        // an empty Array
  
  let destinationPointQuery = await db.collection('destinationPoint')             // destinationPoints from Firestore
                           //.orderBy('created')              // ordered by created
                           .get()
  let destinationPoints = destinationPointQuery.docs                               // the post documents themselves
  
  // loop through the post documents
  for (let i=0; i<destinationPoints.length; i++) {
    //let destinationPointId = destinationPoints[i].id                                // the ID for the given post
    let destinationPoint = destinationPoints[i].data()
    let destinationId = destinationPoint.destinationId                          
    let destinationImageUrl = destinationPoint.imageUrl
    let destinationClassId = destinationPoint.destinationClassId   

    // let likesQuery = await db.collection('likes')           // likes from Firestore
    //                          .where('postId', '==', postId) // for the given postId
    //                          .get()
    // let commentsQuery = await db.collection('comments')     // likes from Firestore
    //                          .where('postId', '==', postId) // for the given postId
    //                          .get()
    // let commentsData = []                                   // an empty Array
    // let comments = commentsQuery.docs                       // the comments documents

    // loop through the comment documents
    // for (let i=0; i<comments.length; i++) {
    //   let comment = comments[i].data()                      // grab the comment data
    //   commentsData.push({
    //     username: comment.username,                         // the author of the comment
    //     text: comment.text                                  // the comment text
    //   })
    // }

    // add a new Object of our own creation to the postsData Array
    destinationPointData.push({
      id: destinationId,                                           // the post ID
      imageUrl: destinationImageUrl, 
      classId: destinationClassId                         // the image URL
      // username: postData.username,                          // the username
      // likes: likesQuery.size,                               // number of likes
      // comments: commentsData                                // an Array of comments
    })

  }
  console.log(destinationPointData)
  
  // return an Object in the format that a Netlify lambda function expects
  return {
    statusCode: 200,
    body: JSON.stringify(destinationPointData)
  }
}