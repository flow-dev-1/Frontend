import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './common-pages/navbar/Navbar';

export default function RootLayout() {
    const location = useLocation(); 
    return (
        <div className={location.pathname !== '/dashboard' ? "root-layout" : ""}>
            <Navbar />
            <Outlet />
        </div>
    );
}
