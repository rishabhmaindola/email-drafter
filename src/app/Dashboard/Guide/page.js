import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

function page() {
    return (
        <div className="flex flex-col w-full h-screen space-y-4 p-8 pt-6">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How to use Cold Email Geneator?</AccordionTrigger>
                    <AccordionContent>
                        1. Save your OpenAI API key inthe settings. <br />
                        2.Add your job profile from the category drop down menu.  <br />
                        3.First, add the qualities/attributes you want for your email to be drafted.You can also add custom prompts from the settings. <br />
                        4.Paste the link of the website of the business you want to pitch to and click on Scrape Website. <br />
                        5.Now waiting for the server response if the website is scraped successfully the a Hover Card Message will appear in the middle of the screen &quot;Prompt Added Successfully&quot;, else it will toast an error.  <br />
                        6.Click on Add Prompt, the prompt wil be added to the text area. <br />
                        7.Now you can either copy paste the prompt in chatgpt or if you have saved your OpenAI API key you can click on create button and the drafted email will generate on the Draft text area.  <br />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Where to save the api key?</AccordionTrigger>
                    <AccordionContent>
                        You can save ypour openai key in the settings.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>About</AccordionTrigger>
                    <AccordionContent>
                        A powerful tool for crafting effective email pitches, follow-ups, and outreach messages. <br/>
                        <br/>
                        Cold Email Drafter leverages the innovative concept of prompt engineering to streamline the email drafting process. Developed with the robust MERN (MongoDB, Express.js, React, Node.js) stack, this tool enables users to generate personalized emails within seconds, thanks to seamless integration with OpenAI. <br/>
                        <br/>
                        With Cold Email Drafter, users can effortlessly compose compelling emails tailored to their specific needs, whether it&apos;s pitching a business proposal, following up on a lead, or initiating outreach to potential clients or collaborators. <br/>
                        <br/>

                        Key Features: <br/>

                        Prompt Engineering: Utilizes advanced prompt engineering techniques to generate highly effective email drafts. <br/>
                        <br/>
                        MERN Stack Development: Built on the reliable and scalable MERN stack, ensuring optimal performance and flexibility. <br/>
                        <br/>
                        Personalization: Enables personalized email generation, allowing users to customize content based on recipient information.  <br/>
                        <br/>
                        Seamless Integration with OpenAI: Integrates seamlessly with OpenAI&apos;s cutting-edge technology to automate and enhance the email drafting process.  <br/>
                        <br/>
                        Efficiency and Speed: Generates email drafts within seconds, significantly reducing the time and effort required for email composition.  <br/>
                        <br/>
                        Versatile Applications: Suitable for various use cases, including business pitches, networking, sales outreach, and more.  <br/>
                        <br/>
                        Experience the efficiency and effectiveness of email drafting with Cold Email Drafter. Elevate your communication strategy and achieve better results with personalized, compelling emails tailored to your audience.  <br/>
                        <br/>
                        This is the beta version of cold email drafter.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default page;
