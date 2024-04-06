"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
// import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/Toggle";
import { UserNav } from "../Components/User/UserNav";
import { IoMdArrowRoundBack } from "react-icons/io";
import PromptCD from '../Components/Prompt/PromptCD';

function Settings() {

    const { toast } = useToast();

    const [apiKey, setApiKey] = useState('');

    const handleApiKeyChange = (e) => {
        setApiKey(e.target.value);
    };


    const handleSaveApiKey = () => {
        if (!apiKey) {
            toast({
                variant: "destructive",
                title: "API key required",
                description: "Please enter your API key.",
            });
            return;
        }

        try {
            localStorage.setItem('apiKey', apiKey);
            toast({
                title: "API key saved securely!",
                description: "Your API key is saved securely in local storage.",
            });
        } catch (error) {
            console.error("Error saving API key to local storage:", error);
            toast({
                variant: "error",
                title: "Error saving API key",
                description: "An error occurred while saving the API key to local storage.",
            });
        }
    };

    const handleDeleteApiKey = () => {
        localStorage.removeItem('hashedOpenApiKey');
        setApiKey('');
        toast({
            title: "API key deleted!",
            description: "Your API key has been deleted from localStorage."
        });
    };

    return (
        <div className="flex flex-col w-full h-screen space-y-4 p-8 pt-6">
            <div className="flex h-[15%] items-center justify-between space-y-2">
                <div className="flex h-5 items-center space-x-4 text-sm">
                    <div>
                        <Button className="rounded-full"><Link href='/Dashboard'><IoMdArrowRoundBack /></Link></Button>
                    </div>
                    <Separator orientation="vertical" />
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                    </div>
                </div>
                <div className="flex items-center space-x-5">
                    <Toggle />
                    <UserNav />
                </div>
            </div>
            <Separator className='border' />
            <Card className="flex flex-col w-[40%]  items-start shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl">Setup your OpenAI API key</CardTitle>
                    <CardDescription>
                        Change Update your api key
                    </CardDescription>
                </CardHeader>
                <CardContent className="w-full">
                    <div className="grid border rounded-md border-green-500 ">
                        <Input id="apiKey" type="password" placeholder="Your OpenAI API KEY" value={apiKey} onChange={handleApiKeyChange} />
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button className="flex-1 hover:bg-green-500 hover:text-white" onClick={handleSaveApiKey}>Save</Button>
                    <Button className="flex-1  hover:bg-red-500 hover:text-white" onClick={handleDeleteApiKey}>Delete </Button>
                </CardFooter>
            </Card>
            <PromptCD />
        </div>
    )
}

export default Settings;
