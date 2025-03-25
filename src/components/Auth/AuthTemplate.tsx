import React, { useState } from 'react'
import loginSignUpImage from '../../assets/images/loginSignupImage.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { login, register } from '../../api/userApi';
import { toast } from 'react-toastify';
import { set } from 'react-hook-form';


type authTemplateProps = {
  container: string;
}

function AuthTemplate({ container }: authTemplateProps) {

  const navigate = useNavigate()

  const [passwordVisible, setPasswordVisible] = React.useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: ""
  })

  type ErrorKeys = 'fullName' | 'email' | 'password' | 'mobile';

  const [error, setError] = React.useState<Record<ErrorKeys, string>>({
    fullName: "",
    email: "",
    password: "",
    mobile: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value
    })
    if (error[id as ErrorKeys]) {
      setError({
        ...error,
        [id]: ""
      })
    }
  }

  const validateForm = () => {
    let isValid = true
    let errorObj = {
      fullName: "",
      email: "",
      password: "",
      mobile: ""
    }

    if (container === "register" && !formData.fullName) {
      errorObj.fullName = "Full Name is required"
      isValid = false
    }

    if (!formData.email) {
      errorObj.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errorObj.email = "Please enter a valid email address"
      isValid = false
    }

    if (!formData.password) {
      errorObj.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 6) {
      errorObj.password = "Password must be at least 6 characters"
      isValid = false
    }

    if (container === "register" && !formData.mobile) {
      errorObj.mobile = "Mobile is required"
      isValid = false
    } else if (container === "register" && !/^\d{10}$/.test(formData.mobile)) {
      errorObj.mobile = "Please enter a valid 10-digit mobile number"
      isValid = false
    }

    setError(errorObj)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (container === "login") {
      try {
        const data = await login({ email: formData.email, password: formData.password })
        console.log("response",data)
        console.log("token",data?.data?.result?.accessToken)
        if(data?.data?.success){
          localStorage.setItem('token', data?.data?.result.accessToken)
          localStorage.setItem("name", formData.email.split("@")[0])
          toast.success("Login Success")
          navigate('/')
        }
      } catch (err: any) {
        console.log(err.message)
        toast.error(err.message || "Login Failed")
      }
    } else if (container === "register") {
      try {
        const data = await register({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.mobile,
        }
        )

        if (data?.data?.result !== null) {
          toast.success("User Created")
          navigate('/login')
        } else {
          toast.error(data?.data?.message)
        }
      } catch (err: any) {
        console.log(err.message)
      }
    }
    setFormData({
      fullName: "",
      email: "",
      password: "",
      mobile: ""
    })
  }

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
            <form onSubmit={handleSubmit} className='w-full max-w-xs mx-auto'>
              {container === "register" && (
                <div className='flex w-full flex-col space-y-4 align-center justify-center px-7 py-3'>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='fullName'>Full Name</label>
                    <input
                      type='text'
                      id='fullName'
                      value={formData.fullName}
                      onChange={handleChange}
                      className='w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600'
                    />
                    {error.fullName && <p className='text-red-600 text-xs self-start'>{error.fullName}</p>}
                  </div>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='email'>Email Id</label>
                    <input
                      type='email'
                      id='email'
                      value={formData.email}
                      onChange={handleChange}
                      className='w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600'
                    />
                    {error.email && <p className='text-red-600 text-xs self-start'>{error.email}</p>}
                  </div>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='password'>Password</label>
                    <div className='relative flex-col w-full justify-center'>
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='w-full h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600'
                      />
                      {passwordVisible ? (
                        <IoEyeOff
                          data-testid="togglePassword"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className='absolute right-2 top-3 cursor-pointer text-[#9D9D9D]'
                        />
                      ) : (
                        <IoEye
                          data-testid="togglePassword"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className='absolute right-2 top-3 cursor-pointer text-[#9D9D9D]'
                        />
                      )}
                    </div>
                    {error.password && <p className='text-red-600 text-xs self-start'>{error.password}</p>}
                  </div>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='mobile'>Mobile Number</label>
                    <input
                      type='tel'
                      id='mobile'
                      value={formData.mobile}
                      onChange={handleChange}
                      className='w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600'
                    />
                    {error.mobile && <p className='text-red-600 text-xs self-start'>{error.mobile}</p>}
                  </div>
                  <div className='flex flex-col items-center mt-2'>
                    <button type="submit" className='bg-[#A03037] text-sm text-white w-full h-9 rounded-sm p-1 mt-3'>Signup</button>
                  </div>
                </div>
              )}
              {container === "login" && (
                <div className='flex w-full flex-col space-y-4 align-center justify-center px-7 py-3'>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='email'>Email Id</label>
                    <input
                      onChange={handleChange}
                      type='email'
                      id='email'
                      value={formData.email}
                      className='w-full h-9 border-2 rounded-sm p-2 outline-none focus:border-red-600'
                    />
                    {error.email && <p className='text-red-600 text-xs self-start'>{error.email}</p>}
                  </div>
                  <div className='flex flex-col items-center'>
                    <label className='text-xs font-normal self-start' htmlFor='password'>Password</label>
                    <div className='relative flex-col w-full justify-center'>
                      <input
                        onChange={handleChange}
                        type={passwordVisible ? "text" : "password"}
                        id='password'
                        value={formData.password}
                        className='w-full h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600'
                      />
                      {passwordVisible ? (
                        <IoEyeOff
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className='absolute right-2 top-3 cursor-pointer text-[#9D9D9D]'
                        />
                      ) : (
                        <IoEye
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className='absolute right-2 top-3 cursor-pointer text-[#9D9D9D]'
                        />
                      )}
                      {error.password && <p className='text-red-600 text-xs self-start'>{error.password}</p>}
                      <NavLink to={'forgotPassword'}>
                        <p className='w-full text-right text-xs text-[#9D9D9D] mt-1 cursor-pointer'>Forget Password?</p>
                      </NavLink>
                    </div>
                  </div>
                  <div className='flex flex-col items-center mt-2'>
                    <button type="submit" className='bg-[#A03037] text-sm text-white w-full h-9 rounded-sm p-1 mt-3'>Login</button>
                  </div>
                  <div className='relative flex items-center justify-center my-3'>
                    <div className='absolute border-t border-[#E1E4EA]-300 w-[80%]'></div>
                    <p className='relative bg-white px-4 text-[#343434] font-bold text-lg z-10'>OR</p>
                  </div>

                  <div className='flex justify-center space-x-4'>
                    <button type="button" className='bg-[#4266B2] text-white text-xs w-[40%] py-3 rounded-sm'>Facebook</button>
                    <button type="button" className='bg-[#E4E4E4] text-black text-xs w-[40%] py-3 rounded-sm'>Google</button>
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