// /.netlify/functions/get_posts
let firebase = require('./firebase')



exports.handler = async function(event) {
  console.log('inside get_destinationPoints.js')

  let db = firebase.firestore()                             
  let destinationPointData = []                                        
  
  let destinationPointQuery = await db.collection('destinationPoint')             
                           //.orderBy('created')              
                           .get()
  let destinationPoints = destinationPointQuery.docs                              
  
  // loop through the post documents
  for (let i=0; i<destinationPoints.length; i++) {
    //let destinationPointId = destinationPoints[i].id                                
    let destinationPoint = destinationPoints[i].data()
    let destinationId = destinationPoint.destinationId                          
    let destinationImageUrl = destinationPoint.imageUrl
    let destinationClassId = destinationPoint.destinationClassId   

   

    // add a new Object to the postsData Array
    destinationPointData.push({
      id: destinationId,                                          
      imageUrl: destinationImageUrl, 
      classId: destinationClassId                         

    })

  }
  console.log(destinationPointData)
  
  // return an Object in the format that a Netlify lambda function expects
  return {
    statusCode: 200,
    body: JSON.stringify(destinationPointData)
  }
}