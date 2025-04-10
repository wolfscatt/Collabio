import Register from "@/pages/Register";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-fixed bg-cover bg-no-repeat w-full min-h-screen">
      <h1 className="text-xl ">Collabio</h1>
      <Register />
    </div>
  );
}
