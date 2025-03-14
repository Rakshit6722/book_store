import React from 'react'
import loginSignUpImage from '../../assets/images/loginSignupImage.png'
import { NavLink, useLocation } from 'react-router-dom';
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";

type authTemplateProps = {
  container: string;
}

function AuthTemplate({ container }: authTemplateProps) {

  const location = useLocation()
  console.log(location.pathname.split('/')[1])

  const [passwordVisibie, setPasswordVisible] = React.useState(false)
  const [error, setError] = React.useState({
    fullName: "",
    email: "",
    password: "",
    mobile: ""
  })


  return (
    <div data-testid="authTemplate" className='flex p-4 md:p-0 items-center justify-center h-[100dvh] bg-[#9D9D9D]'>

      <div className='md:flex items-center justify-center w-screen sm:relative md:mr-52'>
 
        <div className='bg-[#F5F5F5] w-1/3 h-[391px] hidden sm:flex md:flex border-2 rounded-3xl shadow-xl flex-col space-y-6 align-center justify-center p-2'>
          <div className=' flex ml-12 align-center'>
            <img className='rounded-full w-[55%]' src={loginSignUpImage} alt='login-signup-image' />
          </div>
          <div className='w-2/4 ml-12 text-center'>
            <p className='font-semibold text-[#0A0102]'>ONLINE BOOK SHOPPING</p>
          </div>
        </div>

        <div className='bg-[#FFFFFF] md:w-96 h-[440px] border-2 rounded-[7px] shadow-xl z-10 sm:static sm:ml-4 md:absolute md:left-15 lg:right-[202px] px-3'>
          <div className='w-full'>
            <div className={'flex justify-center font-semibold text-2xl px-12 py-5 pb-0 space-x-14 mt-1'}>
              <div className='mr-8'>
                <NavLink to={'/'}>
                  <p className={`${container === "login" ? "text-black" : "text-[#878787]"} cursor-pointer`}>LOGIN</p>
                  {container === "login" && <div className='border-b-[8px] rounded-xl ml-7 border-[#A03037] w-[32%] mt-1'></div>}
                </NavLink>
              </div>
              <div className='flex flex-col'>
                <NavLink to={'/register'}>
                  <p className={`${container === "register" ? "text-black" : "text-[#878787]"} cursor-pointer`}>SIGNUP</p>
                  {container === "register" && <div className='border-b-[8px] rounded-xl ml-8 border-[#A03037] w-[32%] mt-1'></div>}
                </NavLink>
              </div>
            </div>
          </div>
          <div className='w-full flex-col flex justify-center'>
            <form className='w-full max-w-xs mx-auto'>
              {container === "register" && (
                <div className='flex w-full flex-col space-y-4 align-center justify-center px-7 py-3'>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='fullName'>Full Name</label>
                    <input type='text' id='fullName' className='w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600' />
                    {error.fullName && <p className='text-red-600 text-xs'>{error.fullName}</p>}
                  </div>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='email'>Email Id</label>
                    <input type='text' id='email' className='w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600' />
                    {error.email && <p className='text-red-600 text-xs'>{error.email}</p>}
                  </div>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='password'>Password</label>
                    <div className='relative flex-col w-full justify-center'>
                      <input type={passwordVisibie ? "text" : "password"} id='password' className='w-full h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600' />
                      {passwordVisibie ? (<>
                        <IoEyeOff data-testid="togglePassword" onClick={() => setPasswordVisible(!passwordVisibie)} className='absolute right-2 top-3 cursor-pointer text-[#9D9D9D]' />
                      </>) : (<>
                        <IoEye data-testid="togglePassword" onClick={() => setPasswordVisible(!passwordVisibie)} className='absolute right-2 top-3 cursor-pointer text-[#9D9D9D]' />
                      </>)}
                    </div>
                    {error.password && <p className='text-red-600 text-xs'>{error.password}</p>}
                  </div>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='mobileNumber'>Mobile Number</label>
                    <input type='text' id='mobileNumber' className='w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600' />
                    {error.mobile && <p className='text-red-600 text-xs'>{error.mobile}</p>}
                  </div>
                  <div className='flex flex-col items-center mt-2'>
                    <button className='bg-[#A03037] text-sm text-white w-full h-9 rounded-sm p-1 mt-3'>Signup</button>
                  </div>
                </div>
              )}
              {container === "login" && (
                <div className='flex w-full flex-col space-y-4 align-center justify-center px-7 py-3'>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='email'>Email Id</label>
                    <input type='text' id='email' className='w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600' />
                  </div>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='password'>Password</label>
                    <div className='relative flex-col w-full justify-center'>
                      <input type={passwordVisibie ? "text" : "password"} id='password' className='w-full h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600' />
                      {passwordVisibie ? (<>
                        <IoEyeOff onClick={() => setPasswordVisible(!passwordVisibie)} className='absolute right-2 top-3 cursor-pointer text-[#9D9D9D]' />
                      </>) : (<>
                        <IoEye onClick={() => setPasswordVisible(!passwordVisibie)} className='absolute right-2 top-3 cursor-pointer text-[#9D9D9D]' />
                      </>)}
                      <NavLink to={'forgotPassword'}>
                        <p className='w-full text-right text-xs text-[#9D9D9D] mt-1 cursor-pointer'>Forget Password?</p>
                      </NavLink>
                    </div>
                  </div>
                  <div className='flex flex-col items-center mt-2'>
                    <button className='bg-[#A03037] text-sm text-white w-full h-9 rounded-sm p-1 mt-3'>Login</button>
                  </div>
                  <div className='relative flex items-center justify-center my-3'>
                    <div className='absolute border-t border-[#E1E4EA]-300 w-[80%]'></div>
                    <p className='relative bg-white px-4 text-[#343434] font-bold text-lg z-10'>OR</p>
                  </div>

                  <div className='flex justify-center space-x-4'>
                    <button className='bg-[#4266B2] text-white text-xs w-[40%] py-3 rounded-sm'>Facebook</button>
                    <button className='bg-[#E4E4E4] text-black text-xs w-[40%] py-3 rounded-sm'>Google</button>
                  </div>
                </div>
              )}
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthTemplate