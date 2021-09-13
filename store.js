import React from 'react'
import { View, Text } from 'react-native'
import thunk from "redux-thunk";
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { createStore, combineReducers, compose } from 'redux'
import {firebaseReducer} from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' 

const fbConfig = {}
// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
    // products: productsReducer,
    // cart: cartReducer,
    // orders: ordersReducer,
    // auth: authReducer
});
const middleware = [thunk]
const store = createStore(rootReducer, applyMiddleware(...middleware));

export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
  }
export default store



