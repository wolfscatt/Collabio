import React from "react";
import RegInput from "../../components/RegInput";

const Register = () => {
  return (
    <div className="min-h-screen w-full bg-register bg-fixed bg-cover bg-no-repeat flex items-center justify-center">
      <div className="bg-specPink-300 border-r-8 border-b-8 border-specPink-200 backdrop-blur-sm p-4 rounded-3xl w-96 mt-16">
        <h1 className="text-2xl font-semibold text-center text-black">
          Sign up
        </h1>
        <form className="space-y-4 mb-16">
        <RegInput title="Name" id="name" type="text" placeHolder="Enter Your Name" />
        <RegInput title="Password" id="password" type="password" placeHolder="Enter Your Password" />
          
          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-2 rounded-lg hover:bg-purple-900 transition-colors flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
