import './Header.css';
import Navbar from "../Navbar/Navbar";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ContextFoodCartWebApp } from "../Context/ContextFoodCartWebApp";
import { getAuth, signOut } from "firebase/auth";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useScrollTrigger } from '@mui/material';
import { useState } from 'react';
export default function Header(){
  let navigate = useNavigate();
  
  function signOutTheUser(){
    ////console.log('waiting signing you out!');
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      ////console.log('successfully signed out!')
    }).catch((error) => {
      // An error happened.
      console.error('Error: Unable to sign out ', error);
    });

  }
  let currentPageUrl = encodeURIComponent(window.location.pathname);
  let {stateCart, dispatch, stateUserAuthMetaData, stateWhoIsCurrentPage, stateNavbarVisibility, updateStateNavbarVisibility, stateIsNavbarPopUpMenuVisible, updateStateIsNavbarPopUpMenuVisible} = useContext(ContextFoodCartWebApp);
  // ////console.log('inside header state cart is: ' , stateCart);
  // ////console.log('data is ', stateUserAuthMetaData)
  return (
    <header className="relative flex bg-gradient-to-br from-yellow-200 to-yellow-300 items-center justify-between p-[1rem] rounded-tl-md rounded-tr-md ">
      <div className={`wrapperLogoAndMenuIcon flex gap-[2rem] items-center`}>
      
        <div className="wrapperMenuIcon pl-[.5rem]" onClick={()=>{
          updateStateNavbarVisibility({display:'flex'})
          updateStateIsNavbarPopUpMenuVisible(true);
          }
        }>
          <i className="text-stone-700 fa-solid fa-bars text-[2.5rem] hover:text-emerald-600 transition"></i>
        </div>
      <Link to="/" title="Logo: Food Delivery App">
        <h2 className="logo flex gap-[.5rem] items-center   text-stone-100 font-bold bg-gradient-to-br from-emerald-500 to-emerald-700 p-[1rem] rounded-sm transition  hover:text-white hover:bg-green-600">
          <i className="icon fa-solid fa-leaf text-[3rem]"></i>  
          <span className="text smallCaps text-[1.5rem]">Veg. Restaurant</span>
        </h2>
      </Link>
      </div>


      <Navbar/>
      <div className="wrapperCartIconAndSignInOrOut flex gap-[2rem] items-center">

        <Link to="/cart" className="relative">           
          <i title="Cart" className="fa-solid fa-cart-shopping text-[2.5rem] text-stone-700 transition hover:text-white cursor-pointer"></i>    
          { stateCart?.products && Object.keys(stateCart?.products).length  >= 1 && 
            <i className="fa-solid fa-circle text-emerald-500 absolute top-[-.2rem] right-[-.4rem]"></i>
          }    
        </Link>

        {
          !stateUserAuthMetaData?.uid  ?
          // Link to={`/SignIn/${currentPageUrl}`} 
          
            <button onClick={
              ()=>{                
                if(stateWhoIsCurrentPage === 'SignIn'){
                  // this way when user is on sign in page, he will not redirect to sign page and causing lots of query string parameters appended to url bar.
                  return ;
                }
                ////console.log('wait we are going to sign in page...');
                navigate(`/SignIn/${currentPageUrl}`);
    
              }
            } className="select-none flex gap-[.5rem] items-center   transition cursor-pointer   text-stone-700    text-[1.3rem]   hover:text-white">
                <i className="fa-solid fa-right-to-bracket text-[2.5rem]"></i>
                <span className="text-[1rem] font-medium">Sign In</span>          
            </button>          
    

          :
        <button onClick={signOutTheUser} className="select-none flex gap-[.5rem] items-center   transition cursor-pointer   text-stone-700    text-[1.3rem]   hover:text-white">
              <i className="fa-solid fa-right-to-bracket text-[2.5rem]"></i>
              <span className="text-[1.2rem] font-medium">Sign Out</span>          
          </button>
        }

      </div>
      
    </header>
  );
}