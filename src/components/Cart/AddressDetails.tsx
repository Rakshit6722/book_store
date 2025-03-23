import React, { ChangeEvent, useState } from 'react';

const dummyAddressList = [
    {
        type: 'Home',
        address: "BridgeLabz Solutions LLP, No. 42, 14th Main, 15th Cross, Sector 4, Opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore",
        city: "Bangalore",
        state: "Karnataka",
    },
    {
        type: 'Work',
        address: "XYZ Tech Park, 5th Floor, Outer Ring Road, Bellandur, Bangalore",
        city: "Bangalore",
        state: "Karnataka",
    },
];

type addressDetailsProps = {
    orderSummary: boolean,
    setOrderSummary: any,
}

const AddressDetails = ({orderSummary, setOrderSummary}:addressDetailsProps) => {
    const [selectedAddress, setSelectedAddress] = useState(0);
    const [addressEdit, setAddressEdit] = useState<boolean>(false);
    const [name, setName] = useState<string>(localStorage.getItem('name') || '');
    const [showNewAddressForm, setShowNewAddressForm] = useState<boolean>(false);
    const [addressData, setAddressData] = useState({
        address: dummyAddressList[selectedAddress]?.address,
        city: dummyAddressList[selectedAddress]?.city,
        state: dummyAddressList[selectedAddress]?.state,
        type: dummyAddressList[selectedAddress]?.type,
    });
    const [newAddressData, setNewAddressData] = useState({
        address: '',
        city: '',
        state: '',
        type: 'Home',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAddressData({
            ...addressData,
            [e.target.id]: e.target.value
        });
    };

    const handleNewAddressChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewAddressData({
            ...newAddressData,
            [e.target.id]: e.target.value
        });
    };

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddressData({
            ...addressData,
            type: e.target.value
        });
    };

    const handleNewAddressRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAddressData({
            ...newAddressData,
            type: e.target.value
        });
    };

    const handleAddressSelect = (index: number) => {
        setSelectedAddress(index);
        setAddressEdit(false);
        setAddressData({
            address: dummyAddressList[index]?.address,
            city: dummyAddressList[index]?.city,
            state: dummyAddressList[index]?.state,
            type: dummyAddressList[index]?.type,
        });
    };

    const handleAddNewAddress = () => {
        setShowNewAddressForm(true);
        setAddressEdit(false);
    };

    const handleSaveNewAddress = () => {
        setShowNewAddressForm(false);
    };

    return (
        <div className='w-full p-4'>
            <div className='flex justify-between items-center text-lg font-medium mb-4'>
                <p>Customer Details</p>
                <button 
                    className='text-xs text-[#A03037] border-2 py-2 px-4 border-[#A03037]'
                    onClick={handleAddNewAddress}
                >
                    Add New Address
                </button>
            </div>

            <div className='flex flex-col gap-4'>
                <div className='w-[80%] flex gap-4 mt-2'>
                    <div className='flex flex-col gap-1 w-1/2'>
                        <label className='text-xs font-medium'>Full Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type='text'
                            className='h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600 text-[#878787] w-full'
                        />
                    </div>
                    <div className='flex flex-col gap-1 w-1/2'>
                        <label className='text-xs font-medium'>Mobile Number</label>
                        <input
                            type='text'
                            className='h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600 text-[#878787] w-full'
                        />
                    </div>
                </div>


                {showNewAddressForm && (
                    <div className='w-full p-4 rounded-md'>
                        <div className='flex w-full justify-between'>
                            <div className='flex items-center gap-4'>
                                <p className='text-lg font-semibold'>New Address</p>
                                <p
                                    onClick={() => setShowNewAddressForm(false)}
                                    className='text-xs font-semibold text-[#A03037] cursor-pointer'
                                >
                                    Cancel
                                </p>
                            </div>
                            <div>
                                <button 
                                    className='text-xs font-normal bg-[#3371B5] text-white rounded-sm h-7 px-8'
                                    onClick={handleSaveNewAddress}
                                >
                                    SAVE
                                </button>
                            </div>
                        </div>
                        <form className='w-full mt-3'>
                            <div className='flex flex-col gap-2 mb-3'>
                                <label className='text-xs font-semibold'>Address</label>
                                <textarea
                                    onChange={handleNewAddressChange}
                                    id='address'
                                    className='w-full border-[#DCDCDC] min-h-20 text-[#878787] p-3 text-xs border-2 bg-white'
                                    value={newAddressData.address}
                                ></textarea>
                            </div>
                            <div className='flex w-full gap-3 mb-3'>
                                <div className='flex flex-col gap-2 w-1/2'>
                                    <label className='text-xs font-semibold'>city/town</label>
                                    <input
                                        onChange={handleNewAddressChange}
                                        id='city'
                                        className='w-full text-xs border-[#DCDCDC] text-[#878787] p-3 border-2 bg-white'
                                        type='text'
                                        value={newAddressData.city}
                                    />
                                </div>
                                <div className='flex flex-col gap-2 w-1/2'>
                                    <label className='text-xs font-semibold'>State</label>
                                    <input
                                        onChange={handleNewAddressChange}
                                        id='state'
                                        className='w-full text-xs border-[#DCDCDC] text-[#878787] p-3 border-2 bg-white'
                                        type='text'
                                        value={newAddressData.state}
                                    />
                                </div>
                            </div>
                            <div className='mt-4'>
                                <p className="text-xs font-semibold mb-2">Type:</p>
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                            onChange={handleNewAddressRadioChange}
                                            type="radio"
                                            name="newAddressType"
                                            value="Home"
                                            checked={newAddressData.type === "Home"}
                                            className="accent-[#A03037]"
                                        />
                                        <span className="text-sm">Home</span>
                                    </label>
                                    <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                            onChange={handleNewAddressRadioChange}
                                            type="radio"
                                            name="newAddressType"
                                            value="Work"
                                            checked={newAddressData.type === "Work"}
                                            className="accent-[#A03037]"
                                        />
                                        <span className="text-sm">Work</span>
                                    </label>
                                    <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                            onChange={handleNewAddressRadioChange}
                                            type="radio"
                                            name="newAddressType"
                                            value="Other"
                                            checked={newAddressData.type === "Other"}
                                            className="accent-[#A03037]"
                                        />
                                        <span className="text-sm">Other</span>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {/* Existing Address List */}
                {dummyAddressList.map((item, index) => (
                    <div key={index} className='flex items-start gap-2 p-2 rounded-md'>
                        <input
                            type='radio'
                            name='address'
                            checked={selectedAddress === index}
                            onChange={() => handleAddressSelect(index)}
                            className='mt-1'
                        />
                        <div className='w-full'>
                            {selectedAddress === index ? (
                                <div className='w-full'>
                                    <div className='flex w-full justify-between'>
                                        <div className='flex items-center gap-4'>
                                            <p className='text-lg font-semibold'>{index + 1}. {item.type}</p>
                                            <p
                                                onClick={() => setAddressEdit(!addressEdit)}
                                                className='text-xs font-semibold text-[#A03037] cursor-pointer'
                                            >
                                                {addressEdit ? "Cancel" : "Edit"}
                                            </p>
                                        </div>
                                        {addressEdit && (
                                            <div>
                                                <button className='text-xs font-normal bg-[#3371B5] text-white rounded-sm h-7 px-8'>
                                                    SAVE
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <form className='w-full mt-3'>
                                        <div className='flex flex-col gap-2 mb-3'>
                                            <label className='text-xs font-semibold'>Address</label>
                                            <textarea
                                                onChange={handleChange}
                                                disabled={!addressEdit}
                                                id='address'
                                                className={`w-full border-[#DCDCDC] min-h-20 text-[#878787] p-3 text-xs border-2 ${addressEdit ? 'bg-white' : 'bg-[#F5F5F5]'}`}
                                                value={addressData.address}
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
                                                    value={addressData.city}
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
                                                    value={addressData.state}
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
                                                        checked={addressData.type === "Home"}
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
                                                        checked={addressData.type === "Work"}
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
                                                        checked={addressData.type === "Other"}
                                                        className="accent-[#A03037]"
                                                        disabled={!addressEdit}
                                                    />
                                                    <span className="text-sm">Other</span>
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <p className='text-sm text-gray-700'>{item.type}: {item.address}, {item.city}, {item.state}</p>
                            )}
                        </div>
                    </div>
                ))}

                <div className="flex justify-end mt-4">
                    <button 
                        onClick={() => setOrderSummary(true)} 
                        className={`${orderSummary ? "hidden" : ""} uppercase text-white bg-[#3371B5] rounded-sm text-sm py-2 px-5 w-32`}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddressDetails;