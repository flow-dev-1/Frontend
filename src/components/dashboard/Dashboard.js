import { Outlet } from "react-router-dom";
import './dashboard.css'
import Sidebar from "./sidebar/SideBar";

export default function Dashboard() {
    return (
        <div className="dashboard">
<div className="dashboard">
      <Sidebar />
      <div className="dashboard-content mt-5 p-4" style={{marginLeft: "250px", }}>
       <Outlet />
      </div>
    </div>
        </div>
    )
}



