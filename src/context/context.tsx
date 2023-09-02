"use client";
import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";

export const ctxCart = createContext<any>(null);

const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [quantity, setQuantity] = useState(0);
  const cartInitializer = {
    cart: [],
  };
  const [state, dispatch] = useReducer(cartReducer, cartInitializer);
  useEffect(() => {
    let cart = localStorage.getItem("cart-data") as string;
    if (cart === null) {
      localStorage.setItem("cart-data", JSON.stringify(state.cart));
    } else {
      cartInitializer.cart = JSON.parse(cart);
      setQuantity(state.cart.length);
    }
  });

  useEffect(() => {
    localStorage.setItem("cart-data", JSON.stringify(state.cart));
    setQuantity(state.cart.length);
  }, [state.cart]);

  useEffect(() => {
    if (state.cart.length !== 0) {
      setQuantity((quantity) => (quantity = state.cart.length));
      // console.log(quantity);
    }
  }, [state.cart, quantity]);

  return (
    <ctxCart.Provider value={{ state, dispatch, quantity }}>
      {children}
    </ctxCart.Provider>
  );
};

export default ContextWrapper;

function findProducts(allItems: any, itemToFind: any) {
  for (let index = 0; index < allItems.length; index++) {
    const element = allItems[index];
    if (element.productId === itemToFind.productId) {
      return element;
    }
  }
}

export function cartReducer(state: any, action: any) {
  if (action.payload === "addToCart") {
    let responseData = findProducts(state.cart, action.data);
    // console.log("found previous item:", responseData, state.cart);
    if (!responseData) {
      return {
        cart: [...state.cart, action.data],
      };
    } else {
      let addInCartProduct = state.cart.find(
        (item: any) => item.productId === action.data.productId
      );

      addInCartProduct.quantity =
        addInCartProduct.quantity + action.data.quantity;
      // console.log("found ", addInCartProduct);
      const cartWithout = state.cart.filter(
        (item: any) => item.productId !== responseData.productId
      );
      // console.log("found ", cartWithout);
      
      return {
        cart: [...cartWithout, addInCartProduct],
      };
    }
  } else if (action.payload === "removeFromCart") {
    let removeFromCartProduct = state.cart.filter(
      (item: any) => item.productId !== action.data.productId
    );

    return {
      cart: [...removeFromCartProduct],
    };
  } else if (action.payload === "updateCart") {
    // console.log(action.data)
    for (const i of state?.cart) {
      if (i.productId === action.data.productId) {
        // console.log("in ");
        if (action.data.increase === false) {
          i.quantity = i.quantity - 1;
          break;
        } else {
          i.quantity = i.quantity + 1;
          break;
        }
      }
    }    
    return {
      cart: [...state.cart]
    };
  }

  return state;
}
