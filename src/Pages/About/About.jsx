import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { ContextFoodCartWebApp } from "../../Components/Context/ContextFoodCartWebApp";
import { useContext, useEffect } from "react";

export default function About(){  
  
  
  
  
  let {stateWhoIsCurrentPage, updateStateWhoIsCurrentPage} = useContext(ContextFoodCartWebApp);

  


  useEffect(()=>{
    updateStateWhoIsCurrentPage('About');
    
  },[]);
  
  useEffect(()=>{
    document.title=stateWhoIsCurrentPage;
    
  },[stateWhoIsCurrentPage]);
  
  

  return (
    <div className="pageWrapper mt-[2rem] pt-[1rem] border-0 border-slate-200 p-[2rem] max-w-[120rem]  m-auto rounded-md  text-[1.2rem] text-stone-200 ">
      <Header/>  

      <div  className='flex flex-col gap-[1rem] items-center bg-gradient-to-br from-emerald-700 to-emerald-800 pb-[5rem] pt-[1rem] p-[1rem]'>
        <h2 className=" text-stone-200 smallCaps text-[2rem] font-medium">About</h2>
        <div className="flex flex-col gap-[.5rem]">

          <p>
            Veg. Restaurant is part of Geekster MERN Stack Module #5 Project for Module Clearance Test conducted on 2nd Week of April 2024. Project was developed using ReactJs and TailwindCSS. Google Firebase was used for Authentication and Google Firestore Database was used for Storing Cart data.
          </p>
          <p>
            Project featuring a Veg. Restaurant where use can browse food items like North Indian, Chinese etc., place an order after sign in using email and password. The order will be recived to the backend and Restaurant owner can process the order accordingly.
          </p>
        </div>
        <section className="flex flex-col gap-[.5rem]">
          <h3 className="text-stone-200 smallCaps text-[1.5rem] font-medium">Credits</h3>
          <p>i express my gratitude towards <a href="https://www.geekster.in/" className="underline text-blue-300">Geekster</a>  for providing me opportunity to become MERN Stack developer and achieve my vision board Financial Freedom Goal! Apart from Geekster i express my gratitude towards:</p>
          <ul className="list-disc  ml-[2rem]">
            <li><a href="https://www.linkedin.com/in/mohit-kadwe/" className="underline text-blue-300">Mohit kadwe</a> Sir (Educator ReactJs)</li>
            <li><a href="https://www.linkedin.com/in/asingh88029/" className="underline text-blue-300">Ankit Singh</a> Sir (Educator Assistant)</li>
            <li>Manan Bansal Sir (For checking Assignments, projects and providing feedback)</li>
            <li><strong>Success Managers:</strong> Palak Bhardwaj Mam, Yatharth Sharma Sir, Aanchal Parnami Mam, Avinash Prakash Sir</li>
            <li><strong>Geekster Curriculm Team:</strong> for designing cutting edge ReactJs curriculm along with real life industry standard assignemnts as proejcts</li>
            <li><strong>Geekster Administrative Team:</strong> for timely starting classes, providing concept videos and study material!</li>
          </ul>
        <blockquote className="flex gap-[.5rem]">
          &mdash;<a href="https://www.linkedin.com/in/alex21c/" className="underline text-blue-300">Abhishek Kumar</a>
          
          <span>(MERN Stack Developer)</span>
        </blockquote>
        </section>
       
      </div>


      <Footer/>
    </div>    
  );
}