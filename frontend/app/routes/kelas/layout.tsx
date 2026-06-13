import { Outlet } from "react-router";
import Sidebar from "~/component/sidebar";



export default function KelasLayout() {


  return (

    <div className=" flex flex-col md:flex-row max-h-screen">

      <Sidebar />


      <main className="overflow-y-scroll overflow-x-hidden  w-full">
        <Outlet />
      </main>

    </div>

  );

}
