import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import BookLongCard from '../components/Common/BookLongCard';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import Placeholder from '../components/Common/Placeholder';
import { getWishlist } from '../api/bookApi';

import bookCover1 from '../assets/images/BookCover1.png';
import bookCover2 from '../assets/images/BookCover2.png';
import bookCover3 from '../assets/images/BookCover3.png';
import bookCover4 from '../assets/images/BookCover4.png';
import bookCover5 from '../assets/images/BookCover5.png';
import bookCover6 from '../assets/images/BookCover6.png';
import bookCover7 from '../assets/images/BookCover7.png';
import bookCover8 from '../assets/images/BookCover8.png';
import bookCover9 from '../assets/images/BookCover9.png';


const bookCovers = [
    bookCover1, bookCover2, bookCover3, bookCover4, bookCover5,
    bookCover6, bookCover7, bookCover8, bookCover9
];

function Wishlist() {
    const [wishList, setWishList] = useState<{ product_id: any }[]>([]);
    const token = localStorage.getItem('token');

    const getWishlistItems = async () => {
        const response = await getWishlist();
        if (response?.data?.success) {
            console.log(response?.data?.result);
            setWishList(response?.data?.result);
        }
    };

    useEffect(() => {
        getWishlistItems();
    }, []);

    if (!token) {
        return (
            <div>
                {/* <Header container='home' /> */}
        
                    <Placeholder />
                
            </div>
        );
    }

    return (
        <div>
            <Header container='home' />
            <div className='min-h-[83.75vh] max-w-6xl p-5 mx-auto flex flex-col mt-2'>
                <Breadcrumbs container='wishlist' />
                <div className='mt-4'>
                    <div className='p-4 bg-[#F5F5F5]'>
                        <p className='font-semibold'>My WishList ({wishList.length})</p>
                    </div>
                    {
                        wishList.map((order, index) => {
                            return (
                                <div key={index}>
                                    <BookLongCard 
                                        book={{ ...order.product_id, cover: bookCovers[index % bookCovers.length] }} 
                                        container='wishlist' 
                                        getWishlistItems={getWishlistItems}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Wishlist;
