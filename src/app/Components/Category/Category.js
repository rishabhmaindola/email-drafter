"use client"
import React, { useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

const positions = [
    "CEO (Chief Executive Officer)",
    "COO (Chief Operating Officer)",
    "CFO (Chief Financial Officer)",
    "CTO (Chief Technology Officer)",
    "CMO (Chief Marketing Officer)",
    "CHRO (Chief Human Resources Officer)",
    "CIO (Chief Information Officer)",
    "CSO (Chief Strategy Officer)",
    "CCO (Chief Communications Officer)",
    "CDO (Chief Diversity Officer)",
    "CRO (Chief Risk Officer)",
    "CCO (Chief Compliance Officer)",
    "CLO (Chief Legal Officer)",
    "Directors",
    "Managers",
    "Supervisors",
    "Administrative Assistants",
    "Receptionists",
    "Office Managers",
    "Accountants",
    "Financial Analysts",
    "Controllers",
    "Bookkeepers",
    "HR Managers",
    "Recruiters",
    "Training and Development Specialists",
    "Compensation and Benefits Specialists",
    "Sales Representatives",
    "Marketing Managers",
    "Digital Marketers",
    "Advertising Specialists",
    "Public Relations Specialists",
    "Operations Managers",
    "Supply Chain Managers",
    "Logistics Coordinators",
    "IT Managers",
    "Systems Administrators",
    "Network Engineers",
    "Software Developers",
    "Customer Service Representatives",
    "Support Specialists",
    "Lawyers",
    "Legal Assistants",
    "Researchers",
    "Scientists",
    "Engineers",
    "QA Managers",
    "QA Testers",
    "Production Managers",
    "Manufacturing Engineers",
    "Assembly Line Workers",
    "Health and Safety Officers",
    "Environmental Specialists",
    "PR Managers",
    "Communications Specialists",
    "Consultants",
    "Subject Matter Experts (SMEs)",
    "Graphic Designers",
    "Content Creators",
    "Artists",
    "Facilities Managers",
    "Maintenance Technicians",
    "Project Managers",
    "Project Coordinators",
    "Interns",
    "Entry-Level Associates"
];

export default function Category({ onCategorySelect }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);

    const handleCategorySelect = (category) => {
        setValue(category);
        setSelectedOption(category);
        setOpen(false);
        onCategorySelect(category);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value ? value : "Select category..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search category..." className="h-9" />
                    <CommandEmpty>No Category found.</CommandEmpty>
                    <CommandGroup>
                        <ScrollArea className=" h-[200px] ">
                            {positions.map((position) => (
                                <CommandItem
                                    key={position}
                                    value={position}
                                    onSelect={(currentValue) => handleCategorySelect(currentValue)}
                                >
                                    {position}
                                    <CheckIcon
                                        className={value === position ? "ml-auto h-4 w-4 opacity-100" : "ml-auto h-4 w-4 opacity-0"}
                                    />
                                </CommandItem>
                            ))}
                        </ScrollArea>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
