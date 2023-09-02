import { auth } from "@clerk/nextjs";

const CheckoutPage = () => {
    const { userId } = auth()
    console.log(userId)
  return <div>CheckoutPage</div>;
};

export default CheckoutPage;

