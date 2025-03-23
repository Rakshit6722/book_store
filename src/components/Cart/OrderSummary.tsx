import React from 'react'

type orderSummaryProps = {
    book: any
}

const OrderSummary = ({book}:orderSummaryProps) => {
  return (
     <div className='flex flex-row gap-2 mt-4'>
                <div className='w-24 h-28 p-4 flex justify-center items-center'>
                    <img className='' src={book?.cover} alt='book-image' />
                </div>
                <div className='flex flex-col items-start gap-1'>
                    <p className='text-[#0A0102] font-medium'>{book?.name}</p>
                    <p className='text-xs text-[#9D9D9D] font-medium'>by {book?.author}</p>
                    <div className='flex items-center space-x-2 mt-2 mb-5'>
                        <p className='font-semibold text-[#373434] text-lg'>Rs. {book?.discountPrice}</p>
                        <p className='text-[#878787] text-xs line-through'>{book?.price}</p>
                    </div>
                </div>
            </div>
  )
}

export default OrderSummary
