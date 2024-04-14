import './Footer.css';
import { Link } from "react-router-dom";
export default function Footer(){
  return (
    <footer className="bg-gradient-to-br from-yellow-200 to-yellow-300 p-[1rem] rounded-bl-md rounded-br-md flex gap-[1rem] justify-center text-stone-700 ">
      <p className="text-[1.2rem] flex gap-[.5rem]" >
        <span>&copy; 2024</span>
        <Link to="https://www.linkedin.com/in/alex21c/" className='underline hover:text-white transition  font-medium'>Alex21C</Link>  
        <span>All Rights Reserved.</span>
      </p>              
    </footer>
  );
}