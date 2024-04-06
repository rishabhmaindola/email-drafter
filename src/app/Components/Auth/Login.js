"use client"
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {

    const router = useRouter();

    const [AuthToggle, setAuthToggle] = useState(false);
    const [UserInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [LoginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });
    const [passwordMismatchError, setPasswordMismatchError] = useState("");
    const [fillAllFieldsError, setFillAllFieldsError] = useState("");
    const [loginFailedError, setLoginFailedError] = useState("");


    const handleToggle = () => {
        setAuthToggle(!AuthToggle);
    };

    const handleSignup = async () => {
        try {
            if (!UserInfo.username || !UserInfo.email || !UserInfo.password || !UserInfo.confirmPassword) {
                setFillAllFieldsError("Please fill in all fields.");
                return;
            }
            setFillAllFieldsError("");
            if (UserInfo.password !== UserInfo.confirmPassword) {
                setPasswordMismatchError("Passwords do not match.");
                return;
            }
            setPasswordMismatchError("");


            console.log("Form submitted with data:", UserInfo);

            const { username, email, password } = UserInfo;
            const userData = { username, email, password };
            const response = await axios.post('http://localhost:5000/user/signup', userData);

            if (response.status === 201) {
                console.log('User SignUp Successful', response.data);
                setUserInfo({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
            } else {
                console.error('Failed to Sign Up User!');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                console.log('Email address already exists');
            } else {
                console.error('Error:', error);
            }
        }
    };

    const handleSignIn = async () => {
        try {
            if (!LoginInfo.email || !LoginInfo.password) {
                setFillAllFieldsError("Please fill in all fields.");
                return;
            }
            setFillAllFieldsError("");
            console.log("Logging in with data:", LoginInfo);
            const { email, password } = LoginInfo;
            const loginData = { email, password };
            const response = await axios.post('http://localhost:5000/user/login', loginData);

            if (response.status === 200) {
                setLoginFailedError("");
                console.log('User Login Successful', response.data);
                const { token } = response.data;
                const { username, email } = response.data.user;
                const userData = { token, username, email };
                localStorage.setItem('user', JSON.stringify(userData));
                router.push('/Dashboard');
            } else {
                console.error('Failed to login:', response.data.message);
                setLoginFailedError("Login failed. Please try again later.");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setLoginFailedError("Invalid Credentials");
            } else {
                console.error('Error:', error.message);
                setLoginFailedError("Login failed.");
            }
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (AuthToggle === false) {
            setUserInfo(prevState => ({
                ...prevState,
                [id]: value
            }));
        } else {
            setLoginInfo(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
    };


    const googleAuth = () => {

    };


    return (
        <>
            {AuthToggle === false ? (
                <Card className="flex flex-col  items-center shadow-lg">
                    <CardHeader className="flex items-center space-y-1">
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>
                            Enter your email below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid w-full gap-4">
                        <div className="grid items-center justify-center">
                            <Button variant="outline" onClick={googleAuth}>
                                <FcGoogle className="mr-2 h-4 w-4" />
                                Sign Up With Google
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username </Label>
                            <Input id="username" type="text" placeholder="Username" value={UserInfo.username} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" value={UserInfo.email} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">

                            <Label htmlFor="password">Password</Label>

                            <Input id="password" type="password" placeholder="Enter Your Password" value={UserInfo.password} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" placeholder="Confirm Your Password" value={UserInfo.confirmPassword} onChange={handleChange} />
                        </div>
                        {passwordMismatchError && <span className="text-xs text-red-500">{passwordMismatchError}</span>}
                        {fillAllFieldsError && <span className="text-xs text-red-500">{fillAllFieldsError}</span>}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-1 w-full">
                        <Button onClick={handleSignup} className="w-full">Create account</Button>
                        <div className='flex gap-1'>
                            <h2 className='text-sm'>Already a user, Please</h2>
                            <button onClick={handleToggle} className='text-sm text-blue-500' >Sign In</button>
                        </div>
                    </CardFooter>
                </Card>

            ) : (
                <Card className="flex flex-col items-center shadow-lg">
                    <CardHeader className="flex items-center space-y-1">
                        <CardTitle className="text-2xl">Sign In</CardTitle>
                        <CardDescription>
                            Sign In to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid w-full gap-4">
                        <div className="grid items-center justify-center">
                            <Button variant="outline">
                                <FcGoogle className="mr-2 h-4 w-4" />
                                Sign In With Google
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        {/* <div className="grid gap-2">
                            <Label htmlFor="name">Username</Label>
                            <Input id="name" type="text" placeholder="Username" value={LoginInfo.username} onChange={handleChange} />
                        </div> */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" value={LoginInfo.email} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Enter Your Password" value={LoginInfo.password} onChange={handleChange} />
                        </div>
                        {loginFailedError && <p className="text-xs text-red-500">{loginFailedError}</p>}
                        {fillAllFieldsError && <span className="text-xs text-red-500">{fillAllFieldsError}</span>}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-1 w-full">
                        <Button onClick={handleSignIn} className="w-full">Sign In</Button>
                        <div className='flex gap-1'>
                            <h2 className='text-sm'>Didn't have an account, Please</h2>
                            <button onClick={handleToggle} className='text-sm text-blue-500' >Sign Up</button>
                        </div>
                    </CardFooter>
                </Card>
            )}
        </>
    );
}
