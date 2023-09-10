import ContextWrapper from "@/context/context";
import CheckoutState from "../components/views/SubComponents/CheckoutState";

const CheckoutPage = () => {
  return (
    <ContextWrapper>
      <CheckoutState />
    </ContextWrapper>
  );
};

export default CheckoutPage;
