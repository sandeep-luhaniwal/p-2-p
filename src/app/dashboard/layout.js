import NavBar from '@/componets/common/NavBar'
import SideBar from '@/componets/common/SideBar'
import Image from 'next/image'
import React from 'react'

export default function layoutDashboard() {
    return (
        <div className='bg-black h-screen p-4 lg:p-7 relative'>
            <Image className='absolute bottom-0 left-0'
                src={'/assets/images/svg/bottom_line.svg'} height={300} width={300} alt='bottom_line' />
            <div className='relative z-30 flex gap-7'>
                <div className={`hidden lg:flex`}>
                    <SideBar />
                </div>
                <NavBar />
            </div>
        </div>
    )
}
