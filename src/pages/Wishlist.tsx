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

function Wishlist() {

    const wishlistLength = orders.length < 10 ? `0${orders.length}` : orders.length

    const token = localStorage.getItem('token');

    if (!token){
        return (
            <div>
                <Header container='home' />
                <div className='min-h-[83.75vh] max-w-6xl p-5 mx-auto flex flex-col mt-2'>
                    <Placeholder />
                </div>
            </div>
        )
    }


    return (
        <div>
            <Header container='home' />
            <div className='min-h-[83.75vh] max-w-6xl p-5 mx-auto flex flex-col mt-2'>
                <Breadcrumbs container='wishlist' />
                <div className='mt-4'>
                    <div className='p-4 bg-[#F5F5F5]'>
                        <p className='font-semibold'>My WishList ({wishlistLength})</p>
                    </div>
                    {
                        orders.map((order, index) => {
                            return (
                                <div key={index} className=''>
                                    <BookLongCard book={order} container='wishlist' />
                                </div>
                            )

                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Wishlist
