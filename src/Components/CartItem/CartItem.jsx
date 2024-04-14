import { Link } from "react-router-dom";
import { useRef } from "react";
export default function CartItem({product, dispatch}){
  let refQuantity = useRef(null);
  // console.log('Inside cartItem, ' , product);


 


// here goes our JSX
  return (
    <div className="wrapperProduct flex gap-[1rem] justify-between text-[1.5rem]">
      <div className="wrapperProductImageAndTitle flex gap-[1rem]">
        <Link to={`/product/${product.category}/${product.id}`} >
          <div className="productImage w-[15rem] h-[15rem]">
            <img className="object-fill w-[100%] h-[100%] rounded-md shadow-md shadow-yellow-300" src={require(`../../Assests/Images/${product.imagePath}`)} alt={`Image-${product.title}`} title={product.title} />
          </div>
        </Link>
        <div className="titleAndRemoveBtn flex flex-col gap-[.5rem]">
          <Link to={`/product/${product.category}/${product.id}`} >
            <span className="capitalize font-semibold productTitle underline">{product.title}</span>
          </Link>

          <span>₹ {product.price}</span>
          <span className="font-semibold  outline outline-2 outline-amber-50 bg-yellow-300 hover:bg-yellow-500 transition cursor-pointer px-[1rem] p-[.3rem] rounded-md hover:text-slate-50 text-slate-900 text-[1rem] max-w-[6rem]" 
          onClick={()=>dispatch({type:'removeProduct', payload: {
            quantity:refQuantity.current.value,
            productID: product.id,
            productCategory: product.category

            }}) 
}
          >Remove</span>
        </div>
      </div>

      <div className="productQuantityUpdateController flex flex-col gap-[.5rem] font-semibold text-[2rem] items-center">
        <i onClick={()=>dispatch({type:'increaseQuantity', payload: {
                          quantity:refQuantity.current.value,
                          productID: product.id,
                          productCategory: product.category

                          }}) 
        } className=" fa-sharp fa-solid fa-plus   outline outline-2 outline-amber-50 bg-yellow-300 hover:bg-yellow-500 transition cursor-pointer px-[.8rem] p-[.3rem] rounded-full hover:text-slate-50 text-slate-900 text-[1.5rem] max-w-[6rem]"></i>
        {/* <span className="">{product.quantity}</span> */}
        <input  className=" text-slate-200  bg-transparent outline-2  py-[.2rem]  p-[.5rem] w-[5rem] h-[3rem] rounded-md text-center" ref={refQuantity} type="text" readOnly={true} value={product.quantity}/>
        <i onClick={()=>dispatch({type:'decreaseQuantity', payload: {
                          quantity:refQuantity.current.value,
                          productID: product.id,
                          productCategory: product.category

                          }}) 
        } className="fa-sharp fa-solid fa-minus font-semibold  outline outline-2 outline-amber-50 bg-yellow-300 hover:bg-yellow-500 transition cursor-pointer px-[.8rem] p-[.3rem] rounded-full hover:text-slate-50 text-slate-900 text-[1.5rem] max-w-[6rem]"></i>
      </div>

    </div>
  );



}