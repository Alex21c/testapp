
import { useParams } from "react-router-dom";
import { useContext, useReducer } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import './Product.css';
import DB from '../../Database.json';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { ContextFoodCartWebApp } from "../../Components/Context/ContextFoodCartWebApp";
import SimpleSnackbar, {useSetInitialStateSnackbar, openTheSnackBar} from '../../Components/Notifications/SimpleSnackBar';
import { useNavigate } from "react-router-dom";


export default function Product(){
  let navigate = useNavigate();

  const [open, setOpen] = useSetInitialStateSnackbar();
  let {stateCart, dispatch} = useContext(ContextFoodCartWebApp);
  let {stateWhoIsCurrentPage, updateStateWhoIsCurrentPage, stateUserAuthMetaData} = useContext(ContextFoodCartWebApp);
  // let [stateCart, dispatch] = useReducer(reducer, []);
  let refQuantity = useRef(null);
  const {productID, productCategory} = useParams();
  let [stateProduct, udpateStateProduct] = useState({});
  
  let currentProductQuantityAlreadyInCart  = null;
  if(stateCart?.products && stateCart?.products[`${productCategory}-${productID}`]?.quantity){
    currentProductQuantityAlreadyInCart = stateCart?.products[`${productCategory}-${productID}`]?.quantity; 
  }
  let defaultQuantity = currentProductQuantityAlreadyInCart ? currentProductQuantityAlreadyInCart : 1;
  ////console.log(currentProductQuantityAlreadyInCart)

  function fetchProduct(productID, productCategory){
    return DB[productCategory].filter(product=>product.id === productID);
  }
 

  useEffect(()=>{    
    // ////console.log(productID, productCategory, DB);    
    // ////console.log(stateProduct);
    udpateStateProduct(fetchProduct(productID, productCategory)[0]);
    updateStateWhoIsCurrentPage('Product');
    // fetchLocalProduct();
 
  }, [])

  useEffect(()=>{
    document.title=stateProduct.title;
    
  },[stateProduct]);

  // useEffect(()=>{
  //   ////console.log(stateCart);
  // },[stateCart]);

  // useEffect(()=>{
  //   ////console.log(stateProduct.image)
  // }, [stateProduct]);
  
  return (
    <div className=" pageWrapper mt-[2rem] pt-[1rem] border-0 border-slate-200 p-[2rem] max-w-[120rem]  m-auto rounded-md  text-[1.2rem] text-stone-200 ">
      <Header/>  
      <SimpleSnackbar open={open} setOpen={setOpen}/>
      <div id='wrapperProduct' className='flex flex-col items-center bg-gradient-to-br from-emerald-700 to-emerald-800 pb-[5rem]'>
        {

          stateProduct?.id  && 
          <div className="wrapperImageTitleAndMetadata flex flex-col gap-[1rem]  p-[2rem] max-w-[80rem]">
            <h2 className="smallCaps text-[2rem] font-semibold mt-[1rem]">{stateProduct.title}</h2>            
              <dl className="flex flex-col gap-[1rem] ">
                <div className="wrapperProdudctImgAndDescPlusIngredients flex  gap-[1rem]">
                  <div className="wrapperDescriptionAndIngredients w-[60%] flex flex-col gap-[1rem]">
                    <div>
                      <dt className="bg-green-300 text-stone-700 font-semibold px-[1rem] py-[.3rem] mb-[.5rem]"><i className="fa-solid fa-align-justify"></i> Description</dt>
                      <dd className="flex flex-col gap-[1rem]">{stateProduct.description.map((description, idx)=><p key={`description-${idx}`}>{description}</p>)}</dd>
                    </div>
                    <div>
                      <dt className="bg-green-300 text-stone-700 font-semibold px-[1rem] py-[.3rem] mb-[.5rem]"><i className="fa-solid fa-tag"></i> Price</dt>
                      <dd className="font-semibold">₹{stateProduct.price}/- Only</dd>
                    </div>
                    <div>
                      <dt className="bg-green-300 text-stone-700 font-semibold px-[1rem] py-[.3rem] mb-[.5rem]"><i className="fa-solid fa-truck"></i> Order Now</dt>
                      <dd className="font-semibold flex flex-col gap-[1rem]">
                        <div className="flex gap-[.5rem] items-center">
                          <span>Quantity</span>
                          <input type="number" ref={refQuantity} defaultValue={defaultQuantity} min={0} max={20} className="text-stone-700 w-[5rem] transition focus:outline focus:outline-2 focus:outline-yellow-500 pr-[0] p-[.3rem] bg-stone-200  rounded-md text-[1.5rem] text-center"/>
                        </div>
                        <button onClick={()=>{
                          // validating is user logged in ?
                          if(!stateUserAuthMetaData?.uid){
                            //console.log('user is not logged in, redirect user to login page!');
                            let currentPageUrl = encodeURIComponent(window.location.pathname);
                            
                            navigate(`/SignIn/${currentPageUrl}`)

                            return;
                          }


                            dispatch({type:'updateProductQuantity', payload: {
                          quantity:refQuantity.current.value,
                          productID: stateProduct.id,
                          productCategory: productCategory,
                          title: stateProduct.title,
                          price: stateProduct.price,
                          imagePath: stateProduct.image

                          }});
                          openTheSnackBar(setOpen);
                        }
                          
                          }  className="select-none flex gap-[1rem] items-center justify-center outline outline-2 outline-amber-50  hover:bg-yellow-400 transition cursor-pointer px-[1rem] py-[.5rem] rounded-md hover:text-white text-stone-700   bg-yellow-300 ">
                          <i className="fa-solid fa-cart-shopping text-[1.8rem]"/>
                          <span className="text-[1.5rem]">
                             {
                              stateCart?.products && stateCart.products[`${productCategory}-${productID}`]?.quantity > 0 ? "Update Cart" : "Add to Cart"
                             } 
                             </span>
                        </button>  
                      </dd>
                    </div>
                  </div>
                  <div className="parentWrapperProductImage w-[40%]">
                  
                    <div className="wrapperProductImage rounded-md overflow-hidden max-h-[25rem] shadow-md shadow-green-300">              
                        <img className="w-[100%] h-[100%] object-cover" src={require(`../../Assests/Images/${stateProduct.image}`)} alt={`Image ${stateProduct.title}`} title={stateProduct.title}/>                  
                    </div>
                    
                  </div>
                </div>


      

              </dl>
            
          </div>
        }
        


        
      </div>
      <Footer/>
    </div>    
  );
}