/**
 * lebih ke halaman profil user
 */

import { Outlet } from "react-router";
import type { Route } from "../+types/home";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}



export default function User() {


  return (
    <>
    <p>User </p>


    </>
  )
}
