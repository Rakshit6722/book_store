import React, { ChangeEvent, useState } from 'react'

type addressListProps = {
    address: any,
    index: number
}

function AddressList({ address, index }: addressListProps) {

    const [addressEdit, setAddressEdit] = React.useState<boolean>(false)
    const [addressData, setAddressData] = useState({
        address: address?.address,
        city: address?.city,
        state: address?.state,
        type: address?.type,
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement> | any) => {
        setAddressData({
            ...addressData,
            [e.target.id]: e.target.value
        })
    }

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddressData({
            ...addressData,
            type: e.target.value
        })
    }

    return (
        <div className='w-[80%]'>
            <div className='flex w-full justify-between'>
                <div className='flex items-center gap-4'>
                    <p className='text-lg font-semibold'>{index + 1}. {address?.type}</p>
                    <p onClick={() => {
                        addressEdit ? setAddressEdit(false) : setAddressEdit(true)
                    }} className='text-xs font-semibold text-[#A03037] cursor-pointer'>{addressEdit ? "Cancel" : "Edit"}</p>
                </div>
                {
                    addressEdit && (
                        <div>
                            <button className='text-xs font-normal bg-[#3371B5] text-white rounded-sm h-7 px-8'>SAVE</button>
                        </div>
                    )
                }
            </div>
            <form className='w-full mt-3'>
                <div className='flex flex-col gap-2 mb-3'>
                    <label className='text-xs font-semibold'>Address</label>
                    <textarea
                        onChange={handleChange}
                        disabled={!addressEdit}
                        id='address'
                        className={`w-full border-[#DCDCDC] min-h-20 text-[#878787] p-3 text-xs border-2 ${addressEdit ? 'bg-white' : 'bg-[#F5F5F5]'}`}
                        value={addressData?.address}
                    ></textarea>
                </div>
                <div className='flex w-full gap-3 mb-3'>
                    <div className='flex flex-col gap-2 w-1/2'>
                        <label className='text-xs font-semibold'>city/town</label>
                        <input
                            onChange={handleChange}
                            disabled={!addressEdit}
                            id='city'
                            className={`w-full text-xs border-[#DCDCDC] text-[#878787] p-3 border-2 ${addressEdit ? 'bg-white' : 'bg-[#F5F5F5]'}`}
                            type='text'
                            value={addressData?.city}
                        />
                    </div>
                    <div className='flex flex-col gap-2 w-1/2'>
                        <label className='text-xs font-semibold'>State</label>
                        <input
                            onChange={handleChange}
                            disabled={!addressEdit}
                            id='state'
                            className={`w-full text-xs border-[#DCDCDC] text-[#878787] p-3 border-2 ${addressEdit ? 'bg-white' : 'bg-[#F5F5F5]'}`}
                            type='text'
                            value={addressData?.state}
                        />
                    </div>
                </div>
                <div className='mt-4'>
                    <p className="text-xs font-semibold mb-2">Type:</p>
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-1 cursor-pointer">
                            <input
                                onChange={handleRadioChange}
                                type="radio"
                                name={`addressType-${index}`}
                                value="Home"
                                defaultChecked={addressData?.type === "Home"}
                                className="accent-[#A03037]"
                                disabled={!addressEdit}
                            />
                            <span className="text-sm">Home</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                            <input
                                onChange={handleRadioChange}
                                type="radio"
                                name={`addressType-${index}`}
                                value="Work"
                                defaultChecked={addressData?.type === "Work"}
                                className="accent-[#A03037]"
                                disabled={!addressEdit}
                            />
                            <span className="text-sm">Work</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                            <input
                                onChange={handleRadioChange}
                                type="radio"
                                name={`addressType-${index}`}
                                value="Other"
                                defaultChecked={addressData?.type === "Other"}
                                className="accent-[#A03037]"
                                disabled={!addressEdit}
                            />
                            <span className="text-sm">Other</span>
                        </label>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddressList