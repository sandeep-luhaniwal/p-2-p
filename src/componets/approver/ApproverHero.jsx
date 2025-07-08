"use client";

import React, { useState, useRef, useEffect } from "react";
import Icons from "../common/Icons";
import Link from "next/link";

const approvers = [
  { name: "Niropay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Active" },
  { name: "Goopay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Active" },
  { name: "Apppay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Inactive" },
  { name: "Viewpay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Active" },
  { name: "Portpay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Active" },
  { name: "Surepay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Active" },
  { name: "Outpay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Inactive" },
  { name: "Mejopay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Active" },
  { name: "Apppay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Active" },
];

const ApproverHero = () => {
  const [tempApproverFilter, setTempApproverFilter] = useState("");
  const [tempMerchantFilter, setTempMerchantFilter] = useState("");
  const [tempStatusFilter, setTempStatusFilter] = useState("");
  const [tempSearchTerm, setTempSearchTerm] = useState("");

  const [approverFilter, setApproverFilter] = useState("");
  const [merchantFilter, setMerchantFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedMerchants, setSelectedMerchants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [showApproverDropdown, setShowApproverDropdown] = useState(false);
  const [showMerchantDropdown, setShowMerchantDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [loadClicked, setLoadClicked] = useState(false);

  const approverDropdownRef = useRef(null);
  const merchantDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);

  const uniqueNames = [...new Set(approvers.map((m) => m.name))];
  const uniqueStatuses = [...new Set(approvers.map((m) => m.status))];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (approverDropdownRef.current && !approverDropdownRef.current.contains(e.target)) {
        setShowApproverDropdown(false);
      }
      if (merchantDropdownRef.current && !merchantDropdownRef.current.contains(e.target)) {
        setShowMerchantDropdown(false);
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(e.target)) {
        setShowStatusDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLoad = () => {
    setApproverFilter(tempApproverFilter);
    setMerchantFilter(tempMerchantFilter);
    setStatusFilter(tempStatusFilter);
    setLoadClicked(true);
    setSelectedMerchants([]);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setTempApproverFilter("");
    setTempMerchantFilter("");
    setTempStatusFilter("");
    setTempSearchTerm("");
    setApproverFilter("");
    setMerchantFilter("");
    setStatusFilter("");
    setSelectedMerchants([]);
    setLoadClicked(false);
    setCurrentPage(1);
  };

  const filteredMerchants = approvers
    .filter((merchant) => {
      const matchesApprover = approverFilter === "" || merchant.name === approverFilter;
      const matchesMerchant = merchantFilter === "" || merchant.name === merchantFilter;
      const matchesStatus = statusFilter === "" || merchant.status === statusFilter;
      return matchesApprover && matchesMerchant && matchesStatus;
    })
    .filter((merchant) =>
      merchant.name.toLowerCase().includes(tempSearchTerm.toLowerCase())
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMerchants = filteredMerchants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMerchants.length / itemsPerPage);

  const handleCheckboxChange = (name) => {
    setSelectedMerchants((prev) =>
      prev.includes(name) ? prev.filter((id) => id !== name) : [...prev, name]
    );
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="max-w-[1072px] 2xl:mx-auto min-[1441px]:max-w-[1200px] lg:p-[22px] bg-white w-full relative">
      <div className="flex flex-wrap gap-y-2.5 md:gap-y-5 gap-5">
        {[
          {
            label: "Approver Name",
            tempValue: tempApproverFilter,
            setTempValue: setTempApproverFilter,
            showDropdown: showApproverDropdown,
            setShowDropdown: setShowApproverDropdown,
            options: uniqueNames,
            ref: approverDropdownRef,
          },
          {
            label: "Merchant Name",
            tempValue: tempMerchantFilter,
            setTempValue: setTempMerchantFilter,
            showDropdown: showMerchantDropdown,
            setShowDropdown: setShowMerchantDropdown,
            options: uniqueNames,
            ref: merchantDropdownRef,
          },
        ].map((dropdown, index) => (
          <div className="relative" ref={dropdown.ref} key={index}>
            <div
              className="border cursor-pointer border-[#F0F2F4] flex gap-2.5 py-1.5 px-2.5 rounded-lg items-center"
              onClick={() => dropdown.setShowDropdown(!dropdown.showDropdown)}
            >
              <p className="text-[#4B5563] text-sm md:text-base leading-100">
                {dropdown.tempValue || dropdown.label}
              </p>
              <Icons icon="downarrow" />
            </div>
            <div
              className={`absolute top-[110%] left-0 w-full min-w-[160px] bg-white border border-[#F0F2F4] rounded-md shadow-md transition-all duration-300 ${
                dropdown.showDropdown
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-[#4B5563]"
                onClick={() => {
                  dropdown.setTempValue("");
                  dropdown.setShowDropdown(false);
                }}
              >
                All
              </div>
              {dropdown.options.map((option, i) => (
                <div
                  key={i}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-[#4B5563]"
                  onClick={() => {
                    dropdown.setTempValue(option);
                    dropdown.setShowDropdown(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Status Filter */}
        <div className="relative" ref={statusDropdownRef}>
          <div
            className="border cursor-pointer border-[#F0F2F4] flex gap-2.5 py-1.5 px-2.5 rounded-lg items-center"
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
          >
            <Icons icon="flag" />
            <p className="text-[#4B5563] text-sm md:text-base leading-100">
              {tempStatusFilter || "Status"}
            </p>
            <Icons icon="downarrow" />
          </div>
          <div
            className={`absolute top-[110%] left-0 w-full min-w-[120px] bg-white border border-[#F0F2F4] rounded-md shadow-md transition-all duration-300 ${
              showStatusDropdown
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

        {/* Buttons */}
        <button
          className={`rounded-[10px] ${
            loadClicked ? "bg-purple text-white" : "bg-[#ECE8F2] text-[#4B5563]"
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
                        placeholder="Search by approver name"
                    />
                </div>
                <Link href={"/dashboard/approvers/add-new-approvers"} className="bg-purple text-nowrap max-w-max hover:opacity-85 duration-300 flex gap-2.5 items-center cursor-pointer py-1.5 md:py-2.5 px-4 rounded-[10px] text-white">
                    <Icons icon={"circleadd"} />
                    <span>Add New Approver</span>
                </Link>
            </div>

            {/* Table or No Data */}
            {currentMerchants.length === 0 ? (
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
                                            currentMerchants.length > 0 &&
                                            selectedMerchants.length === currentMerchants.length
                                        }
                                        onChange={() => {
                                            if (
                                                selectedMerchants.length === currentMerchants.length
                                            ) {
                                                setSelectedMerchants([]);
                                            } else {
                                                setSelectedMerchants(
                                                    currentMerchants.map((m) => m.name)
                                                );
                                            }
                                        }}
                                    />
                                </th>
                                {[
                                    "APPROVER NAME",
                                    "ASSIGNED",
                                    "CREATED ON",
                                    "STATUS",
                                    "ACTION",
                                ].map((title, idx, arr) => (
                                    <th
                                        key={idx}
                                        className={`text-[#374151] text-sm font-bold uppercase text-nowrap px-2.5 ${idx === arr.length - 1 ? 'text-end pe-10' : ''}`}
                                    >
                                        {title}
                                    </th>
                                ))}

                            </tr>
                        </thead>
                        <tbody>
                            {currentMerchants.map((m, i) => (
                                <tr key={i} className="border-t border-[#E4E6E8]">
                                    <td className="md:px-[15px] py-3 lg:py-[14px] px-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedMerchants.includes(m.name)}
                                            onChange={() => handleCheckboxChange(m.name)}
                                            className="border-[#959BA4] rounded-[5px] cursor-pointer"
                                        />
                                    </td>
                                    <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
                                        {m.name}
                                    </td>
                                    <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
                                        {m.assigned} {" "}👁️ View
                                    </td>

                                    <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
                                        {m.created}
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
                                    <td className="text-[#4B5563] text-end text-sm font-normal text-nowrap px-2.5 space-x-2">
                                        <button className="text-sm cursor-pointer underline">
                                            Edit
                                        </button>
                                        <button className="text-sm cursor-pointer underline">
                                            Disable
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-sm pb-6">
                <p className="text-black order-2 mt-3 md:order-1 text-sm md:text-base">
                    Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredMerchants.length)} of {filteredMerchants.length}
                </p>
                <div className="flex items-center order-1 md:order-2 gap-2">
                    <button
                        className="px-2 py-1 cursor-pointer"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <Icons icon={'nextarrow'} />
                    </button>

                    <button
                        onClick={() => paginate(1)}
                        className={`px-3 cursor-pointer py-1 text-base lg:text-lg rounded-[5px] font-medium ${currentPage === 1 ? 'bg-purple text-white' : 'text-[#4B5563]'}`}
                    >
                        1
                    </button>
                    {currentPage > 3 && (
                        <span className="px-1">...</span>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(number => {
                            return (
                                number === currentPage ||
                                number === currentPage - 1 ||
                                number === currentPage + 1
                            ) && number !== 1 && number !== totalPages;
                        })
                        .map(number => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`px-3 cursor-pointer py-1 text-base lg:text-lg rounded-[5px] font-medium ${currentPage === number ? 'bg-purple text-white' : 'text-[#4B5563]'}`}
                            >
                                {number}
                            </button>
                        ))}

                    {currentPage < totalPages - 2 && (
                        <span className="px-1">...</span>
                    )}
                    {totalPages > 1 && (
                        <button
                            onClick={() => paginate(totalPages)}
                            className={`px-3 cursor-pointer py-1 text-base lg:text-lg rounded-[5px] font-medium ${currentPage === totalPages ? 'bg-purple text-white' : 'text-[#4B5563]'}`}
                        >
                            {totalPages}
                        </button>
                    )}

                    <button
                        className="px-2 py-1 cursor-pointer"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <Icons icon={'prevarrow'} />
                    </button>
                </div>
            </div>
    </div>
  );
};

export default ApproverHero;
