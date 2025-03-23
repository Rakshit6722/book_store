import React, { useState, useEffect } from 'react';
import { FaRegUser } from 'react-icons/fa6';
import { IoBagOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { Popover } from 'antd';
import { NavLink } from 'react-router-dom';

function ProfileDropdown({logout}:{logout: any}) {
    const [profileName, setProfileName] = useState<string | null>(null);
    const [open, setOpen] = useState(false);


    useEffect(() => {
     
        setProfileName(localStorage.getItem('name'));
        
        const handleStorageChange = () => {
            setProfileName(localStorage.getItem('name'));
        };
        

        window.addEventListener('storage', handleStorageChange);
        

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    const handleLogout = () => {
        logout();
        setProfileName(null);
        setOpen(false); 
    };

    const guestContent = (
        <div className='flex flex-col items-start gap-5 p-3'>
            <div className='flex flex-col items-start gap-1 border-b-2 w-full pb-4'>
                <p className='font-semibold text-sm'>Welcome</p>
                <p className='text-[#878787] font-semibold'>To access account and manage orders</p>
                <NavLink to={'/login'}>
                    <button className='text-[#A03037] font-semibold border-[#A03037] border-2 text-sm py-1 px-4 mt-2'>LOGIN/SIGNUP</button>
                </NavLink>
            </div>
                <NavLink to={'/myOrder'} className='flex items-center gap-2 text-sm text-[#878787] font-semibold'>
                    <IoBagOutline /> <p>My Orders</p>
                </NavLink>
                <NavLink to={'/wishlist'} className='flex items-center gap-2 text-sm text-[#878787] font-semibold'>
                    <IoMdHeartEmpty /> <p>My Wishlist</p>
                </NavLink>
        </div>
    );

    const loggedInContent = (
        <div className='flex flex-col items-start gap-5 py-2 px-3 w-[200px]'>
            <p className='text-sm text-black font-semibold mb-2'>Hello, {profileName}</p>
            <NavLink to={'/profile'} className='flex items-center gap-2 text-sm text-[#878787] font-semibold'>
                <FaRegUser /> <p>Profile</p>
            </NavLink>
            <NavLink to={'/myOrder'} className='flex items-center gap-2 text-sm text-[#878787] font-semibold'>
                <IoBagOutline /> <p>My Orders</p>
            </NavLink>
            <NavLink to={'/wishlist'} className='flex items-center gap-2 text-sm text-[#878787] font-semibold'>
                <IoMdHeartEmpty /> <p>My Wishlist</p>
            </NavLink>
            <button onClick={handleLogout} className='text-[#A03037] font-semibold border-[#A03037] border-2 text-sm py-1 px-9 mt-2'>Logout</button>
        </div>
    );

    return (
        <Popover 
            placement="bottom" 
            content={profileName ? loggedInContent : guestContent} 
            trigger='click'
            open={open}
            onOpenChange={setOpen}
        >
            <div className='flex flex-col items-center justify-center cursor-pointer'>
                <div className='flex items-center justify-center h-6'>
                    <FaRegUser className='text-white text-xl' />
                </div>
                <p className='text-white hidden md:block text-xs mt-1'>{profileName ?? "Profile"}</p>
            </div>
        </Popover>
    );
}

export default ProfileDropdown;