import React, { useEffect, useState } from 'react'
import { FaMinus } from 'react-icons/fa6'
import { IoAdd } from 'react-icons/io5'
import { removeCartItem, updateCartItem } from '../../api/bookApi'
import { decrementQuantity, incrementQuantity, removeFromCart, resetCart } from '../../services/slice/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { toast } from 'react-toastify'

type cartSectionProps = {
    book: any,
    product_id?: string,
    getCartItems: any
}

const CartSection = ({ book, product_id, getCartItems }: cartSectionProps) => {

    // console.log("book", book)

    const dispatch = useDispatch<AppDispatch>()

    const allCartBookDetails = useSelector((state: RootState) => state.cart.cart)
    console.log("allCartBookDetails", allCartBookDetails)

    const cartBookDetails = useSelector((state: RootState) => state.cart.cart.find((item) => item._id === book._id))

    const [cartCount, setCartCount] = useState<number>(cartBookDetails?.quantityToBuy || 1)

    const incrementCart = async () => {
        const newCount = cartCount + 1
        setCartCount(newCount)
        try{
            await updateCartItem(book._id, newCount)
            dispatch(incrementQuantity(product_id))
        }catch(err){
            console.log("Error in updating cart", err)
        }
    }

    const decrementCart = () => {
        if (cartCount > 1) {
            const newCount = cartCount - 1
            setCartCount(newCount)
            try{
                updateCartItem(book._id, newCount)
                dispatch(decrementQuantity(product_id))
            }catch(err)
            {
                console.log("Error in updating cart", err)
            }
        }
    }

    const removeItemFromCart = async () => {
        try{
            const response = await removeCartItem(product_id)
            if(response?.data?.success){
                toast.success("Item removed from cart")
                getCartItems()
                dispatch(removeFromCart(product_id))
            }
            console.log(response)
        }catch(err){
            console.log("Error in removing from cart", err)
        }
    }


    return (
        <>
            <div className='flex flex-row gap-2 mt-4'>
                <div className='w-24 h-28 p-4 flex justify-center items-center'>
                    <img className='' src={book?.cover} alt='book-image' />
                </div>
                <div className='flex flex-col items-start gap-1'>
                    <p className='text-[#0A0102] font-medium'>{book?.bookName}</p>
                    <p className='text-xs text-[#9D9D9D] font-medium'>by {book?.author}</p>
                    <div className='flex items-center space-x-2 mt-2 mb-5'>
                        <p className='font-semibold text-[#373434] text-lg'>{book?.discountPrice}</p>
                        <p className='text-[#878787] text-xs line-through'>{book?.price}</p>
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


                        <button onClick={removeItemFromCart} className='text-[#9D9D9D] text-xs font-medium cursor-pointer hover:text-black'>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartSection
