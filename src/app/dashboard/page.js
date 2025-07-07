import SideBar from '@/componets/common/SideBar'
import Image from 'next/image'
import React from 'react'

export default function page() {
    return (
        <div className='bg-black h-screen p-7 relative'>
            <Image className='absolute bottom-0 left-0'
            src={'/assets/images/svg/bottom_line.svg'} height={300} width={300} alt='bottom_line' />
            <div className='relative z-30'>
                <SideBar />
            </div>
        </div>
    )
}
