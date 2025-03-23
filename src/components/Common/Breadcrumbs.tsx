import React from 'react'
import { Breadcrumb } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type BreadcrumbsProps = {
  container?: string
}

const Breadcrumbs = ({ container }: BreadcrumbsProps) => {

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: <a href='/'>Home</a>,
          },
          {
            title: container === 'bookPage' ? <a href='/book'><p className='text-black font-semibold'>Book</p></a> :
              container === 'order' ? <a href='/myOrder'><p className='text-black font-semibold'>My Orders</p></a> :
                container === 'wishlist' ? <a href='/wishlist'><p className='text-black font-semibold'>My Wishlist</p></a> :
                  container === 'profile' ? <a href='/profile'><p className='text-black font-semibold'>Profile</p></a> : 
                    container === 'cart' ? <a href='/cart'><p className='text-black font-semibold'>My Cart</p></a> : "",
          }
        ]}
      />
    </div>
  )
}

export default Breadcrumbs
