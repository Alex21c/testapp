import {Link} from "react-router-dom";
import React, { useEffect, useState, Suspense, useContext} from 'react';
import DB from '../../Database.json';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import './Homepage.css';
import '../../App.css';
import '../../Assests/fontAwesomeProIcons/fontAwesomeIcons.css';
import { ContextFoodCartWebApp } from "../../Components/Context/ContextFoodCartWebApp";
import SearchBar from "../../Components/SearchBar/SearchBar";
import PaginationMaterialUI from "../../Components/Pagination/PaginationMaterialUI";
import { Satellite } from "@mui/icons-material";
export default function Homepage(){

  // importing global states
    let {stateWhoIsCurrentPage, updateStateWhoIsCurrentPage, stateListOfProducts, updateStateListOfProducts, stateInitialListOfProducts, updateStateInitialListOfProducts} = useContext(ContextFoodCartWebApp);
    
  // pagination specific  
    let [currentPage, updateCurrentPage] = useState(1);
    let [stateTotalNoOfPages, updateStateTotalNoOfPages] = useState(1);    
    let [statePaginationListProducts, updateStatePaginationListProducts] = useState ([]);
    let fetchOnlyNProducts = 9;
    let paginationSliceBegin = 0, paginationSliceEnd = fetchOnlyNProducts;   

    useEffect(()=>{
      // now selecting only first N      
      updateStateTotalNoOfPages(Math.floor(stateListOfProducts.length/fetchOnlyNProducts)+1 );
      ////console.log(stateTotalNoOfPages);
      stateListOfProducts.length>0 ?  updateStatePaginationListProducts(stateListOfProducts?.slice(paginationSliceBegin, paginationSliceEnd)) : updateStatePaginationListProducts([]);
    }, [stateListOfProducts]);

    useEffect(()=>{
      ////console.log('hi hi hi');
      paginationSliceEnd = currentPage * fetchOnlyNProducts;
      // safeguard
        // if(paginationSliceEnd > stateListOfProducts.length){
        //   paginationSliceEnd = stateListOfProducts.length+1;
        // }
        // //console.log(paginationSliceEnd);

      paginationSliceBegin = paginationSliceEnd - fetchOnlyNProducts;
      stateListOfProducts.length>0 ? updateStatePaginationListProducts(stateListOfProducts?.slice(paginationSliceBegin,  paginationSliceEnd)) :   updateStatePaginationListProducts([]);;
    }, [currentPage]);


  // initial lodaing of products
    useEffect(()=>{
      // ////console.log(DB)
      updateStateWhoIsCurrentPage('Homepage');
      // let initialListOfProductsMerged = mergerAllProductsTogetherIntoSingleArray()
      // updateStateInitialListOfProducts(initialListOfProductsMerged);
      updateStateListOfProducts(stateInitialListOfProducts);      

     

      // ////console.log('here is the data', stateListOfProducts) 
    },[]);
    useEffect(()=>{
      document.title="Homepage: Veg Restaurant";
      
    },[stateWhoIsCurrentPage]);

    // useEffect(()=>{
    //   //console.log(stateInitialListOfProducts);
    // },[stateInitialListOfProducts]);


    useEffect(()=>{
      
      // //console.log(stateListOfProducts);
        // ////console.log(data)
      
    },[stateListOfProducts]);


  return (
    <div className="pageWrapper mt-[2rem] pt-[1rem] border-0 border-slate-200 p-[2rem] max-w-[120rem]  m-auto rounded-md  text-[1.2rem] text-stone-200 ">
      <Header/>    

      <div  className='flex flex-col items-center bg-gradient-to-br from-emerald-700 to-emerald-800'>
        <SearchBar/>
        <div  id='productsGrid' className=' grid grid-cols-3 '>
          {
            statePaginationListProducts.length>0 &&  statePaginationListProducts?.map((item)=>{
              return (
                  <Link to={`product/${item.category}/${item.id}`}  key={item.id}>
                    <div data-id={item.id} className=' flex flex-col gap-[1rem] p-[2rem] w[10rem] '> 
                      <div className='productImg w-[20rem] h-[20rem] shadow-md shadow-green-300 rounded-md overflow-hidden'>
                                                            
                          {/* <img src={loaderImg} className='w-[100%] h-[100%]' onLoad={(event)=>{event.target.src=item.image}} /> */}
                          {/* <img src={loaderImg} className='w-[100%] h-[100%]' onLoad={(event)=>{event.target.src=item.image}} /> */}
                          <img src={require(  `../../Assests/Images/${item.image}`)} className='w-[100%] h-[100%]' />
                        
                                          
                      </div>
                        <h2 className="max-w-[20rem]">{item.title}</h2>
                    </div>
                  </Link>
              )
            })
          }

        </div>

        <div className="mb-[2rem]">
          <PaginationMaterialUI stateTotalNoOfPages={stateTotalNoOfPages} updateCurrentPage={updateCurrentPage}/>
        </div>
      </div>
      <Footer/>
    </div>
    
    

    

  );
}


