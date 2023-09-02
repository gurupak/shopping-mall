import ContextWrapper from "@/context/context";
import CartChild from "../components/views/CartView/CartChild";


const Cart = () => {
  return (
    <ContextWrapper>
      <CartChild />
    </ContextWrapper>
  );
};

export default Cart;
