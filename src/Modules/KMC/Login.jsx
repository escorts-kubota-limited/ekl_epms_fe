import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useAuth } from "@/AuthProvider";
import { IMAGE_PUBLIC_URL } from "@/URL";


export default function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { logIn } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await logIn(input);
      console.log(response);
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        alert("No Server Response");
      } else if (err.response?.status === 403) {
        alert("Invalid Credentials");
      } else if (err.response?.status === 400) {
        alert("Username/Password is missing");
      }
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    //console.log(input);
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen isolate bg-teal-theme bg-opacity-25">
      <div className=" flex justify-center items-center pt-5">
      <img src={`${IMAGE_PUBLIC_URL}/newlogo`} className="m-5" />
      </div>
      <div className="mx-auto max-w-2xl ">
        <h2 className="text-3xl font-bold tracking-tight text-black-500 sm:text-4xl">
          Login
        </h2>
      </div>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
        onSubmit={handleLogin}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="username"
              className="block text-xl font-semibold leading-6 text-gray-900 "
            >
              Username
            </label>
            <div className="mt-1.5">
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="abc.def@escortskubota.com"
                onChange={handleInput}
              />
            </div>
            <label
              htmlFor="password"
              className="block text-xl font-semibold leading-6 text-gray-900 mt-4"
            >
              Password
            </label>
            <div className="mt-1.5">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter Your Password"
                onChange={handleInput}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className=" mt-10 block w-full rounded-md bg-teal-theme px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          // onClick={handleSubmit}
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}
