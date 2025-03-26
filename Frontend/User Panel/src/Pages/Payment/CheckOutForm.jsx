import {
  useElements,
  useStripe,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../Redux/appSlice";

const CheckOutForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const {
    cart: { cartItems, resDetail },
    user,
  } = useSelector((state) => state.app);

  const [processing, setProcessing] = useState(false);

  if (!stripe && !elements) {
    return <div>Loading...</div>;
  }

  const paymentSubmitHandler = async (e) => {
    e.preventDefault();

    if (!stripe && !elements) {
      return;
    }
    try {
      setProcessing(true);
      const { data } = await axios.post("/order/create-payment-intent", {
        cartItems,
      });

      const client_secret = data.session_id;
      const totalPayment = data.totalPayment;

      const paymentPromise = stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });
      toast.promise(paymentPromise, {
        success: "Payment successful",
        pending: "Payment is processing",
        error: "Error while payment",
      });

      const result = await paymentPromise;

      if (result.error) {
        console.error(result.error.message);
        // toast.success("Payment failed: " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const orderItems = cartItems.map((item) => ({
          food: item._id,
          quantity: item.quantity,
        }));
        await axios.post("/order", {
          resDetail: resDetail._id,
          cartItems: orderItems,
          paymentId: result.paymentIntent.id,
          paymentStatus: result.paymentIntent.status,
          totalPayment,
        });
        navigate("/my-account/orders");
        dispatch(clearCart());
        // toast.success("Payment successful!");
      } else {
        // toast.error("Error While Payment ");
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error while payment");
    } finally {
      setProcessing(false);
    }
  };
  return (
    <div className="w-full h-[90vh] flex items-center justify-center bg-slate-500/10">
      <form
        className="w-[40%] max-md:w-[80%] shadow-lg py-8 bg-white rounded-xl"
        onSubmit={paymentSubmitHandler}
      >
        <h1 className="text-center text-3xl mb-8">Payment</h1>
        <div className="mx-8 flex flex-col gap-5">
          <CardNumberElement className="border border-slate-300 rounded-lg p-4" />
          <CardExpiryElement className="border border-slate-300 rounded-lg p-4" />
          <CardCvcElement className="border border-slate-300 rounded-lg p-4" />
          <button
            className="bg-green-600 text-white text-xl p-2 rounded-lg disabled:bg-green-900/80"
            disabled={processing}
          >
            PAY
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutForm;
