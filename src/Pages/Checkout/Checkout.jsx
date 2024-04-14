import './Checkout.css';
import { useParams } from "react-router-dom";
import { useContext, useReducer } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { ContextFoodCartWebApp } from "../../Components/Context/ContextFoodCartWebApp";
import CartItem from "../../Components/CartItem/CartItem";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import SuccessAndErrorMsg, {showError, hideError} from "../../Components/Notifications/SuccessAndErrorMsg";
// import {FIREBASE_DB} from '../../firebase';
function getFormattedDate(){
    // Create a new Date object
    var currentDate = new Date();

    // Format the date using toLocaleString() with options
    return  currentDate.toLocaleString('en-US', {
      weekday: 'long', // Full day name (e.g., "Monday")
      day: 'numeric', // Day of the month (e.g., "12")
      month: 'long', // Full month name (e.g., "April")
      year: 'numeric', // Four-digit year (e.g., "2024")
      hour: 'numeric', // Hours (e.g., "10")
      minute: 'numeric', // Minutes (e.g., "03")
      hour12: true, // Use 12-hour clock (true) or 24-hour clock (false)
    });

    
}
export default function Checkout(){
  let navigate = useNavigate();
  
  let {stateWhoIsCurrentPage, updateStateWhoIsCurrentPage, stateCart, dispatch, stateSuccessAndErrorMsg, updateStateSuccessAndErrorMsg,  stateOrdersReceived, updateStateOrdersReceived} = useContext(ContextFoodCartWebApp);
  let [stateCartTotal, updateStateCartTotal] = useState(0);


  useEffect(()=>{
    updateStateWhoIsCurrentPage('Checkout');
    // //console.log('state cart is ', stateCart);
  },[]);
  useEffect(()=>{
    computeCartTotal();
    
  },[stateCart]);

  function computeCartTotal(){
    
    ////console.log(stateCart);
    stateCart?.products &&  updateStateCartTotal(Object.entries(stateCart.products).reduce((accumulator, [idx, product])=>{
      ////console.log(product.price);
      return accumulator + (Number(product.price) * Number(product.quantity));
    },0));

    // Object.entries(stateCart.products).reduce((accumulator, currentProduct)=>{
    //   ////console.log(currentProduct)
    // } , 0)

  }
    let refName=useRef(null), refMobileNo=useRef(null), refApartment=useRef(null), refCity=useRef(null), refDistrict=useRef(null), refState=useRef(null), refPinCode=useRef(null);
  function handleRequestPlaceOrder(event){
    event.preventDefault();
    let errorIfAny=null;
    if(refName.current.value === ""){
      errorIfAny = "Required Yours Name!"
    }else if(refMobileNo.current.value === ""){
      errorIfAny = "Required Yours Mobile Number!"
    }else if(refApartment.current.value === ""){
      errorIfAny = "Required Yours Apartment or H.No or Flat No.!"
    }else if(refCity.current.value === ""){
      errorIfAny = "Required Yours City!"
    }else if(refDistrict.current.value === ""){
      errorIfAny = "Required Yours District!"
    }else if(refState.current.value === ""){
      errorIfAny = "Required Yours State!"
    }else if(refPinCode.current.value === ""){
      errorIfAny = "Required Yours Pin Code!"
    }

    if(errorIfAny){
      showError(updateStateSuccessAndErrorMsg, errorIfAny);
      return;
    } 
      
    hideError(updateStateSuccessAndErrorMsg);
  
    //console.log(stateCart);
    let temp = Object.entries(stateCart).reduce((accumulator, [idx, products])=>{
      // //console.log(products);
      return Object.entries(products).map(([idx, product])=>{
        //console.log(product);
        let orderDetail = `#${product.quantity} x  ${product.title} @ ₹${product.price} `;
        accumulator.push(orderDetail);
        return accumulator;
      });
     
      // products.map(product=>{
      //   //console.log(product);
      // });
    }, []);

   let orderDetail = temp.join('\r\n');


  

    // preparing order
    let orderMetaData =
    `
    New Order Received: ${getFormattedDate()}

    Order Details:
    ${orderDetail}

    Shipping Details: 
    ${refName.current.value} ${refMobileNo.current.value} 
    ${refApartment.current.value}, ${refCity.current.value}, District ${refDistrict.current.value}, ${refState.current.value},  (PIN: ${refPinCode.current.value}) 

    Payable Cash on Delivery:
    ₹${stateCartTotal}/-
    `;
    //console.log(orderMetaData);
    updateStateOrdersReceived(orderMetaData);
    
    setTimeout(()=>{
      navigate('/order-received')
    },1000)

  }

  useEffect(()=>{
    hideError(updateStateSuccessAndErrorMsg);
  },[]);
  return (
    <div className="pageWrapper mt-[2rem] pt-[1rem] border-0 border-slate-200 p-[2rem] max-w-[120rem]  m-auto rounded-md  text-[1.2rem] text-stone-200 ">
      <Header/>  

      <div  className='flex flex-col items-center bg-gradient-to-br from-emerald-700 to-emerald-800 pb-[5rem] p-[1rem]'>
        <section className="flex flex-col gap-[1rem] ">
          <h2 className=" text-stone-200 font-semibold flex gap-[1rem] items-center">
            <i className="fa-solid fa-location-dot text-[2rem]"></i>
            <span className="title text-[1.5rem]">Yours Shipping Details</span>
          </h2>
          <form className="flex flex-col gap-[.5rem] w-[20rem]" method="post">
            <input  type="text" placeholder="Name" ref={refName} className=" text-stone-700 transition focus:outline focus:outline-2 focus:outline-green-500 p-[.5rem] pr-[3rem] rounded-md bg-stone-200 relative w-[100%]"/>
            <input  type="number" placeholder="Mobile No." ref={refMobileNo}  className=" text-stone-700 transition focus:outline focus:outline-2 focus:outline-green-500 p-[.5rem] pr-[3rem] rounded-md bg-stone-200 relative w-[100%]"/>
            <input  type="text" placeholder="Apartment/H.No./Flat No." ref={refApartment}  className=" text-stone-700 transition focus:outline focus:outline-2 focus:outline-green-500 p-[.5rem] pr-[3rem] rounded-md bg-stone-200 relative w-[100%]"/>
            <input  type="text" placeholder="City/Sector" ref={refCity}  className=" text-stone-700 transition focus:outline focus:outline-2 focus:outline-green-500 p-[.5rem] pr-[3rem] rounded-md bg-stone-200 relative w-[100%]"/>
            <input  type="text" placeholder="District" ref={refDistrict}  className=" text-stone-700 transition focus:outline focus:outline-2 focus:outline-green-500 p-[.5rem] pr-[3rem] rounded-md bg-stone-200 relative w-[100%]" />
            <input  type="text" placeholder="State" ref={refState}  className=" text-stone-700 transition focus:outline focus:outline-2 focus:outline-green-500 p-[.5rem] pr-[3rem] rounded-md bg-stone-200 relative w-[100%]" />
            <input  type="number" placeholder="PinCode" ref={refPinCode}  className=" text-stone-700 transition focus:outline focus:outline-2 focus:outline-green-500 p-[.5rem] pr-[3rem] rounded-md bg-stone-200 relative w-[100%]" />
            <SuccessAndErrorMsg  stateSuccessAndErrorMsg={stateSuccessAndErrorMsg}/> 
            <button onClick={handleRequestPlaceOrder} className="outline-amber-50 bg-yellow-300 hover:bg-yellow-500 transition cursor-pointer px-[1.3rem] py-[.3rem] rounded-md hover:text-slate-50 text-stone-700 text-[1.5rem] flex gap-[.5rem] items-center justify-center">
                      <i className="fa-solid fa-check  text-[2rem]"></i>
                      <span className="text-[1.5rem] font-medium">Place Order</span>
                </button>
          </form>

        </section>

        
      </div>
      <Footer/>
    </div>    
  );
}