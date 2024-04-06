import React from 'react';
import Header from '../Components/Header';
import { Toaster } from "@/components/ui/toaster"

const DashboardLayout = ({ children }) => {
    return (
        <div>
        <Header/>
            <div>
                {children}
            <Toaster />
            </div>
        </div>
    );
};

export default DashboardLayout;
