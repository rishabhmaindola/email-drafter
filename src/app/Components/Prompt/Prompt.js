"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoMdRefresh } from "react-icons/io";

const items = [
    {
        id: "1",
        label: "Keep It Consise",
        description: "Keep the email short and get straight to the point to make your pitch quickly.",
    },
    {
        id: "2",
        label: "Be Genuine and Professional",
        description: "Finally, be genuine, professional, and respectful in your email. Avoid using aggressive or pushy language, and always maintain a professional tone.",
    },
    {
        id: "3",
        label: "Capture Attention with a Strong Subject Line",
        description: "The subject line is the first thing the recipient will see, so make it attention-grabbing and relevant to their interests or pain points. It should entice them to open the email.",
    },
    {
        id: "4",
        label: "Reference Specific Details About the Company",
        description: "Demonstrate that you've done your homework by referencing specific aspects of the company, such as recent achievements, projects, or initiatives. This shows that you're genuinely interested in their business.",
    },
    {
        id: "5",
        label: "Tailor the Message to Their Needs",
        description: "Customize the content of your email to address the company's unique challenges, goals, or pain points. Explain how your product or service can help solve their problems or achieve their objectives.",
    },
    {
        id: "6",
        label: "Pitch them for website renovation",
        description: "To fix the website flaws and make new Ui with new features.",
    },
    {
        id: "7",
        label: "Relevance",
        description: "The email content should be relevant to the recipient's context and interests. Highlighting how your product or service can solve their specific problems or improve their situation makes the email more compelling.",
    },
];

const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
});

export default function Prompt({ onSelectedItemsChange }) {
    const { toast } = useToast();
    const [prompts, setPrompts] = useState([]);

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            items: [],
            prompts: [],
        },
    });

    useEffect(() => {
        fetchPrompts();
    }, []);

    const fetchPrompts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/prompt/prompts');
            const formattedPrompts = response.data.map((prompt) => ({
                id: prompt._id,
                label: prompt.label
            }));
            setPrompts(formattedPrompts);
        } catch (error) {
            console.error('Error fetching prompts:', error);
        }
    };

    const handleSelectItem = (itemId) => {
        const { items: selectedItems } = form.getValues();
        if (selectedItems.includes(itemId)) {
            form.setValue("items", selectedItems.filter(item => item !== itemId));
        } else {
            form.setValue("items", [...selectedItems, itemId]);
        }
    };

    const handleSelectPrompt = (promptId) => {
        const { prompts: selectedPrompts } = form.getValues();
        if (selectedPrompts.includes(promptId)) {
            form.setValue("prompts", selectedPrompts.filter(prompt => prompt !== promptId));
        } else {
            form.setValue("prompts", [...selectedPrompts, promptId]);
        }
    };


    const handleSubmit = (data) => {
        const selectedItemsData = items.filter(item => data.items.includes(item.id));
        const selectedPromptsData = prompts.filter(prompt => data.prompts.includes(prompt.id));

        const selectedItems = [...selectedItemsData, ...selectedPromptsData];

        onSelectedItemsChange(selectedItems);

        toast({
            title: "You submitted the following values:",
            description: (
                <div>
                    <p>Selected items:</p>
                    <ul>
                        {selectedItems.map((item) => (
                            <li key={item.id}>{item.label}</li>
                        ))}
                    </ul>
                </div>
            ),
        });
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <ScrollArea className=" h-[70%] ">
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">Select the Qualities.</FormLabel>
                            <FormDescription >
                                Please select the attributes of the email.
                            </FormDescription>
                        </div>
                        {items.map((item) => (
                            <FormItem
                                key={item.id}
                                className="flex flex-row items-center space-x-3 space-y-0"
                            >
                                <FormControl>
                                    <Checkbox
                                        checked={form.watch("items").includes(item.id)}
                                        onCheckedChange={() => handleSelectItem(item.id)}
                                    />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                    <HoverCard>
                                        <HoverCardTrigger>{item.label}</HoverCardTrigger>
                                        <HoverCardContent>
                                            {item.description}
                                        </HoverCardContent>
                                    </HoverCard>
                                </FormLabel>
                            </FormItem>
                        ))}
                        <FormMessage />
                    </FormItem>
                    <FormItem>
                            <FormDescription className="flex p-2 items-center justify-between">
                                Custom Prompts<IoMdRefresh className='cursor-pointer mx-2'  onClick={()=> fetchPrompts()}/>
                            </FormDescription>
                        {prompts.map((prompt) => (
                            <FormItem
                                key={prompt.id}
                                className="flex flex-row items-center space-x-3 space-y-0"
                            >
                                <FormControl>
                                    <Checkbox
                                        checked={form.watch("prompts").includes(prompt.id)}
                                        onCheckedChange={() => handleSelectPrompt(prompt.id)}
                                    />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                    <HoverCard>
                                        <HoverCardTrigger>{prompt.label}</HoverCardTrigger>
                                    </HoverCard>
                                </FormLabel>
                            </FormItem>
                        ))}
                        <FormMessage />
                    </FormItem>
                </ScrollArea>

                <Button type="submit">Add</Button>
            </form>
        </Form>
    );
}