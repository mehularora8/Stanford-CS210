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
    console.log(docRef)
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
  await deleteDoc(docRef);
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