import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();
const getcart = () => {
  let localCartData = localStorage.getItem("nayancart");
  if (localCartData) {
    return JSON.parse(localCartData);
  } else {
    return [];
  }

};
const initialState = {
  cart: getcart(),
  total_item: "",
  total_amount: "",
  shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const removeAllCart=()=>{
    dispatch({type:"REMOVE_ALL_CART"})
  }
  
  const setIncrease =(id)=>{
    dispatch({type:"SET_INCREMENT",payload:id})
  } 
  const setDecrease =(id)=>{
    dispatch({type:"SET_DECREMENT",payload:id})
  }
  useEffect(() => {
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
    localStorage.setItem("nayancart", JSON.stringify(state.cart));
  }, [state.cart]);



  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem , setIncrease,setDecrease, removeAllCart}}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
