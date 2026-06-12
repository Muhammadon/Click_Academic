import { Outlet } from "react-router";
import Sidebar from "~/component/sidebar";



export function KonsultasiLayout() {


  return (
    <div className=" flex flex-col md:flex-row">

      <Sidebar />


      <main className="overflow-y-scroll overflow-x-hidden  w-full">
        <Outlet />
      </main>

    </div>);

}
