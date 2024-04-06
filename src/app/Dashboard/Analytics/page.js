"use client"
import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

function Page() {
    const data = [
        { id: 1, company: 'Company A', draftedEmail: 'Drafted Email A', date: '2022-10-10' },
        { id: 2, company: 'Company B', draftedEmail: 'Drafted Email B', date: '2022-10-11' },
        { id: 3, company: 'Company C', draftedEmail: 'Drafted Email C', date: '2022-10-12' },
    ];

    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            const allIds = data.map(item => item.id);
            setSelectedRows(allIds);
        } else {
            setSelectedRows([]);
        }
    };

    const handleRowSelect = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    return (
        <div className="w-full p-5 rounded-md ">
        <Table>
            <TableHeader className="border">
                <TableHead>
                    <Checkbox
                        checked={selectAll}
                        onChange={handleSelectAll}
                    />
                </TableHead>
                <TableHead>S.No</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Drafted Email</TableHead>
                <TableHead>Date</TableHead>
            </TableHeader>
            <TableBody className="border">
                {data.map((item, index) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <Checkbox
                                checked={selectedRows.includes(item.id)}
                                onChange={() => handleRowSelect(item.id)}
                            />
                        </TableCell>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.company}</TableCell>
                        <TableCell>{item.draftedEmail}</TableCell>
                        <TableCell>{item.date}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
    );
}

export default Page;
