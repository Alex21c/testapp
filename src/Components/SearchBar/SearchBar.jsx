import './SearchBar.css'
import { ContextFoodCartWebApp } from "../Context/ContextFoodCartWebApp";
import { useContext } from "react";


export default function SearchBar(){
  let {stateWhoIsCurrentPage, updateStateListOfProducts, stateInitialListOfProducts} = useContext(ContextFoodCartWebApp);
  function handleSearchQuery(query){
    if(query.length === 0 ){
      updateStateListOfProducts(stateInitialListOfProducts);
    }
    // //console.log('query is :' + query);
    // sanitized query
      query = query.trim().toLowerCase();
      // //console.log(query);

    updateStateListOfProducts(stateInitialListOfProducts.filter(product=>{
      return(product.title.toLowerCase().includes(query))
      })
    )
  }

  function debounce(func, delay){
    let timeoutId;
    return function(){
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(()=>{
        func.apply(context, args);
      }, delay)
    }
  }

  let debouncedSearchOperation = debounce(handleSearchQuery, 500);

  if(typeof stateWhoIsCurrentPage === 'string' && stateWhoIsCurrentPage === 'Homepage'){
    return (

      <div className="wrapperSearchBar relative w-[30rem] mt-[1rem]">
        <input onChange={(event)=>{debouncedSearchOperation(event.target.value)}} type="search" placeholder="Search Food from Menu..." className=" text-stone-700 transition focus:outline focus:outline-2 focus:outline-green-500 p-[1rem] pr-[3rem] rounded-md bg-stone-200 relative w-[100%]" />
        <i className="fa-sharp fa-solid fa-magnifying-glass absolute top-[.5rem] right-[.5rem] text-[1.8rem] text-stone-700"></i>
      </div>


    );
  }else{
    return null;
  }

}