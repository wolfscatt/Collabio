// components/Loading.tsx
import React from "react";

const Loading = () => {
  return (
    <div className="flex-1 mt-[20vh] flex items-center justify-center">
      <div className="w-[10vw] h-[10vw] rounded-full animate-spin">
        <img src="/images/collabio-logo-c.png" alt="loading" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Loading;
