"use client";

import React, { useState, useRef, useEffect } from "react";
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

const ApproverHero = () => {
    const [tempNameFilter, setTempNameFilter] = useState("");
    const [tempStatusFilter, setTempStatusFilter] = useState("");
    const [tempSearchTerm, setTempSearchTerm] = useState("");

    const [nameFilter, setNameFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedMerchants, setSelectedMerchants] = useState([]);

    const [showNameDropdown, setShowNameDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [loadClicked, setLoadClicked] = useState(false);

    const nameDropdownRef = useRef(null);
    const statusDropdownRef = useRef(null);

    const uniqueNames = [...new Set(merchants.map((m) => m.name))];
    const uniqueStatuses = [...new Set(merchants.map((m) => m.status))];

    const handleLoad = () => {
        setNameFilter(tempNameFilter);
        setStatusFilter(tempStatusFilter);
        setLoadClicked(true);
        setSelectedMerchants([]);
    };

    const handleReset = () => {
        setTempNameFilter("");
        setTempStatusFilter("");
        setTempSearchTerm("");
        setNameFilter("");
        setStatusFilter("");
        setSelectedMerchants([]);
        setLoadClicked(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                nameDropdownRef.current &&
                !nameDropdownRef.current.contains(e.target)
            ) {
                setShowNameDropdown(false);
            }
            if (
                statusDropdownRef.current &&
                !statusDropdownRef.current.contains(e.target)
            ) {
                setShowStatusDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredMerchants = merchants
        .filter((merchant) => {
            const matchesName =
                nameFilter === "" || merchant.name === nameFilter;
            const matchesStatus =
                statusFilter === "" || merchant.status === statusFilter;
            return matchesName && matchesStatus;
        })
        .filter((merchant) =>
            merchant.name.toLowerCase().includes(tempSearchTerm.toLowerCase())
        );

    const handleCheckboxChange = (email) => {
        setSelectedMerchants((prev) =>
            prev.includes(email)
                ? prev.filter((id) => id !== email)
                : [...prev, email]
        );
    };

    return (
        <div className="max-w-[1072px] 2xl:mx-auto min-[1441px]:max-w-[1200px] lg:p-[22px] bg-white w-full relative">
            <div className="flex flex-wrap gap-y-2.5 md:gap-y-5 gap-5">
                {/* Name Filter */}
                <div className="relative" ref={nameDropdownRef}>
                    <div
                        className="border cursor-pointer border-[#F0F2F4] flex gap-2.5 py-1.5 px-2.5 rounded-lg items-center"
                        onClick={() => setShowNameDropdown(!showNameDropdown)}
                    >
                        <p className="text-[#4B5563] text-sm md:text-base leading-100">
                            {tempNameFilter || "Merchant Name"}
                        </p>
                        <Icons icon={"downarrow"} />
                    </div>
                    <div
                        className={`absolute top-[110%] left-0 w-full min-w-[160px] bg-white border border-[#F0F2F4] rounded-md shadow-md transition-all duration-300 ${showNameDropdown
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-95 pointer-events-none"
                            }`}
                    >
                        <div
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-[#4B5563]"
                            onClick={() => {
                                setTempNameFilter("");
                                setShowNameDropdown(false);
                            }}
                        >
                            All
                        </div>
                        {uniqueNames.map((name, index) => (
                            <div
                                key={index}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-[#4B5563]"
                                onClick={() => {
                                    setTempNameFilter(name);
                                    setShowNameDropdown(false);
                                }}
                            >
                                {name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status Filter */}
                <div className="relative" ref={statusDropdownRef}>
                    <div
                        className="border cursor-pointer border-[#F0F2F4] flex gap-2.5 py-1.5 px-2.5 rounded-lg items-center"
                        onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    >
                        <Icons icon={"flag"} />
                        <p className="text-[#4B5563] text-sm md:text-base leading-100">
                            {tempStatusFilter || "Status"}
                        </p>
                        <Icons icon={"downarrow"} />
                    </div>
                    <div
                        className={`absolute top-[110%] left-0 w-full min-w-[120px] bg-white border border-[#F0F2F4] rounded-md shadow-md transition-all duration-300 ${showStatusDropdown
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-95 pointer-events-none"
                            }`}
                    >
                        <div
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-[#4B5563]"
                            onClick={() => {
                                setTempStatusFilter("");
                                setShowStatusDropdown(false);
                            }}
                        >
                            All
                        </div>
                        {uniqueStatuses.map((status, index) => (
                            <div
                                key={index}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-[#4B5563]"
                                onClick={() => {
                                    setTempStatusFilter(status);
                                    setShowStatusDropdown(false);
                                }}
                            >
                                {status}
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className={`rounded-[10px] ${loadClicked ? "bg-purple text-white" : "bg-[#ECE8F2] text-[#4B5563]"
                        } cursor-pointer text-sm md:text-base leading-100 py-2 px-4`}
                    onClick={handleLoad}
                >
                    Load
                </button>

                <button
                    className="rounded-[10px] bg-[#ECE8F2] cursor-pointer text-[#4B5563] text-sm md:text-base leading-100 py-2 px-4"
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>

            {/* Search */}
            <div className="my-4 md:my-7 lg:my-[30px] flex-col sm:flex-row gap-4 md:gap-6 flex justify-between">
                <div className="max-w-[481px] flex gap-1 w-full px-2 py-2.5">
                    <label htmlFor="searchmerch">
                        <Icons icon={"marchentsearch"} />
                    </label>
                    <input
                        id="searchmerch"
                        name="searchmerch"
                        type="search"
                        value={tempSearchTerm}
                        onChange={(e) => setTempSearchTerm(e.target.value)}
                        className="placeholder:text-[#959BA4] text-black text-sm lg:text-base leading-100 w-full outline-none"
                        placeholder="Search by merchant name"
                    />
                </div>
                <button className="bg-purple text-nowrap max-w-max hover:opacity-85 duration-300 flex gap-2.5 items-center cursor-pointer py-1.5 md:py-2.5 px-4 rounded-[10px] text-white">
                    <Icons icon={"circleadd"} />
                    <span>Add New Merchant</span>
                </button>
            </div>

            {/* Table or No Data */}
            {filteredMerchants.length === 0 ? (
                <div className="text-center text-gray-500 text-sm py-10">
                    Data not found
                </div>
            ) : (
                <div className="overflow-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-white">
                            <tr className="text-left border-t border-[#E4E6E8]">
                                <th className="md:px-[15px] py-3 lg:py-[14px] px-2">
                                    <input
                                        type="checkbox"
                                        className="border-[#959BA4] rounded-[5px] cursor-pointer"
                                        checked={
                                            filteredMerchants.length > 0 &&
                                            selectedMerchants.length === filteredMerchants.length
                                        }
                                        onChange={() => {
                                            if (
                                                selectedMerchants.length === filteredMerchants.length
                                            ) {
                                                setSelectedMerchants([]);
                                            } else {
                                                setSelectedMerchants(
                                                    filteredMerchants.map((m) => m.email)
                                                );
                                            }
                                        }}
                                    />
                                </th>
                                {[
                                    "MERCHANT NAME",
                                    "TOTAL DEPOSIT",
                                    "DAILY LIMIT",
                                    "EMAIL",
                                    "STATUS",
                                    "CREATED ON",
                                    "ACTION",
                                ].map((title, idx) => (
                                    <th
                                        key={idx}
                                        className="text-[#374151] text-sm font-bold uppercase text-nowrap px-2.5"
                                    >
                                        {title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMerchants.map((m, i) => (
                                <tr key={i} className="border-t border-[#E4E6E8]">
                                    <td className="md:px-[15px] py-3 lg:py-[14px] px-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedMerchants.includes(m.email)}
                                            onChange={() => handleCheckboxChange(m.email)}
                                            className="border-[#959BA4] rounded-[5px] cursor-pointer"
                                        />
                                    </td>
                                    <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
                                        {m.name}
                                    </td>
                                    <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
                                        {m.deposit}
                                    </td>
                                    <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
                                        {m.limit}
                                    </td>
                                    <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
                                        {m.email}
                                    </td>
                                    <td className="w-[100px] px-2.5 text-sm font-bold text-center">
                                        <span
                                            className={`inline-block w-full px-2 py-1 rounded text-xs font-bold ${m.status === "Active"
                                                    ? "bg-[#EDFFEA] text-[#165E3D]"
                                                    : "bg-[#FFEAEA] text-[#B83131]"
                                                }`}
                                        >
                                            {m.status}
                                        </span>
                                    </td>
                                    <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
                                        {m.created}
                                    </td>
                                    <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5 space-x-2">
                                        <button className="text-sm cursor-pointer underline">
                                            View
                                        </button>
                                        <button className="text-sm cursor-pointer underline">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 text-sm">
                <p className="text-black text-sm md:text-base">
                    Showing {filteredMerchants.length} out of {merchants.length}
                </p>
                <div className="flex items-center gap-2">
                    <button className="px-2 py-1">
                        <Icons icon={'nextarrow'} />
                    </button>
                    <button className="px-3 py-1 text-base lg:text-lg rounded-[5px] font-medium bg-purple text-white">
                        1
                    </button>
                    <button className="px-3 py-1 text-base lg:text-lg font-medium">2</button>
                    <button className="px-2 py-1 ">
                        <Icons icon={'prevarrow'} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApproverHero;
