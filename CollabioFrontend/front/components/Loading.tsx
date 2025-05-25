// components/Loading.tsx
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loading;
