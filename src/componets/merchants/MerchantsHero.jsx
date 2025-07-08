"use client";

import React, { useState } from "react";
import Icons from "../common/Icons";

const merchants = [
    {
        name: "Rapidpay Solutions",
        deposit: "50,0000",
        limit: "80,0000",
        email: "Rapidpay@gmail.com",
        status: "Active",
        created: "Mar 23, 2022, 13:00 PM",
    },
    {
        name: "QuickPay",
        deposit: "50,0000",
        limit: "50,0000",
        email: "QuickPay@gmail.com",
        status: "Active",
        created: "Mar 23, 2022, 13:00 PM",
    },
    {
        name: "FastPay Gateway",
        deposit: "10,00000",
        limit: "50,0000",
        email: "FastPay@gmail.com",
        status: "Inactive",
        created: "Mar 23, 2022, 13:00 PM",
    },
    {
        name: "EasyPay",
        deposit: "65,0000",
        limit: "80,0000",
        email: "EasyPay@gmail.com",
        status: "Active",
        created: "Mar 23, 2022, 13:00 PM",
    },
    {
        name: "SecurePay",
        deposit: "90,000",
        limit: "90,000",
        email: "SecurePay@gmail.com",
        status: "Active",
        created: "Mar 23, 2022, 13:00 PM",
    },
];

const MerchantsHero = () => {
    return (
        <div className="max-w-[1072px] 2xl:mx-auto min-[1441px]:max-w-[1200px] lg:p-[22px] bg-white max-h-max w-full relative">
            {/* Header Controls */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
                <select className="border px-3 py-1 rounded text-sm text-gray-700">
                    <option>Merchant Name</option>
                </select>
                <select className="border px-3 py-1 rounded text-sm text-gray-700">
                    <option>Status</option>
                </select>
                <button className="bg-primary text-white px-5 py-1.5 rounded text-sm">Load</button>
                <button className="bg-gray-200 px-4 py-1.5 rounded text-sm">Reset</button>
                <input
                    type="text"
                    placeholder="Search by merchant name"
                    className="border px-3 py-1.5 rounded text-sm flex-1 min-w-[200px]"
                />
                <button className="ml-auto bg-primary text-white px-4 py-2 flex items-center gap-1 rounded text-sm">
                    <Icons icon={'plus'} />
                </button>
            </div>

            {/* Table */}
            <div className="overflow-auto border rounded">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr className="text-left">
                            <th className="p-2">
                                <input type="checkbox" />
                            </th>
                            <th className="p-2">MERCHANT NAME</th>
                            <th className="p-2">TOTAL DEPOSIT</th>
                            <th className="p-2">DAILY LIMIT</th>
                            <th className="p-2">EMAIL</th>
                            <th className="p-2">STATUS</th>
                            <th className="p-2">CREATED ON</th>
                            <th className="p-2">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {merchants.map((m, i) => (
                            <tr key={i} className="border-t">
                                <td className="p-2">
                                    <input type="checkbox" />
                                </td>
                                <td className="p-2">{m.name}</td>
                                <td className="p-2">{m.deposit}</td>
                                <td className="p-2">{m.limit}</td>
                                <td className="p-2">{m.email}</td>
                                <td className="p-2">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${m.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {m.status}
                                    </span>
                                </td>
                                <td className="p-2">{m.created}</td>
                                <td className="p-2 space-x-2">
                                    <button className="text-primary underline">View</button>
                                    <button className="text-primary underline">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 text-sm">
                <p>Showing 6 out of 10</p>
                <div className="flex items-center gap-2">
                    <button className="px-2 py-1 border rounded">&lt;</button>
                    <button className="px-3 py-1 border rounded bg-primary text-white">1</button>
                    <button className="px-3 py-1 border rounded">2</button>
                    <button className="px-2 py-1 border rounded">&gt;</button>
                </div>
            </div>
        </div>
    );
};

export default MerchantsHero;
