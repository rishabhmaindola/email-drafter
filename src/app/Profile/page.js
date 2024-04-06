"use client"
import axios from 'axios';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Toggle } from "@/components/Toggle";
import { UserNav } from "../Components/User/UserNav";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Profile() {
    const { toast } = useToast();
    const form = useForm({
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
    
            const response = await axios.put('http://localhost:5000/user/update', {
                username: data.username,
                email: data.email,
            }, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
    
            if (response.status === 200) {
                const { username, email } = response.data.user;
                const userData = JSON.parse(localStorage.getItem('user'));
                userData.username = username;
                userData.email = email;
                localStorage.setItem('user', JSON.stringify(userData));
                toast({
                    title: "Profile Updated Successfully",
                    description: "Your profile information has been updated.",
                });
            } else {
                toast({
                    variant: "error",
                    title: "Error updating profile",
                    description: "Failed to update profile information.",
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast({
                variant: "error",
                title: "Error updating profile",
                description: "Internal Server Error!",
            });
        }
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
                        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
                    </div>
                </div>
                <div className="flex items-center space-x-5">
                    <Toggle />
                    <UserNav />
                </div>
            </div>

            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="New Username" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name. It can be your real name or a
                                    pseudonym. You can only change this once every 30 days.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="New Email" {...field} />
                                </FormControl>
                                <FormDescription>
                                    You can manage verified email addresses in your{" "}
                                    <Link href="/examples/forms">email settings</Link>.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Update profile</Button>
                </form>
            </Form>
        </div>
    );
}
