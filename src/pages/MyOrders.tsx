import React from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import bookCover from '../assets/images/bookImage.png'
import BookLongCard from '../components/Common/BookLongCard'
import Breadcrumbs from '../components/Common/Breadcrumbs'
import Placeholder from '../components/Common/Placeholder'


const orders = [
    {
        title: "Don't Make Me Think",
        author: "Steve Krug",
        price: 1500,
        cover: bookCover
    },
    {
        title: "Don't Make Me Think",
        author: "Steve Krug",
        price: 1500,
        cover: bookCover
    },
]

function MyOrders() {

    const token = localStorage.getItem('token');

    if(!token) return <Placeholder/>

    return (
        <div>
            <Header container='home' />
            <div className='min-h-[83.75vh] max-w-6xl p-5 mx-auto flex flex-col gap-2 mt-2'>
                <Breadcrumbs container='order'/>
                {
                    orders.map((order, index) => {
                        return (
                            <div key={index} className='py-2'>
                                <BookLongCard book={order} container='order' />
                            </div>
                        )

                    })
                }
            </div>
            <Footer />
        </div>
    )
}

export default MyOrders
