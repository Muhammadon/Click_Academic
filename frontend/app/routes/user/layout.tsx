import { Outlet } from "react-router";



export function UserLayout() {


  return (

<>

{/* layout tidak mengunakna sidebar , karena ada halaman yg tidk butuh */}
<Outlet/>


</>
  
  );
  
}
