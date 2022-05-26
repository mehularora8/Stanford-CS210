import uuid from 'react-native-uuid';
import { collection, setDoc, getDoc, getDocs, deleteDoc, doc, listCollections } from 'firebase/firestore';

import db from './config.js';


export async function getObject(col, key) {
    /* 
    Helper function for getting an object from a given collection
    pass a collection, and the primary key of the object
    Always the object if found, else null
    */
  const docRef = doc(db, col, key);
  const docSnap = await getDoc(docRef)
  
  if (docSnap.exists) {
    return docSnap.data();
  } else {
    return null;
  }
}

export async function getReviews(col, key) {
  /* 
  Helper function for getting reviews for a given resource
  pass a collection ('resources'), and the primary key of the object
  Always the object if found, else null
  */
  const docRef = doc(db, col, key)
  const reviewsRef = collection(db, col, key, 'reviews')
  const reviewsSnap = await getDocs(reviewsRef)
  const reviewsArray = reviewsSnap.docs.map(d => ({ id: d.id, ...d.data() }))
  return reviewsArray;
}

export async function getQuestions(col, key) {
  /* 
  Helper function for getting the questions for a given resource
  pass a collection ('resources'), and the primary key of the object
  Always the object if found, else null
  */
  const docRef = doc(db, col, key)
  const reviewsRef = collection(db, col, key, 'questions')
  const reviewsSnap = await getDocs(reviewsRef)
  const reviewsArray = reviewsSnap.docs.map(d => ({ id: d.id, ...d.data() }))
  return reviewsArray;
}



export async function putObject(col, key, object) {
    /* 
    Helper function for putting an object in a given collection
    pass a collection, primary key and the object to store
    Always returns true
    */
    const docRef = doc(db, col, key);
    await setDoc(docRef, object);
    return true;
}


export async function deleteReview(resourceId, reviewId) {
  /* 
  Helper function for putting an object in a given collection
  pass a collection, primary key and the object to store
  Always returns true
  */
  const pathname = 'resources/' + resourceId + '/reviews/' ;
  const docRef = doc(db, pathname, reviewId)
  const docSnap = await getDoc(docRef)
  let reviewToDelete = null
  if (docSnap.exists) {
     reviewToDelete = docSnap.data();
  } 

  //get values for updating reviews summary
  var revAccessibility = reviewToDelete.reviewRatings.Accessibility
  var revCommunication = reviewToDelete.reviewRatings.Communication
  var revSafety = reviewToDelete.reviewRatings.Safety
  var revEnvironment = reviewToDelete.reviewRatings.Environment
  var revOverall = reviewToDelete.reviewRatings.Overall

  //delete review 
  await deleteDoc(docRef);

  //update the reviews summary 
  //get resource object 
  let resource = await getObject('resources', resourceId)

  // Update review metadata -- weighted averages
  let count = resource.Ratings.reviewCount 
  let accessibility = resource.Ratings.Accessibility
  let communication = resource.Ratings.Communication
  let environment = resource.Ratings.Environment
  let safety = resource.Ratings.Safety
  let overall = resource.Ratings.Overall

  var weightedAverage = (avg, total, newRating) => {
		return (avg * total - newRating) / (total - 1)
	}
   

  let updatedRatingsSummary = {
    "Accessibility" : weightedAverage(accessibility, count, revAccessibility),
    "Communication" : weightedAverage(communication, count, revCommunication),
    "Environment" : weightedAverage(environment, count, revEnvironment),
    "Safety" : weightedAverage(safety, count, revSafety),
    "Overall" : weightedAverage(overall, count, revOverall),
    "reviewCount" : count - 1
  }

  getObject('resources', resourceId).then((x) => { 
    x.Ratings = updatedRatingsSummary;
    putObject('resources', resourceId, x);
  })

  return true;
}



export async function getObjectsFromCollection(col, numObjects=10, index=0) {
    /* 
    Helper function to return all objects in a collection,
    pass in an index to get everything after a given index?
    Also set the number of objects to return, default is 10
    */
    const querySnapshot = await getDocs(collection(db, col));
    var out = []
    querySnapshot.forEach((doc, index) => {
      out.push({id: doc.id, data: doc.data()});
      if (index+1 >= numObjects) {
          
      }
    });
    return out;
}

export async function storeObject(db_name, local_name) {
  /* stores non text data blobs like photos */

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', local_name, true);
    xhr.send(null);
  });

  const pathname = db_name.slice(0, db_name.lastIndexOf("/")+1);
  const filename = db_name.slice(db_name.lastIndexOf("/")+1)

  db.storage().ref(pathname).child(filename)

  return true;
}


// async function uploadImageAsync(uri) {
//   const blob = await new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//       resolve(xhr.response);
//     };
//     xhr.onerror = function (e) {
//       console.log(e);
//     reject(new TypeError(“Network request failed”));
//     };
//     xhr.responseType = “blob”;
//     xhr.open(“GET”, uri, true);
//     xhr.send(null);
// });
// }