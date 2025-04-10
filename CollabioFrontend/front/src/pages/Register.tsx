import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen w-full bg-register bg-fixed bg-cover bg-no-repeat flex items-center justify-center">
      <div className="bg-specPink-300 border-r-8 border-b-8 border-specPink-200 backdrop-blur-sm p-4 rounded-3xl w-96 mt-16">
        <h1 className="text-2xl font-semibold text-center text-black">
          Sign up
        </h1>
        <form className="space-y-4 mb-16">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm text-black pl-4">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 rounded-lg border-2 border-specPurple-300 bg-transparent text-black placeholder-gray-400 focus:outline-none focus:border-purple-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="space-y-2 mb-8">
            <label htmlFor="password" className="block text-sm text-black pl-4">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg border-2 border-specPurple-300 bg-transparent text-black placeholder-gray-400 focus:outline-none focus:border-purple-500"
              placeholder="Enter your password"
            />
          </div>
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
