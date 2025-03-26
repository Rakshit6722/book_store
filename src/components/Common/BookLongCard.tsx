import React from 'react'
import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md"
import { removeWishlist } from '../../api/bookApi';
import { toast } from 'react-toastify';
import { removeFromWishlist } from '../../services/slice/wishlistSlice';
import { useDispatch } from 'react-redux';

type bookLongCardProps = {
    book: any,
    container?: string,
    getWishlistItems?: any
}

function BookLongCard({ book, container, getWishlistItems }: bookLongCardProps) {
    const dispatch = useDispatch()

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        
        if (isNaN(date.getTime())) return dateString;
        
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        
        return date.toLocaleDateString('en-US', options);
    }

    const removeFromWishList = async () => {
        try {
            const response = await removeWishlist(book._id);
            if (response?.data?.success) {
                toast.success("Item removed from wishlist");
                dispatch(removeFromWishlist(book));
                getWishlistItems();
            }
        } catch (err) {
            console.error("Error while removing from wishlist", err);
            toast.error("Failed to remove item from wishlist");
        }
    }

    return (
        <div className={`flex  md:flex-row justify-between ${container === 'wishlist' ? "items-center" : "items-start"} w-full py-6 px-4 md:px-9 border-2 ${container === 'wishlist' ? "border-[#F5F5F5]" : "border-[#E4E4E4]"} rounded-sm gap-4 md:gap-0`}>
            <div className='flex items-center space-x-4'>
                <div>
                    <img className='w-16' src={book?.cover} alt='book-cover-image' />
                </div>
                <div>
                    <p className='text-lg'>{book?.bookName}</p>
                    <p className='text-[#9D9D9D] text-xs'>{book?.author}</p>
                    <div className='mt-1 flex items-center space-x-2'>
                        <p className='font-semibold'>Rs. {book?.discountPrice}</p>
                        <p className='text-[#878787] text-xs line-through'>{book?.price}</p>
                    </div>
                </div>
            </div>
            <div>
                {
                    container === 'order' && (
                        <div>
                            <div className='flex items-center space-x-2'>
                                <GoDotFill className='text-[#26A541]' />
                                <p className='text-sm text-[#0A0102] font-semibold'>
                                    Order placed on {formatDate(book.product_date)}
                                </p>
                            </div>
                        </div>
                    )
                }
                {
                    container === 'wishlist' && (
                        <div onClick={removeFromWishList}>
                            <MdDelete className='text-[#9D9D9D] cursor-pointer hover:text-black' />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default BookLongCard