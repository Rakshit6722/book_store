import { Breadcrumb } from 'antd';
import React from 'react';

type BreadcrumbsProps = {
  container?: string
}

const getBreadcrumbTitle = (container: string) => {
  const titles: Record<string, { path: string; label: string }> = {
      bookPage: { path: '/book', label: 'Book' },
      order: { path: '/myOrder', label: 'My Orders' },
      wishlist: { path: '/wishlist', label: 'My Wishlist' },
      profile: { path: '/profile', label: 'Profile' },
      cart: { path: '/cart', label: 'My Cart' }
  };

  return titles[container ?? '']
      ? <a href={titles[container ?? ''].path}><p className='text-black font-semibold'>{titles[container ?? ''].label}</p></a>
      : "";
};

const Breadcrumbs = ({ container }: BreadcrumbsProps) => {
  return (
      <div>
          <Breadcrumb
              items={[
                  {
                      title: <a href='/'>Home</a>,
                  },
                  {
                      title: getBreadcrumbTitle(container ?? ''),
                  }
              ]}
          />
      </div>
  );
};

export default Breadcrumbs;