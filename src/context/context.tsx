"use client";
import BAST_PATH_API from "@/app/components/shared/BasePath";
import { useAuth } from "@clerk/nextjs";
import { ConsoleLogWriter } from "drizzle-orm";
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
  const cartInitializer: any = [];
  const [cartArray, setCartArray] = useState<any>(cartInitializer);
  const { userId } = useAuth();

  async function getIPAddress() {
    let myIP = "";
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  }

  function getQuantityFromCart() {
    let qty:number = 0;
    console.log(cartArray.length)
    if (cartArray.length !== 0 && cartArray[0]["cart-products"] !== null) {
      cartArray.forEach((item: any) => {
        qty = qty + item["cart-products"].quantity;
      });
    }
    // setQuantity(qty);
    // console.log("ctx qty", cartArray);
    return qty;
  }
  async function getDataFromDB() {
    const IP = await getIPAddress();
    // console.log(IP)
    let id;
    if (userId) {
      id = userId;
    } else {
      id = IP;
    }
    const response = await fetch(`${BAST_PATH_API}/api/cartfunc?clerkid=${id}`);
    let dataToSave = await response.json();
    // console.log("cart data", dataToSave);
    if (dataToSave.cartAllData.length === 0) {
      const response = await fetch(`${BAST_PATH_API}/api/cartfunc`, {
        method: "POST",
        body: JSON.stringify({
          name: "Temp",
          clerkid: id,
          phone: "111-111-1111",
          email: "temp@temp.com",
        }),
      });
      if (response.status === 200) {
        const resp = await fetch(`${BAST_PATH_API}/api/cartfunc?clerkid=${id}`);
        dataToSave = await resp.json();
      }
    }
    setCartArray(dataToSave.cartAllData);
    
    let qty = 0;
    if (
      dataToSave.cartAllData.length !== 0 &&
      dataToSave.cartAllData[0]["cart-products"] !== null
     )
      dataToSave.cartAllData.forEach((item: any) => {
        qty = qty + item["cart-products"].quantity;
      });    
    setQuantity(qty);
  }
  async function dispatch(payload: string, data: any) {
    if (payload === "addToCart") {
      data.id = cartArray[0].users.id;
      const response = await fetch(`${BAST_PATH_API}/api/cartfunc`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      // console.log(await response.json());
    }
    if (payload === "removeFromCart") {
      const response = await fetch(`${BAST_PATH_API}/api/cartfunc`, {
        method: "DELETE",
        body: JSON.stringify(data),
      });
      // console.log(await response.json());
    }
    if (payload === "updateCart") {
      if (data.increase === false) {
        data.quantity = data.quantity - 1;
      } else {
        data.quantity = data.quantity + 1;
      }
      const response = await fetch(`${BAST_PATH_API}/api/cartfunc`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      // console.log(await response.json());
    }

    getDataFromDB();
  }
  useEffect(() => {
    getDataFromDB();
  }, []);

  // const [state, dispatch] = useReducer(cartReducer, cartInitializer);
  // useEffect(() => {
  //   let cart = localStorage.getItem("cart-data") as string;
  //   if (cart === null) {
  //     localStorage.setItem("cart-data", JSON.stringify(state.cart));
  //   } else {
  //     cartInitializer.cart = JSON.parse(cart);
  //     setQuantity(state.cart.length);
  //   }
  // });

  // useEffect(() => {
  //   localStorage.setItem("cart-data", JSON.stringify(state.cart));
  //   setQuantity(state.cart.length);
  // }, [state.cart]);

  // useEffect(() => {
  //   if (state.cart.length !== 0) {
  //     setQuantity((quantity) => (quantity = state.cart.length));
  //     // console.log(quantity);
  //   }
  // }, [state.cart, quantity]);

  return (
    <ctxCart.Provider
      value={{
        cartArray,
        dispatch,
        quantity,
        setQuantity,
        getQuantityFromCart,
      }}
    >
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
      cart: [...state.cart],
    };
  }

  return state;
}
