import React, { useEffect } from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import Breadcrumbs from '../components/Common/Breadcrumbs'
import CartSection from '../components/Cart/CartSection'
import AddressDetails from '../components/Cart/AddressDetails'
import OrderSummary from '../components/Cart/OrderSummary'
import { addOrder, getCartItem, removeCartItem } from '../api/bookApi'
import bookCover1 from '../assets/images/BookCover1.png';
import bookCover2 from '../assets/images/BookCover2.png';
import bookCover3 from '../assets/images/BookCover3.png';
import bookCover4 from '../assets/images/BookCover4.png';
import bookCover5 from '../assets/images/BookCover5.png';
import bookCover6 from '../assets/images/BookCover6.png';
import bookCover7 from '../assets/images/BookCover7.png';
import bookCover8 from '../assets/images/BookCover8.png';
import bookCover9 from '../assets/images/BookCover9.png';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { resetCart } from '../services/slice/cartSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Placeholder from '../components/Common/Placeholder'
import { setPrevOrdersList } from '../services/slice/orderSlice'

const bookCover = [
    bookCover1, bookCover2, bookCover3, bookCover4, bookCover5,
    bookCover6, bookCover7, bookCover8, bookCover9
]


const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [addressDetails, setAddressDetails] = React.useState(false)
    const [orderSummary, setOrderSummary] = React.useState(false)
    const [cartItems, setCartItems] = React.useState<any[]>([])

    const cart = useSelector((state: RootState) => state.cart.cart)


    const token = localStorage.getItem('token')

    const previousOrderList = cart.map((book) => {
        return {
            _id: book.product_id ?? '',
            bookName: book?.name ?? 'Unknown Name',
            product_quantity: Number(book.quantityToBuy),
            discountPrice: Number(book.discountPrice),
            price: Number(book.price),
            product_date: book?.updatedAt,
            author: book?.author,
        }
    })

    const orderSummaryDetails = cart.map((book) => {
        return {
            product_id: book.product_id ?? '',
            product_name: book?.name ?? 'Unknown Name',
            product_quantity: Number(book.quantityToBuy),
            product_price: Number(book.price),
        }
    })



    useEffect(() => {
        getCartItems()
        // dispatch(resetPrevOrdersList())
    }, [])


    const addToPrevOrderList = () => {
        dispatch(setPrevOrdersList(previousOrderList))

    }

    const removeEverythingFromCart = () => {
        cart.forEach(async (book) => {
            await removeCartItem(book._id)
        })

        dispatch(resetCart())
    }
    const handleCheckout = async () => {
        try {
            const response = await addOrder(orderSummaryDetails)
            if (response?.data?.success) {
                console.log("Order placed successfully", response)
                toast.success("Order placed successfully")
                navigate('/orderPlaced')
                // dispatch(resetCart())
                addToPrevOrderList()
                removeEverythingFromCart()
            }
        } catch (err) {
            console.log("Error in checkout", err)
        }
    }

    const getCartItems = async () => {
        try {
            const response = await getCartItem()
            console.log("Cart items", response)
            if (response?.data?.success) {
                console.log("Cart items", response?.data?.result)
                setCartItems(response?.data?.result)
            }
        } catch (err) {
            console.log("Error in getting cart items", err);
        }
    }

    if (!token) {
        return (
            <Placeholder />
        )
    }

    return (
        <div>
            <Header container='home' />
            <div className='max-w-6xl min-h-[84.85vh] mx-auto p-8 flex flex-col gap-10 items-start'>
                <Breadcrumbs container='cart' />
                <div className='w-full md:w-[75%] flex flex-col gap-5'>
                    <div className='p-5 flex flex-col gap-2 border-2 border-[#DCDCDC] rounded-sm'>
                        <div className='flex justify-between items-center w-full'>
                            <p data-testid="myCart-text" className='font-medium text-lg'>My Cart</p>
                        </div>
                        <div>
                            {

                                cartItems.length === 0 ? (
                                    <div className='flex flex-col items-center justify-center gap-2'>
                                        <p className='text-[#878787]'>No items in the cart</p>
                                    </div>
                                ) : (
                                    <>
                                        {
                                            cartItems.map((cart, index) => (
                                                <div key={cart._id}>
                                                    <CartSection getCartItems={getCartItems} product_id={cart._id} book={{ ...cart.product_id, cover: bookCover[index % bookCover.length] }} />
                                                </div>
                                            ))
                                        }
                                    </>
                                )

                            }
                        </div>
                        <div className='text-right'>
                            <button disabled={cartItems.length === 0} onClick={() => setAddressDetails(true)} className={` ${addressDetails ? "hidden" : ""} uppercase text-white ${cartItems.length === 0 ? "bg-gray-500" : "bg-[#3371B5]"} ${cartItems.length === 0 ? "hidden" : ""}  rounded-sm text-sm py-2 px-7`}>
                                Place Order
                            </button>
                        </div>
                    </div>

                    <div className='p-5 border-2 border-[#DCDCDC] rounded-sm'>
                        {
                            addressDetails ? (
                                <AddressDetails orderSummary={orderSummary} setOrderSummary={setOrderSummary} />
                            ) : (
                                <div className=''>
                                    <p>Address Details</p>
                                </div>
                            )
                        }
                    </div>

                    <div className='p-5 border-2 border-[#DCDCDC] rounded-sm'>
                        {
                            orderSummary ? (<>
                                {
                                    cart.map((cart, index) => (
                                        <div key={cart._id}>
                                            <OrderSummary book={{ ...cart, cover: bookCover[index % bookCover.length] }} />
                                        </div>
                                    ))
                                }
                                <div className='flex justify-between items-center mt-4 pt-3 border-t border-[#DCDCDC]'>
                                    <p className='font-medium'>Total:</p>
                                    <p className='font-bold'>
                                        Rs. {cart.reduce((total, book) => total + (book.discountPrice || 0), 0).toFixed(2)}
                                    </p>
                                </div>
                                <div className='text-right mt-4'>
                                    <button onClick={handleCheckout} className={`uppercase text-white bg-[#3371B5] rounded-sm text-sm py-2 px-7`}>
                                        Checkout
                                    </button>
                                </div>
                            </>) : (
                                <div className=''>
                                    <p>Order Summary</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cart
