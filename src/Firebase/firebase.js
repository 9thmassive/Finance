import firebase from 'firebase'

export function firbaseCall(collection, doc) {
    return firebase.firestore().collection(collection).doc(doc)
}
