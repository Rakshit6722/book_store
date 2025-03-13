import React, { useState } from 'react'
import { FaMinus } from 'react-icons/fa6'
import { IoAdd } from 'react-icons/io5'

type cartSectionProps = {
    book: any
}

const CartSection = ({ book }: cartSectionProps) => {

    const [cartCount, setCartCount] = useState(1)

    const incrementCart = () => {
        setCartCount(prevCount => prevCount + 1)
    }

    const decrementCart = () => {
        if (cartCount > 1) {
            setCartCount(prevCount => prevCount - 1)
        }
    }

    return (
        <>
            <div className='flex flex-row gap-2 mt-4'>
                <div className='w-24 h-28 p-4 flex justify-center items-center'>
                    <img className='' src={book?.cover} alt='book-image' />
                </div>
                <div className='flex flex-col items-start gap-1'>
                    <p className='text-[#0A0102] font-medium'>{book?.title}</p>
                    <p className='text-xs text-[#9D9D9D] font-medium'>by {book?.author}</p>
                    <div className='flex items-center space-x-2 mt-2 mb-5'>
                        <p className='font-semibold text-[#373434] text-lg'>Rs. 1500</p>
                        <p className='text-[#878787] text-xs line-through'>Rs. 2000</p>
                    </div>

                    <div className='flex gap-5'>
                        <div className='h-8 md:h-10 w-24 sm:w-28 md:w-32 flex items-center justify-between'>
                            <div
                                onClick={decrementCart}
                                className='cursor-pointer w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border rounded-full'
                            >
                                <p className={`${cartCount === 1 ? "text-[#DBDBDB]" : "text-black"} text-sm sm:text-base`}>
                                    <FaMinus />
                                </p>
                            </div>
                            <div className='w-6 sm:w-8 md:w-10 h-6 sm:h-7 md:h-8 select-none flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border'>
                                <p className='text-base sm:text-lg'>{cartCount}</p>
                            </div>
                            <div
                                onClick={incrementCart}
                                className='cursor-pointer w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border rounded-full'
                            >
                                <p className='text-base sm:text-lg'>
                                    <IoAdd />
                                </p>
                            </div>
                        </div>


                        <button>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartSection
