import React, { useEffect, useState } from 'react';
import bookImage from '../../assets/images/bookImage.png';
import bookImage2 from '../../assets/images/bookImage2.png';
import { FaHeart } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import FeedbackForm from './FeedbackForm';
import Feedback from './Feedback';
import { FaMinus } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import bookCover1 from '../../assets/images/BookCover1.png';
import bookCover2 from '../../assets/images/BookCover2.png';
import bookCover3 from '../../assets/images/BookCover3.png';
import bookCover4 from '../../assets/images/BookCover4.png';
import bookCover5 from '../../assets/images/BookCover5.png';
import { addToTheCart, addWishlist, getBookReviews, updateCartItem } from '../../api/bookApi';
import { toast } from 'react-toastify';
import { setWishList } from '../../services/slice/wishlistSlice';
import { addToCartReducer, decrementQuantity, incrementQuantity, resetCart } from '../../services/slice/cartSlice';

const images = [bookCover1, bookCover2, bookCover3, bookCover4, bookCover5];

type bookDetail = {
    bookName?: string,
    author?: string,
    price?: number,
    discountPrice?: number,
    _id?: string,
    quantity?: number,
    product_id?: string
};

function BookDetails() {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const bookList = useSelector((state: RootState) => state.bookList.bookList);
    const wishList = useSelector((state: RootState) => state.wishList.wishList);
    const cart = useSelector((state: RootState) => state.cart.cart)

    console.log("cart", cart)

    const [imageActive, setImageActive] = useState(0);
    const [bookDetails, setBookDetails] = useState<bookDetail>(
        bookList.find(book => book._id === location.pathname.split('/')[2]) || {}
    );
      const [reviews, setReviews] = React.useState([]);
    const [addToCart, setAddToCart] = useState(false);
    const [cartCount, setCartCount] = useState(1);

    useEffect(() => {
        const bookInCart = cart.find((book: bookDetail) => book?.product_id === bookDetails._id);
        if (bookInCart) {
            setAddToCart(true);
            setCartCount(bookInCart.quantityToBuy);
        }
    }, [])


    const getReviews = async () => {
        try {
          const response = await getBookReviews(bookDetails?._id);
          if(response?.data?.success){
            console.log(response?.data?.result);
            setReviews(response?.data?.result.reverse());
          }
        } catch (err) {
          console.log("Error in getting reviews", err);
        }
      }
    

    const incrementCart = async () => {

        if(cartCount >= (bookDetails?.quantity ?? 0)){
            toast.error("Quantity exceeds the available quantity")
            return;
        }
        const newCount = cartCount + 1;
        setCartCount(newCount);
        try {
            console.log("newCount", newCount)
            await updateCartItem(bookDetails?._id, newCount);
            dispatch(incrementQuantity(bookDetails));
        } catch (err) {
            console.log("Error in updating cart", err);
        }
    }

    const decrementCart = async () => {
        if (cartCount > 1) {
            const newCount = cartCount - 1;
            setCartCount(newCount);
            try {
                await updateCartItem(bookDetails._id, newCount);
                dispatch(decrementQuantity(bookDetails));
            } catch (err) {
                console.log("Error in updating cart", err);
            }
        };
    };

    const isInWishlist = wishList.find((book: bookDetail) => book._id === bookDetails._id);

    const addToWishlistHandler = async () => {
        if (isInWishlist) return;

        try {
            const response = await addWishlist(bookDetails?._id);
            if (response?.data?.message === "Item added to wish list") {
                toast.success("Item added to wishlist");
                dispatch(setWishList(bookDetails));
            }
        } catch (err) {
            console.log("Error in adding to wishlist", err);
        }
    };

    const addToCartHandler = async () => {
        try {
            const response = await addToTheCart(bookDetails._id);
            // console.log(response)
            if (response?.data?.success) {
                toast.success("Item added to cart");
                setCartCount(1);
                setAddToCart(true);
                dispatch(addToCartReducer({...response?.data?.result, name: bookDetails?.bookName, price: bookDetails?.price, discountPrice: bookDetails?.discountPrice, author: bookDetails?.author}));  
            }
        } catch (err) {
            console.log("Error in adding to cart", err);
        }
    }

    return (
        <div className='flex flex-col md:flex-row mt-6'>
            <div className='md:w-[40%] flex-col'>
                <div className='flex'>
                    <div>
                        {images.map((image, index) => (
                            <div key={index} onClick={() => setImageActive(index)} className={`cursor-pointer h-[68px] p-2 flex justify-center items-center border-2 ${imageActive === index ? 'border-red-500' : 'border-[#E0E0E0]'}`}>
                                <img className='w-10' src={image} alt={`book-image-${index + 1}`} />
                            </div>
                        ))}
                    </div>
                    <div className='w-[82%] flex-col justify-center items-center p-8 h-[400px] border-2 border-[#E0E0E0]'>
                        <img className='w-72 h-full object-contain' src={images[imageActive]} alt="main-book-image" />
                    </div>
                </div>
                <div className='flex xl:gap-2 ml-2 xl:ml-0 w-full space-x-2 justify-end p-2 md:p-4'>
                    {addToCart ? (
                        <div className='h-10 md:h-12 w-32 sm:w-36 md:w-40 flex items-center justify-between'>
                            <div onClick={decrementCart} className='cursor-pointer w-7 sm:w-8 md:w-9 h-7 sm:h-8 md:h-9 flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2 rounded-full'>
                                <p className={`${cartCount === 1 ? "text-[#DBDBDB]" : "text-black"} text-base sm:text-lg`}><FaMinus /></p>
                            </div>
                            <div className='w-8 sm:w-10 md:w-12 h-7 sm:h-8 md:h-9 select-none flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2'>
                                <p className='text-lg sm:text-xl'>{cartCount}</p>
                            </div>
                            <div onClick={incrementCart} className='cursor-pointer w-7 sm:w-8 md:w-9 h-7 sm:h-8 md:h-9 flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2 rounded-full'>
                                <p className='text-lg sm:text-xl'><IoAdd /></p>
                            </div>
                        </div>
                    ) : (
                        <button onClick={addToCartHandler} className='h-10 md:h-12 w-32 sm:w-36 md:w-40 bg-[#A03037] text-white flex items-center justify-center'>ADD TO BAG</button>
                    )}


                    {isInWishlist ? (
                        <div className='h-10 md:h-12 flex select-none items-center justify-center gap-1 sm:gap-2 md:gap-3 w-32 sm:w-36 md:w-40 bg-[#F0F0F0] text-[#A03037] border border-[#A03037] cursor-default'>
                            <FaHeart className='text-[#A03037]' />
                            <p className='text-xs sm:text-sm md:text-base font-medium'>WISHLISTED</p>
                        </div>
                    ) : (
                        <div onClick={addToWishlistHandler} className='h-10 md:h-12 flex select-none items-center justify-center gap-1 sm:gap-2 md:gap-3 w-32 sm:w-36 md:w-40 bg-[#373434] cursor-pointer text-white'>
                            <FaHeart className='text-white' />
                            <p className='text-xs sm:text-sm md:text-base'>WISHLIST</p>
                        </div>
                    )}
                </div>
            </div>
            <div className='md:w-[60%] flex flex-col gap-6 ml-6'>
                <div className='flex select-none flex-col gap-1 border-b-2 border-[#E0E0E0] w-full'>
                    <p className='text-3xl text-[#373434]'>{bookDetails?.bookName}</p>
                    <p className='text-[#878787] text-lg'>{bookDetails?.author}</p>
                    <div className='flex text-xs items-center gap-2'>
                        <div className='flex h-5 px-2 items-center justify-center text-white text-xs bg-[#388E3C] rounded-sm'>
                            <span>4.5</span>
                            <IoStar className='text-white text-xs ml-0.5' />
                        </div>
                        <p className='text-[#878787]'>(20)</p>
                    </div>
                    <div className='flex items-center space-x-2 mt-2 mb-5'>
                        <p className='font-semibold text-[#373434] text-3xl'>Rs. {bookDetails?.discountPrice}</p>
                        <p className='text-[#878787] text-sm line-through'>{bookDetails?.price}</p>
                    </div>
                </div>
                <div>
                    <FeedbackForm getReviews={getReviews} bookDetails={bookDetails}/>
                    <Feedback reviews={reviews} setReviews={setReviews} getReviews={getReviews} bookDetails={bookDetails}/>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;
