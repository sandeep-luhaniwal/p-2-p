"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MenuItems from "../custom-ui/MenuItems";
import MenuItemsWithSub from "../custom-ui/MenuItemsWithSub";
import { SIDEBAR_DATA_LIST } from "@/utils/helper";

const SideBar = () => {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("");
    const [openTab, setOpenTab] = useState("");

    useEffect(() => {
        const currentItem = SIDEBAR_DATA_LIST.find(item =>
            item.path === pathname ||
            (item.tabData && item.tabData.some(subItem => subItem.path === pathname))
        );

        if (currentItem) {
            const tabName = currentItem.title.toLowerCase().replace(/\s+/g, '');
            setActiveTab(tabName);
            setOpenTab(tabName);
        }
    }, [pathname]);

    return (
        <div className="bg-white ps-[18px] py-2 rounded-[10px] max-w-[280px]">
            <div className="overflow-y-auto py-2 pe-3 h-[calc(100vh-60px)] overflow-clip">
                <Image
                    src="/assets/images/png/sidebar_logo.png"
                    className="w-[150px] md:w-[180px] lg:w-[217px] h-auto"
                    height={59}
                    width={217}
                    alt="page-logo"
                />

                <div className="mt-[38px] flex flex-col gap-5">
                    {SIDEBAR_DATA_LIST.map((item, index) => {
                        const tabKey = item.title.toLowerCase().replace(/\s+/g, '');
                        const isOpen = openTab === tabKey;

                        if (!item.tabData) {
                            return (
                                <MenuItems
                                    key={index}
                                    path={item.path}
                                    icon={item.icon}
                                    to={tabKey}
                                    setActiveTab={setActiveTab}
                                    activeTab={activeTab}
                                >
                                    {item.title}
                                </MenuItems>
                            );
                        }

                        return (
                            <MenuItemsWithSub
                                key={index}
                                pathname={pathname}
                                icon={item.icon}
                                to={tabKey}
                                setActiveTab={setActiveTab}
                                activeTab={activeTab}
                                openTab={openTab}
                                setOpenTab={setOpenTab}
                                isOpen={isOpen}
                                submenu={item.tabData.map(subItem => ({
                                    title: subItem.title,
                                    path: subItem.path,
                                    subicon: subItem.icons,
                                }))}
                            >
                                {item.title}
                            </MenuItemsWithSub>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
