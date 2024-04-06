"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Prompt from '../Components/Prompt/Prompt';
import Category from '../Components/Category/Category';

import { Button } from '@/components/ui/button';
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Input } from '@/components/ui/input';
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { MdContentCopy } from "react-icons/md";

function Dashboard() {

  const { toast } = useToast();

  const [showDialog, setShowDialog] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [companyName, setCompanyName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [SiteInfo, setSiteInfo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("");
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');
  const [response, setResponse] = useState('');
  const [responseStatus, setResponseStatus] = useState('');

  const getAboutPageUrl = (url) => {
    const baseUrl = url.endsWith('/') ? url : url + '/';
    return baseUrl + 'about';
  };


  const handleScrape = async () => {
    console.log(websiteUrl);
    setProgress(50);
    try {
      const aboutPageUrl = getAboutPageUrl(websiteUrl);
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        const token = user.token;
        setProgress(65);

        const response = await axios.post('https://email-drafter-server.vercel.app/scrape/info', { websiteUrl, aboutPageUrl }, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          setSiteInfo(response.data);
          setShowDialog(true);
          toast({
            title: "Data scraped successfully",
            description: "Website information has been retrieved.",
          });
          setProgress(80);
          // const concatenatedInput = `${SiteInfo.website} ${SiteInfo.about} ${input2}`;
          // console.log(concatenatedInput);
          // setInput(concatenatedInput);
        } else {
          setResponseStatus(null);
          setProgress(0);
          toast({
            variant: "destructive",
            title: "Error scraping website",
            description: "Failed to retrieve website information.",
            action: <ToastAction altText="Try again" onClick={handleScrape}>Try again</ToastAction>,
          });
        }
      } else {
        console.error('Token not found. Log In Again.');
        setResponseStatus(null);
        setProgress(0);
      }
    } catch (error) {
      console.error('Error scraping website:', error);
      setResponseStatus(null);
      setProgress(0);
      if (error.response && error.response.status === 400) {
          toast({
              variant: "destructive",
              title: "Error scraping website",
              description: "Bad request. Please check your input.",
              action: <ToastAction altText="Try again" onClick={handleScrape}>Try again</ToastAction>,
          });
      } else {
          toast({
              variant: "destructive",
              title: "Error scraping website",
              description: "Please check your network.",
              action: <ToastAction altText="Try again" onClick={handleScrape}>Try again</ToastAction>,
          });
      }
  }
};

  const handlePrompt = () => {
    const concatenatedInput = `${SiteInfo.website} ${SiteInfo.about} ${input2}`;
    const filteredInput = concatenatedInput.replace(/[^\w\s]/gi, ''); // Filter symbols
    console.log(filteredInput);
    setInput(filteredInput);
    setProgress(100);
  };

  const getMessages = async () => {
    const apiKey = localStorage.getItem('apiKey');
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
  
    if (!apiKey || !token) {
      toast({
        variant: "destructive",
        title: "API Key or Token Not Found",
        description: "Please save your API key and log in to get a valid token. Go to settings",
      });
      return;
    }
    const message = "Can you draft an email?";
  
    try {
      console.log("Sending message to server...");

      const response = await axios.post('https://email-drafter-server.vercel.app/openai/create', {
        message: message,
        openapikey: apiKey
      });
  
      console.log("Received response from server:", response.data);
      setResponse(response.data);
    } catch (error) {
      console.log("Error sending message to server:", error);
    }
  }; 

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setProgress(20);
  };

  const handleSelectedItemsChange = (items) => {
    const text = `${items.map((item) => item.label)} are the approach you want to take in the email. Write the personalized email to cold call them for website development on behalf of ${selectedCategory}`;
    setInput2(text);
    console.log("input2:", text);
    setProgress(40);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response)
      .then(() => {
        toast({
          title: "Copied to Clipboard",
          description: "The response has been copied to the clipboard.",
        });
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
        toast({
          title: "Copy Failed",
          description: "Failed to copy the response to the clipboard."
        });
      });
  };

  const handleSave = async () => {
    const payload = {
      method: "POST",
      header: {
        "content": "application/json",
      },
      body: JSON.stringify({
        company: companyName,

      })
    }
    try {
      const response = await post('https://email-drafter-server.vercel.app/save', payload);
      // const data = await response.json();
      if (response.status == 200) {
        setShowSave(false);
      }
    } catch (error) {
      console.log("Error saving Company details", error);
    }
  };

  return (
    <div className='flex gap-3 justify-between'>
      <div className='flex flex-col w-full h-full p-3 gap-5 '>
        <div className='flex w-[100%] justify-between' >
          <div className='flex w-[50%] gap-3 items-center'>
            <div className='flex w-full flex-col'>
              <Input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="Enter website URL"
                className="w-[100%] px-5"
              />
              <Progress value={progress} />
            </div>
            <Button onClick={handleScrape}>Scrape Website</Button>
          </div>
          <div className='flex gap-3 px-5 items-center'>
            <Button onClick={() => setShowSave(true)}>Save</Button>
          </div>
        </div>
        <Separator className='border' />
        <div className='flex w-full gap-5'>
          <div className='flex flex-col w-full gap-3 '>
            <div className=' relative flex h-full'>
              <Textarea
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your message..."
                className="w-full h-[100%] p-5 border "
              />
              <Textarea
                type="text"
                value={response}
                placeholder="Drafted email will generate here"
                className="w-full h-[100%] p-5 border bg-cyan "
                readOnly
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <MdContentCopy onClick={handleCopy} className="absolute right-5 top-5 cursor-pointer text-2xl p-1 hover:bg-black rounded-md" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy the content<br /> to the clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='flex gap-3'>
              <Button onClick={handlePrompt}>Add Prompt</Button>
              <Button onClick={getMessages}>Create</Button>
            </div>
            {response && <p>{response}</p>}
          </div>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-3'>
              <Card className="flex flex-col items-center p-5 gap-5 shadow-lg border ">
                <Category onCategorySelect={handleCategorySelect} />
                <Prompt onSelectedItemsChange={handleSelectedItemsChange} />
              </Card>
            </div>
          </div>
        </div>
      </div>
      <AlertDialog open={showDialog} onDismiss={() => setShowDialog(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Prompt Generated Successfully.</AlertDialogTitle>
            <AlertDialogDescription>
              Click on the add prompt button to add text to prompt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowDialog(false)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showSave} onDismiss={() => setShowSave(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Proceed towards saving....</AlertDialogTitle>
            <AlertDialogDescription>
              Saving , analytics and more enhanced email drafting with LLM coming soon.
              {/* <Input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter Company Name"
                className="w-[100%] px-5"
              /> */}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction> */}
            <AlertDialogAction onClick={() => setShowSave(false)}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Dashboard;
