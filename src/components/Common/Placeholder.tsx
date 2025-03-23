import React from 'react'
import placeholderImg from '../../assets/images/Page-1.svg'
import Header from './Header'
import { useNavigate } from 'react-router-dom'

function Placeholder() {

  const navigate = useNavigate()

  return (
    <>
    <Header container='home' />
    <div className='flex flex-col justify-center items-center min-h-[75vh] gap-7'>
        <div className='flex flex-col items-center'>
            <p className='text-xl font-semibold text-[#0A0102]'>PLEASE LOG IN</p>
            <p className='text-xs text-[#9D9D9D] font-semibold'>Login to view items.</p>
        </div>
        <div>
            <img src={placeholderImg} alt='placeholder-image'/>
        </div>
        <div>
            <button onClick={() => navigate("/login")} className='text-[#A03037] font-normal border-[#A03037] border-2 text-xs py-2 px-6 mt-2'>LOGIN/SIGNUP</button>
        </div>
    </div>
    </>
  )
}

export default Placeholder
