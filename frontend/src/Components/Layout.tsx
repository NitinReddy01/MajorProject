import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="p-6 bg-slate-400 flex-grow">
        <Outlet />
      </div>
    </div>
  )
}
