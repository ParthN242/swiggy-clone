import { useEffect, useState } from "react";
import LoginImage from "../../Assets/admin-login.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authSuccess } from "../../redux/appSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      toast.error("Please enter email and password");
      return;
    } else if (!email) {
      toast.error("Please enter email ");
      return;
    } else if (!password) {
      toast.error("Please enter password");
      return;
    }
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      toast.success("Login successful");
      navigate("/dashboard");
      dispatch(authSuccess(data.admin));
    } catch (error) {
      console.log("error: ", error);
      toast.error("Invalid credentials");
    }
  };

  useEffect(() => {
    if (auth.admin) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <div
      className="h-[100vh] w-full flex items-center justify-center "
      style={{
        background:
          "linear-gradient(135deg, rgb(195 90 33) 0%, #ff542d 5%, rgb(255 107 0) 20%, rgb(234 117 6) 50%, rgb(255 107 0) 78%, rgb(255 98 0) 95%",
      }}
    >
      <div className="w-[75%] h-[75%] flex">
        <div className="w-[50%] h-full bg-red-50/10 ">
          <img
            src={LoginImage}
            alt="login image"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="w-[50%] h-full flex items-center relative">
          <form
            className="bg-white w-[480px] p-14 pb-24 flex flex-col gap-6 relative -left-20 rounded-sm"
            onSubmit={loginHandler}
          >
            <div>
              <h1 className="text-4xl text-center font-semibold">Login</h1>
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                // required
                placeholder="E-mail"
                className="border-b border-slate-500 p-2 w-full outline-none"
                autoComplete="off"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                // required
                placeholder="password"
                className="border-b border-slate-500 p-2 w-full outline-none"
                autoComplete="off"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button className="bg-orange-500 p-3 w-full text-white rounded-md">
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
