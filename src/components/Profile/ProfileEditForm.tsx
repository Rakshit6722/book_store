import React, { useState } from 'react'

const dummyValue = {
    fullName: 'John Doe',
    email: 'john@example.com',
    password: "sadfasf",
    mobileNumber: "1234567890",
}

function ProfileEditForm() {

    const [editPersonalDetails, setEditPersonalDetails] = useState<boolean>(false)
    const [formData, setFormData] = useState<any>(dummyValue)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    }

    return (
        <div className='w-full'>
            <div className='flex flex-col md:flex-row gap-4 md:gap-0'>
                <div className='flex items-center w-full md:w-[66%] gap-4'>
                    <p className='text-lg font-semibold'>Personal Details</p>
                    <p onClick={() =>{
                        editPersonalDetails ? setEditPersonalDetails(false) : setEditPersonalDetails(true)
                    }} className='text-xs font-semibold text-[#A03037] cursor-pointer'>{editPersonalDetails ? "Cancel" : "Edit"}</p>
                </div>
                {
                    editPersonalDetails && (
                        <div>
                            <button  className='text-xs font-normal  bg-[#3371B5] text-white rounded-ms h-7 px-8'>SAVE</button>
                        </div>
                    )
                }
            </div>
            <form className='flex flex-col gap-3 mt-6'>
                <div className='flex flex-col'>
                    <label className='text-xs' htmlFor='fullName'>Full Name</label>
                    <input onChange={handleChange} className={`w-[80%] h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600 ${!editPersonalDetails ? "text-[#878787] bg-[#F5F5F5]" : "text-black bg-white"}`} value={formData?.fullName} id='fullName' disabled={!editPersonalDetails} />
                </div>
                <div className='flex flex-col'>
                    <label className='text-xs' htmlFor='email'>Email Id</label>
                    <input onChange={handleChange} className={`w-[80%] h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600 ${!editPersonalDetails ? "text-[#878787] bg-[#F5F5F5]" : "text-black bg-white"}`} type='text' value={formData?.email} id='email' disabled={!editPersonalDetails} />
                </div>
                <div className='flex flex-col '>
                    <label className='text-xs' htmlFor='password'>Password</label>
                    <input onChange={handleChange} className={`w-[80%] h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600 ${!editPersonalDetails ? "text-[#878787] bg-[#F5F5F5]" : "text-black bg-white"}`} type='password' value={formData?.password} id='password' disabled={!editPersonalDetails} />
                </div>
                <div className='flex flex-col '>
                    <label className='text-xs' htmlFor='mobileNumber'>Mobile Number</label>
                    <input onChange={handleChange} type='text' className={`w-[80%] h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600 ${!editPersonalDetails ? "text-[#878787] bg-[#F5F5F5]" : "text-black bg-white"}`} value={formData?.mobileNumber} id='mobileNumber' disabled={!editPersonalDetails} />
                </div>
            </form>
        </div>
    )
}

export default ProfileEditForm
