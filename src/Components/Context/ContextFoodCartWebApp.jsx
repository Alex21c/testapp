import { createContext } from "react";
import { useState } from "react";
import { useReducer } from "react";
import DB from '../../Database.json';
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import {  onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import {FIREBASE_DB} from '../../firebase';
export const ContextFoodCartWebApp = createContext(null);

async function setUserCartStateIntoFirebaseDB(userID, state){    
  
  await setDoc(doc(FIREBASE_DB,'usersCartState', userID), {
    state
  });        
}

async function setStateOrderReceivedIntoFirebaseDB(userID, state){   
  //console.log('setStateOrderReceivedIntoFirebaseDB', userID, state); 
  //console.log(FIREBASE_DB);
  await setDoc(doc(FIREBASE_DB,'customersOrdersReceived', userID), {
    stateOrdersReceived: state
  });        
}

async function getStateOrderReceivedIntoFirebaseDB(userID){
  const docRef = doc(FIREBASE_DB, "customersOrdersReceived", userID);
  const docSnap = await getDoc(docRef);    
  if (docSnap.exists()) {
    ////console.log("User State data:", docSnap.data().state);
    return docSnap.data().stateOrdersReceived;
  } else {
    // docSnap.data() will be undefined in this case
    console.error("Alex21c: No such user or state found inside firebase DB!");
    return null;
  }     
}


async function getUserCartStateFromFirebaseDB(userID){
  const docRef = doc(FIREBASE_DB, "usersCartState", userID);
  const docSnap = await getDoc(docRef);    
  if (docSnap.exists()) {
    ////console.log("User State data:", docSnap.data().state);
    return docSnap.data().state;
  } else {
    // docSnap.data() will be undefined in this case
    console.error("Alex21c: No such user or state found inside firebase DB!");
    return null;
  }     
}



function reducer(state, action){
  ////console.log('reducer is called', action);
  // fetching product quantity
    let productQuantity = 0;   


  // taking action based on type
  function removeProduct(){
    let previousState = {...state};        
    let uniqueID  = `${action.payload.productCategory}-${action.payload.productID}`;        
    delete previousState['products'][uniqueID];        
    return {
      ...previousState
    };  
  }

  switch(action.type){
    case "clearTheCart":
      return{
        ...state,
        products: {         
                                       
        }         
      }
    case "initializeState":
      ////console.log('wait, i got the request', action.payload.initialState)
      return {...action.payload.initialState};
    case "removeProduct":
      return removeProduct();
    case "decreaseQuantity":
      if(Number(action.payload.quantity) - 1 === 0 ){
        // then i need to remove this product from the cart
        return removeProduct();
      }

      return {
        ...state,
        products: {
          ...state.products,                           
          [`${action.payload.productCategory}-${action.payload.productID}`]: {
            ...state.products[`${action.payload.productCategory}-${action.payload.productID}`],
            quantity: Number(action.payload.quantity) - 1,
                             
          }
        }           
               

      }
    case "increaseQuantity":
      //////console.log('hahaha i found you!');
      //////console.log(action.payload);
      return {
        ...state,
        products: {
          ...state.products,                           
          [`${action.payload.productCategory}-${action.payload.productID}`]: {
            ...state.products[`${action.payload.productCategory}-${action.payload.productID}`],
            quantity: Number(action.payload.quantity) + 1,
                             
          }
        }           
               

      }
    
    case "updateProductQuantity":
      productQuantity =  Number(action.payload.quantity);
      // //////console.log(action.payload);
      // //////console.log('updating wait...');
      // if quantity is less than 0 then just delete from cart
        if(Number(productQuantity) === 0 ){
          return removeProduct();
        }
      // otherwise just udpate the quantity
        else {
          return {
            ...state,
            products: {
              ...state.products,                           
              [`${action.payload.productCategory}-${action.payload.productID}`]: {
                quantity: productQuantity,
                id: action.payload.productID,
                category: action.payload.productCategory,
                title: action.payload.title,
                price: action.payload.price,
                imagePath: action.payload.imagePath
                                 
              }
            }           
                   

          }
        }      
    default:
    return state;
  }
}
  //  helper function
  function mergerAllProductsTogetherIntoSingleArray(){
    // attaching category to each product so that it can effectivly navgiate and identify each product
      let products = DB.Categories.map(category=>{
        // ////console.log(DB[category])
        return DB[category].map(product=>{
          // ////console.log(category)
          // ////console.log(product);
          return {
            ...product,
            'category': category
          }
        })

      });
    // reducing into one common array
    products = products.reduce((accumulator, products)=>{
      products.map(product=>{
        accumulator.push(product)
        return accumulator;
        // ////console.log(product)
      })
      return accumulator;
    }, [])
    // ////console.log(products)
    return products;
  }


const ContextProviderFoodCartWebApp = ({children}) =>{
  // let [stateCart, updateStateCart] = useState('this is the intial state of the cart');
  // let template= "this is the template";
  let [stateSuccessAndErrorMsg, updateStateSuccessAndErrorMsg] = useState({
    style: {
      Success: "text-green-300 text-[1.5rem]",
      Error: "text-red-300 text-[1.5rem]"
    },
    msgType: "Success",
    msg: "",
    displayNone: 'displayNone'        
  
  });

  




  let [stateWhoIsCurrentPage, updateStateWhoIsCurrentPage] = useState(null);

  let [stateListOfProducts, updateStateListOfProducts] = useState({});

  let [stateInitialListOfProducts, updateStateInitialListOfProducts] = useState({});   

   // initial lodaing of products
   useEffect(()=>{
    let initialListOfProductsMerged = mergerAllProductsTogetherIntoSingleArray()
    updateStateInitialListOfProducts(initialListOfProductsMerged);
    updateStateListOfProducts(initialListOfProductsMerged);  
  },[]);
  



  function getUserAuthMetaData(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        ////console.log('user is valid and logged in', user);
        return user;
      } else {
        // User is signed out
        // ...
        ////console.log('user is not logged in !')
        return null;
      }
    });    
  } 

  let [stateUserAuthMetaData, updateStateUserAuthMetaData] = useState();
  // let initialStateFromLocalStorage = localStorage.getItem ('alex21cFoodDeliveryWebApp');
  let cartInitialState = {};
 let [stateCart, dispatch] = useReducer(reducer, cartInitialState);

  // if(initialStateFromLocalStorage){
  //   cartInitialState = JSON.parse(initialStateFromLocalStorage);
  // }else{
  //   cartInitialState = {
  //     products:{}
  //  };
  // }  

  useEffect(()=>{


    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      updateStateUserAuthMetaData(user);
      async function fetchData(){
        ////console.log('user is valid and logged in', user);      
        let response = await getUserCartStateFromFirebaseDB(user.uid);
        ////console.log(response);
        cartInitialState =  response;
        ////console.log('here is the fetched state data from async : ', response);
        // cartInitialState = JSON.parse(initialStateFromLocalStorage);
        if(cartInitialState === null){
          ////console.log('alas cartState is null, setting it to empty default! ');
          cartInitialState = {
            products:{}
         };
        }
        dispatch({type: 'initializeState', payload: {initialState: cartInitialState}});

      }
      if (user) {
        fetchData();
      } else {
        // User is signed out
        // ...
        ////console.log('user is not logged in !')
        updateStateUserAuthMetaData(null);
        cartInitialState = {
          products:{}
       };
       dispatch({type: 'initializeState', payload: {initialState: cartInitialState}});
      }
      // ////console.log('making dispath call!');
    

      
    });       
  }, []);

  // useEffect(()=>{////console.log('the stateCart is ', stateCart)}, [stateCart]);
  
  useEffect(()=>{
    // updateLocalStorage(stateCart)
    // setUserCartStateIntoFirebaseDB()
    if(stateUserAuthMetaData?.uid){
      setUserCartStateIntoFirebaseDB(stateUserAuthMetaData.uid, stateCart);
    }
  }, [stateCart]);
  // function updateLocalStorage(newState){
  //   localStorage.setItem ('alex21cFoodDeliveryWebApp', JSON.stringify(newState));

  // }
  let [stateOrdersReceived, updateStateOrdersReceived] = useState([]);
  let [stateNavbarVisibility, updateStateNavbarVisibility] = useState({});
  let [stateIsNavbarPopUpMenuVisible, updateStateIsNavbarPopUpMenuVisible] = useState(false);
  const contextValue = {
    // template, stateCart
    stateCart, dispatch, stateWhoIsCurrentPage, updateStateWhoIsCurrentPage,
    stateListOfProducts, updateStateListOfProducts, stateInitialListOfProducts, updateStateInitialListOfProducts, stateSuccessAndErrorMsg, updateStateSuccessAndErrorMsg, stateUserAuthMetaData, stateOrdersReceived, updateStateOrdersReceived,
    stateNavbarVisibility, updateStateNavbarVisibility, stateIsNavbarPopUpMenuVisible, updateStateIsNavbarPopUpMenuVisible
  };

  
  return (
    <ContextFoodCartWebApp.Provider value={contextValue}>
      {children}
    </ContextFoodCartWebApp.Provider>

  );
}

export default ContextProviderFoodCartWebApp;
export {setStateOrderReceivedIntoFirebaseDB};