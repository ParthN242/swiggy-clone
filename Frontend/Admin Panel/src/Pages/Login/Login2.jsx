import React from "react";
import BurgerImg from "../../Assets/images.jpeg";

const Login2 = () => {
  return (
    <div>
      <div className="bg-[#E7E4D3] flex justify-center items-center h-screen">
        <div className="w-1/2 h-screen hidden bg-orange-600 lg:flex items-center justify-center ">
          <img
            src="https://pngfile.net/public/uploads/preview/flying-burger-png-image-11703422316sgmhk1o2pu.png"
            alt="Placeholder Image"
            className="object-cover "
          />
        </div>
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-800">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md py-2 px-4 w-full"
              onClick={loginHandler}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login2;
