import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-[#0B1121] flex items-center justify-center p-0 md:p-6 font-sans">
            <div className="w-full h-screen md:h-auto max-w-md bg-[#131B2F] md:rounded-[40px] md:border md:border-slate-800 shadow-2xl overflow-hidden relative">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-1.5 bg-slate-700 rounded-full hidden md:block"></div>
                
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;