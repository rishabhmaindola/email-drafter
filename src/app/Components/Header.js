"use client"
import React from 'react';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserNav } from '../Components/User/UserNav';
import { Toggle } from '@/components/Toggle';


function Header() {

    return (
        <div className='flex flex-col gap-3 items-center justify-center'>
            <div className="flex-1 w-full space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <div className="flex items-center space-x-5">
                        <Toggle />
                        <UserNav />
                        {/* <Button>Download</Button> */}
                    </div>
                </div>
                <Tabs  className="space-y-4">
                    <TabsList >
                        <TabsTrigger value="overview" ><Link href='/Dashboard'>Overview</Link></TabsTrigger>
                        {/* <TabsTrigger value="analytics">
                            <Link href='/Dashboard/Analytics'>Analytics</Link>
                        </TabsTrigger>
                        <TabsTrigger value="reports">
                            <Link href='/Dashboard/Reports'>Reports</Link>
                        </TabsTrigger> */}
                        <TabsTrigger value="notifications">
                        <Link href='/Dashboard/Guide'>Guide</Link>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </div>
    );
}

export default Header;