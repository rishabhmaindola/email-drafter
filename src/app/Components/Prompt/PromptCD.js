"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
// import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MdDelete } from "react-icons/md";

function PromptCD() {

    const { toast } = useToast();
    const [customPrompt, setCustomPrompt] = useState('');
    const [prompts, setPrompts] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null); // State to track the hovered badge index


    useEffect(() => {
        fetchPrompts();
    }, []);

    const fetchPrompts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/prompt/prompts');
            setPrompts(response.data);
        } catch (error) {
            console.error('Error fetching prompts:', error);
        }
    };


    const handleNewPrompt = async () => {
        try {
            const response = await axios.post('http://localhost:5000/prompt/new', { prompt: customPrompt });
            if (response.status === 200) {
                setCustomPrompt('');
                toast({
                    title: "Prompt Saved Succesfully",
                    description: "New prompt added to the checklist.",
                });
                fetchPrompts();
            } else {
                toast({
                    variant: "error",
                    title: "Error saving the Prompt",
                    description: "Network Error!",
                });
            }
        } catch (error) {
            console.error('Error saving custom prompt:', error);
            toast({
                variant: "error",
                title: "Error saving the Prompt",
                description: "Internal Server Error!",
            });
        }
    };;

    const handlePromptChange = (event) => {
        setCustomPrompt(event.target.value);
    };

    const handleDeletePrompt = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/prompt/${id}`);
            if (response.status === 200) {
                toast({
                    title: "Prompt Deleted Successfully",
                    description: "Prompt removed from the checklist.",
                });
                fetchPrompts();
            } else {
                toast({
                    variant: "error",
                    title: "Error deleting the Prompt",
                    description: "Network Error!",
                });
            }
        } catch (error) {
            console.error('Error deleting prompt:', error);
            toast({
                variant: "error",
                title: "Error deleting the Prompt",
                description: "Internal Server Error!",
            });
        }
    };

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };


    return (
        <Card className="flex flex-col w-[40%]  items-start shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl">Custom Prompt</CardTitle>
                <CardDescription>
                    Add your custom prompt sugesstion.
                </CardDescription>
            </CardHeader>
            <CardContent className="w-full">
                <div className="grid border rounded-md  ">
                    <Input type="text" id="customprompt" placeholder="Add new prompt" onChange={handlePromptChange} />
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button className="flex-1 hover:bg-green-500 hover:text-white" onClick={handleNewPrompt}>Save</Button>
            </CardFooter>
            <CardFooter>
                <ScrollArea className=" p-2 h-[100%] w-[100%]" >
                    <div>
                        {prompts.map((prompt, index) => (
                            <Badge
                                key={prompt._id}
                                className=' m-2 p-2 cursor-pointer'
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                            <span className='flex items-center justify-center'>
                                <p>{prompt.label}</p>
                                {hoveredIndex === index && (
                                    <button className=" text-red-500 hover:text-red-700" onClick={() => handleDeletePrompt(prompt._id)}>
                                    <MdDelete className='text-lg' />
                                    </button>
                                )}
                            </span>
                            </Badge>
                        ))}
                    </div>
                </ScrollArea>
            </CardFooter>
        </Card>
    )
}

export default PromptCD;