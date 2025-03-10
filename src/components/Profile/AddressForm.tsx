import React from 'react'
import AddressList from './AddressList'

const dummyAddress = [
    {
        address: "1234 Main St",
        city: "San Francisco",
        state: "CA",
        type: "Home",
    },
    {
        address: "1234 Main St",
        city: "San Francisco",
        state: "CA",
        type: "Home",
    },
]

const AddressForm = () => {
    return (
        <div className='w-full'>
            <div className='w-[80%] flex justify-between items-center'>
                <p className='text-lg text-[#0A0102] font-semibold'>Address Details</p>
                <button className='text-xs text-[#A03037] border-2 py-2 px-4 border-[#A03037]'>Add New Address</button>
            </div>
            <div>
                {
                    dummyAddress.map((address, index) => {
                        return (
                            <div className='w-full mt-6' key={index}>
                                <AddressList address={address} index={index} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AddressForm
