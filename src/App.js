import './App.css';
import './Assests/fontAwesomeProIcons/fontAwesomeIcons.css';
import DB from './Database.json';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Homepage from './Components/Homepage/Homepage';

function App() {
  // console.log(DB);
  return (
    <div className="mt-[2rem] pt-[1rem] border-0 border-slate-200 p-[2rem] w-[120rem]  m-auto rounded-md  text-[1.2rem] text-stone-200 ">
      <Header/>
      <Homepage/>
      <Footer/>
    </div>

  );
}

export default App;
