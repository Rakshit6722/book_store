import React from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import Breadcrumbs from '../components/Common/Breadcrumbs'
import BookImage from '../assets/images/bookImage.png'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import CartSection from '../components/Cart/CartSection'
import AddressDetails from '../components/Cart/AddressDetails'
import OrderSummary from '../components/Cart/OrderSummary'

const dummyCartInfo = [
    {
        title: "Don't Make Me Think",
        author: "Steve Krug",
        price: "1500",
        quantity: 1,
        total: 1500,
        cover: BookImage
    },
    {
        title: "Don't Make Me Think",
        author: "Steve Krug",
        price: "1500",
        quantity: 1,
        total: 1500,
        cover: BookImage
    },
]

const items: MenuProps['items'] = [
    {
        label: (
            <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
                1st menu item
            </a>
        ),
        key: '0',
    },
    {
        label: (
            <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
                2nd menu item
            </a>
        ),
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];

const Cart = () => {

    // const [myCartDetails, setMyCartDetails] = React.useState(true)
    const [addressDetails, setAddressDetails] = React.useState(false)
    const [orderSummary, setOrderSummary] = React.useState(false)

    return (
        <div>
            <Header container='home' />
            <div className='max-w-6xl min-h-[84.85vh] mx-auto p-8 flex flex-col gap-10 items-start'>
                <Breadcrumbs container='cart' />
                <div className='w-full md:w-[75%] flex flex-col gap-5'>
                    <div className='p-5 flex flex-col gap-2 border-2 border-[#DCDCDC] rounded-sm'>
                        <div className='flex justify-between items-center w-full'>
                            <p className='font-medium text-lg'>My Cart</p>
                            {/* dummy locaiton dropdown */}
                            <div className='cursor-pointer border-2 border-[#DCDCDC] py-1.5 px-7 flex '>
                                <Dropdown menu={{ items }} trigger={['click']}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            Click me
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </div>
                        </div>
                        <div>
                            {
                                dummyCartInfo.map((cart, index) => (
                                    <div key={index}>
                                        <CartSection book={cart} />
                                    </div>
                                ))
                            }
                        </div>
                        <div className='text-right'>
                            <button onClick={() => setAddressDetails(true)} className={` ${addressDetails ? "hidden" : ""} uppercase text-white bg-[#3371B5] rounded-sm text-sm py-2 px-7`}>
                                Place Order
                            </button>
                        </div>
                    </div>

                    <div className='p-5 border-2 border-[#DCDCDC] rounded-sm'>
                        {
                            addressDetails ? (<>
                                <AddressDetails orderSummary={orderSummary} setOrderSummary={setOrderSummary} />
                            </>) : (<>
                                <div className=''>
                                    <p>Address Details</p>
                                </div>
                            </>)
                        }
                    </div>

                    <div className='p-5 border-2 border-[#DCDCDC] rounded-sm'>
                        {
                            orderSummary ? (<>
                                {
                                    dummyCartInfo.map((cart, index) => (
                                        <div key={index}>
                                            <OrderSummary book={cart} />
                                        </div>
                                    ))
                                }
                                <div className='text-right'>
                                    <button className={` uppercase text-white bg-[#3371B5] rounded-sm text-sm py-2 px-7`}>
                                        Checkout
                                    </button>
                                </div>
                            </>) : (<>
                                <div className=''>
                                    <p>Order Summary</p>
                                </div>
                            </>)
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cart
