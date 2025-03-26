import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const Payment = () => {
  const stripPromise = loadStripe(
    "pk_test_51QWtThSJRC1GTmb5NC0FBhvU7lolykX9Snbf9bLwQ7aYJ4raisvPB2PCAJzCMqjmOsTn8FbuLmm7JHepfNNIrTCy004AXoh9Az"
  );
  return (
    <div>
      <Elements stripe={stripPromise}>
        <CheckOutForm />
      </Elements>
    </div>
  );
};

export default Payment;
