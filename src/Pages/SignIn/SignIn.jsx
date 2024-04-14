import { useContext, useReducer } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { ContextFoodCartWebApp } from "../../Components/Context/ContextFoodCartWebApp";
import {firebaseApp} from '../../firebase';
import SuccessAndErrorMsg, {showError, hideError} from "../../Components/Notifications/SuccessAndErrorMsg";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import './SignIn.css';

// let email='customer@alex21c.com';
// let password='customer123$';


export default function SignIn(){  
  
  const {redirectURL} = useParams();
  let redirectTimeOut = 5000;
  let [stateRedirectMessageToUser, updateStateRedirectMessageToUser] = useState(`Redirecting you back to the ${redirectURL} in ${redirectTimeOut/1000} Seconds...`);
  function redirectUserBackToPreviousPage(){        
    let coutdown = Math.floor(redirectTimeOut/1000);
    let intervalId= setInterval(()=>{
      updateStateRedirectMessageToUser(`Redirecting you back to the ${redirectURL} in ${coutdown} Seconds...`);
      --coutdown;
    }, 1000);
    

    return setTimeout(()=>{clearInterval(intervalId); navigate(redirectURL)}, redirectTimeOut);
  }

  let navigate = useNavigate();
  // //console.log(redirectURL);
  let developmentCredentials = [
    {
      email: 'customer@alex21c.com',
      password: 'customer123$'
    },
    {
      email: 'admin@alex21c.com',
      password: 'admin123$'
    }
  ];

  let {stateWhoIsCurrentPage, updateStateWhoIsCurrentPage, stateSuccessAndErrorMsg, updateStateSuccessAndErrorMsg, stateUserAuthMetaData} = useContext(ContextFoodCartWebApp);
  let refEmail = useRef(null);
  let refPassword = useRef(null);
  function handleSignInRequest(event){
    event.preventDefault();
    //console.log('listening...');
    // Safeguard
      if(refEmail.current.value === "" || refPassword.current.value === ""){
        return;
      }
      validateSignInRequest(refEmail.current.value, refPassword.current.value)
    
  } 

 


  function validateSignInRequest(email, password){

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        //console.log(user);
        //console.log('redirecting');
        redirectUserBackToPreviousPage();

        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log(errorMessage, errorCode)
        showError(updateStateSuccessAndErrorMsg, 'Invalid Credentials !');
        // //console.log('redirecting');
        // setTimeout(()=>{
        //   navigate(redirectURL);
        // },1000)
      });

  }



  useEffect(()=>{
    updateStateWhoIsCurrentPage('SignIn');
    hideError(updateStateSuccessAndErrorMsg);
    // testing();
  },[]);

  useEffect(()=>{
    document.title="Sign In";
    
  },[stateWhoIsCurrentPage]);

  return (
    <div className="pageWrapper mt-[2rem] pt-[1rem] border-0 border-slate-200 p-[2rem] max-w-[120rem]  m-auto rounded-md  text-[1.2rem] text-stone-200 ">
      <Header/>  

      <div  className='flex flex-col items-center bg-gradient-to-br from-emerald-700 to-emerald-800 pb-[5rem] pt-[1rem]'>
        <h2 className=" text-stone-200 flex gap-[.5rem] items-center displayNone">
            <i className="fa-solid fa-right-to-bracket text-[1.8rem]"></i>
            <span className="smallCaps text-[2rem] font-medium">Sign In</span>     
        </h2>

        {
          !stateUserAuthMetaData?.uid ? 
          <>
              <form className="signInForm flex flex-col gap-[.5rem] w-[20rem]" method="post">
                <input ref={refEmail} type="email" placeholder="e-Mail" className=" text-stone-700 transition focus:outline focus:outline-2 focus:outline-green-500 p-[1rem] pr-[3rem] rounded-md bg-stone-200 relative w-[100%]" name='email'/>
                <input ref={refPassword} type="password" placeholder="password" className=" text-stone-700 transition focus:outline focus:outline-2 focus:outline-green-500 p-[1rem] pr-[3rem] rounded-md bg-stone-200 relative w-[100%]" name='password' />
                <SuccessAndErrorMsg  stateSuccessAndErrorMsg={stateSuccessAndErrorMsg}/> 
                <button onClick={handleSignInRequest} className="outline-amber-50 bg-yellow-300 hover:bg-yellow-500 transition cursor-pointer px-[1.3rem] py-[.3rem] rounded-md hover:text-slate-50 text-stone-700 text-[1.5rem] flex gap-[.5rem] items-center justify-center">
                      <i className="fa-solid fa-right-to-bracket  text-[2rem]"></i>
                      <span className="text-[1.5rem] font-medium">Sign In</span>
                    </button>
              </form>

              
            <section className="p-[1rem] text-stone-400 select-none">
              <h2 className=" text-[1.3rem] font-semibold">Development Credentials!</h2>
              <dl className="flex flex-col gap-[1rem] ">
                {developmentCredentials.map((credential, idx)=>{
                  return (
                    <div key={`cred-${idx}`}>
                      <h3 className="text-[1.3rem] font-medium smallCaps">Credential #{idx+1}</h3>
                      <div className="flex gap-[.5rem]">
                        <dt>e-Mail :</dt> 
                        <dd>{credential.email}</dd>            
                      </div>
                      <div className="flex gap-[.5rem]">
                        <dt>Password :</dt> 
                        <dd>{credential.password}</dd>            
                      </div>
                    </div>

                  );
                })}

              </dl>

            </section>
          </>
          :
          <>
            <div className="flex flex-col gap-[1rem]">
              <h2 className="text-[2rem] font-medium">Signed In Successfully!</h2>
              <span className="text-[1.3rem] ">{stateRedirectMessageToUser}</span>
            </div>
          </>

        }
      </div>

      <Footer/>
    </div>    
  );
}