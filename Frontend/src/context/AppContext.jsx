import { useContext, createContext, useState, useEffect } from "react";
import { dummyProducts } from "../assets/greencart_assets/assets";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export const AppContext = createContext();
axios.defaults.withCredentials = true;
export const AppContextProvider = ({ children }) => {
  const [showLogin , setShowLogin] = useState(false);
  const [user , setUser] = useState(null);
  const [products , setProducts] = useState([]);
  const [cartItems , setCartItems] = useState({});
  const [searchQuery , setSearchQuery] = useState("");
  const [isSeller , setIsSeller] = useState(false); 
  const currency = import.meta.env.VITE_CURRENCY;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  
    const AddtoCart = (ItemID)=>{
    const cartData = structuredClone(cartItems);
    if(cartData[ItemID]){
      cartData[ItemID] += 1;
    }else{
      cartData[ItemID] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to Cart")
  }

  const updateCart = (ItemID , quantity)=>{
    const cartData = structuredClone(cartItems);
    cartData[ItemID] = quantity;
    setCartItems(cartData)
    toast.success("Cart Updated");
  }
  
  const removeCart = (itemId)=>{
    const cartData = structuredClone(cartItems);
    if(cartData[itemId]){
      cartData[itemId] -= 1;
      console.log(cartData[itemId]);
      if(cartData[itemId] == 0){
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success("Removed from Cart")
  }
  
  const getCartCount = ()=>{
    let totalCount = 0;
    for (let item in cartItems){
       totalCount += cartItems[item];
    }
    return Math.floor(totalCount);
  }

  const getCartTotalAmount = ()=>{
    let totalAmount = 0;
    for(let item in cartItems){
      const product = products.find((product)=> product._id == item);
      totalAmount += product.offerPrice * cartItems[item];
    }
    return totalAmount;
  }
  const value = {
    showLogin ,
    setShowLogin,
    user ,
    setUser,
    products,
    currency,
    cartItems,
    AddtoCart,
    updateCart,
    removeCart,
    setSearchQuery,
    searchQuery,
    navigate,
    getCartCount,
    getCartTotalAmount,
    isSeller,
    setIsSeller,
    backendUrl,
    axios,
    setCartItems
  };
  const fetchProducts = async()=>{
    try {
    const {data} = await axios.get(backendUrl + '/api/product/list');
    if(data.success) setProducts(data.products);
    } catch (error) {
      console.log(error.message);
    }
  }
  const authUser = async()=>{
    try {
   const {data} = await axios.get(backendUrl + '/api/user/isAuth');
   if(data.success)setUser(data.user);
    } catch (error) {
      console.log(error.message);
    }
  }

  const authSeller = async()=>{
    try {
      const { data } = await axios.get(backendUrl + '/api/seller/isSellerAuth');
      if(data.success){
        setIsSeller(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
     authUser();
     authSeller();
     fetchProducts();
     
  },[])
  
  useEffect(()=>{
    const updateCart = async()=>{
        try {
          const {data} = await axios.post(backendUrl + '/api/cart/' , {userId : user._id , cartItems});
          if(!data.success){
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message)
        }
    }

    if(user){
      updateCart();
    }
  },[cartItems])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
