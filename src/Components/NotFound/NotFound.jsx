import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ErrorPage(){
  let [stateMsgToUser, updateStateMsgToUser] = useState(null);
  let [stateRedirecting, updateStateRedirecting] = useState(false);
  let navigate = useNavigate();

  function navigateUserBackToHomePage(e){
    e.preventDefault();
    // Safeguard: making sure user multiple clicks are invalid, as we are already redirecting
      if(stateRedirecting){ 
        return ;
      }
    updateStateRedirecting(true);
    let coutdown = 3;
    let intervalId= setInterval(()=>{
      updateStateMsgToUser(`okay, here we go ! (${coutdown})`);
      --coutdown;
    }, 700);
    


    return setTimeout(()=>{clearInterval(intervalId); navigate('/')}, 2800);
  }

  let error = useRouteError();
  


  useEffect(()=>{

    if(error.status === 404){
      updateStateMsgToUser(" The webpage you are looking for does not exist as of now, may be in coming future we can have that webpage! Let me help you to navigate back to Homepage!");
    }
  }, [])
  // //console.log(error);
  return (
    <div className="p-[1rem] max-w-[30rem] m-[auto] flex flex-col gap-[1rem]">
      <h2 className="font-semibold text-[2rem] text-slate-200 flex flex-col gap-[1rem]">
        <span className="text-red-300">Error: {error.status}, {error.statusText} !</span>
        <span className="text-yellow-300 italic font-normal text-[1.5rem]">{stateMsgToUser}</span>
      </h2>

    <Link to="/" className="text-blue-200 text-[1.5rem] underline hover:text-white transition" onClick={navigateUserBackToHomePage}>Click here to go back to the <strong>Homepage</strong> !</Link>
    </div>
  );

}