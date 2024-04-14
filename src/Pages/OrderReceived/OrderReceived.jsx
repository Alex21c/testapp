import './OrderPlaced.css';
import { useParams } from "react-router-dom";
import { useContext, useReducer } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { ContextFoodCartWebApp, setStateOrderReceivedIntoFirebaseDB } from "../../Components/Context/ContextFoodCartWebApp";
import CartItem from "../../Components/CartItem/CartItem";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import SuccessAndErrorMsg, {showError, hideError} from "../../Components/Notifications/SuccessAndErrorMsg";
// import {FIREBASE_DB} from '../../firebase';

export default function OrderReceived(){
  let {stateOrdersReceived} = useContext(ContextFoodCartWebApp);
  let {stateWhoIsCurrentPage, updateStateWhoIsCurrentPage, stateUserAuthMetaData,dispatch } = useContext(ContextFoodCartWebApp);
  let [stateCartTotal, updateStateCartTotal] = useState(0);


  useEffect(()=>{
    updateStateWhoIsCurrentPage('OrderReceived');
    if(stateUserAuthMetaData?.uid){
      setStateOrderReceivedIntoFirebaseDB(stateUserAuthMetaData.uid, stateOrdersReceived);
      dispatch({type: 'clearTheCart', payload:  null});
    }
    // //console.log('state cart is ', stateCart);
  },[]);


  
  return (
    <div className="pageWrapper mt-[2rem] pt-[1rem] border-0 border-slate-200 p-[2rem] max-w-[120rem]  m-auto rounded-md  text-[1.2rem] text-stone-200 ">
      <Header/>  

      <div  className=' flex flex-col items-center bg-gradient-to-br from-emerald-700 to-emerald-800 pb-[5rem] p-[1rem]'>
        <section className="flex flex-col gap-[1rem] w-[90%]">
          <h2 className=" text-stone-200 font-medium flex gap-[1rem] items-center text-[1.8rem]">Order Received, thank You!</h2>
            <pre className=' overflow-x-scroll p-[1rem]'>
              {stateOrdersReceived}



            </pre>
        </section>

        
      </div>
      <Footer/>
    </div>    
  );
}