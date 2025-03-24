import React, { useContext } from 'react'
import logo from '../../assets/images/education.svg'
import { IoIosSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoSearch } from 'react-icons/io5';
import ProfileDropdown from './ProfileDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { persistor, RootState } from '../../store';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { resetCart } from '../../services/slice/cartSlice';
import { removeCartItem, removeWishlist } from '../../api/bookApi';
import { resetWishList } from '../../services/slice/wishlistSlice';
import { toast } from 'react-toastify';
import { SearchContext } from '../../context/SearchProvider';

type headerProps = {
    container?: string
}

const Header = ({ container }: headerProps) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {searchQuery, setSearchQuery}: any = useContext(SearchContext)

    const { cart } = useSelector((state: RootState) => state.cart);
    const { wishList } = useSelector((state: RootState) => state.wishList);

    const removeEverythingFromCart = () => {
        cart.map(async (book) => {
            await removeCartItem(book._id)
        })
        dispatch(resetCart())
    }

    const removeEverythingFromWishList = () => {
        wishList.map(async (book) => {
            await removeWishlist(book._id)
        })
        dispatch(resetWishList())
    }

    const logout = () => {
        removeEverythingFromCart()
        removeEverythingFromWishList()
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        persistor.purge()
        navigate("/")
        toast.success("Logged out successfully")
    }

    return (
        <div className='w-full bg-[#A03037]'>
            <div className='h-[60px] max-w-6xl flex justify-between mx-auto items-center px-7'>
                <div className='flex items-center space-x-8'>
                    <NavLink to={"/"}>
                        <div className='flex items-center space-x-2'>
                            <img className='w-8' src={logo} alt='logo-img'></img>
                            <p className='text-white text-xl'>Bookstore</p>
                        </div>
                    </NavLink>
                    {
                        container === 'home' && (
                            <div className='hidden sm:flex items-center space-x-1 bg-white rounded-[3px]'>
                                <div className='flex items-center justify-center w-10 h-10'>
                                    <IoIosSearch className='text-[#9D9D9D] text-xl' />
                                </div>
                                <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} type='text' placeholder='Search...' className='md:w-[250px] lg:w-[450px] h-10 bg-transparent outline-none' />
                            </div>
                        )
                    }
                </div>
                {
                    container === 'home' && (
                        <div className='flex gap-5 md:space-x-12'>
                            <div className='flex flex-col md:hidden items-center justify-center cursor-pointer'>
                                <div className='flex items-center justify-center h-6'>
                                    <IoSearch className='text-white text-xl' />
                                </div>
                                <p className='text-white hidden md:block text-xs mt-1'>Search</p>
                            </div>
                            <ProfileDropdown logout={logout} />
                            <div className='flex flex-col items-center justify-center cursor-pointer relative'>
                                <NavLink to={"/cart"}>
                                    <div className='flex items-center justify-center h-6 relative'>
                                        <AiOutlineShoppingCart className='text-white text-xl' />
                                        {cart.length > 0 && (
                                            <div className='absolute -top-1 -right-2 bg-white text-[#A03037] text-xs font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center'>
                                                {cart.length}
                                            </div>
                                        )}
                                    </div>
                                    <p className='text-white hidden md:block text-xs mt-1'>Cart</p>
                                </NavLink>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Header