import React from 'react'
import { Breadcrumb } from 'antd';
import { useParams } from 'react-router-dom';

type BreadcrumbsProps = {
    container?: string
}

const Breadcrumbs = ({container}:BreadcrumbsProps) => {

    const params = useParams()
    const bookId = params.id ?? 0

  return (
    <div>
     <Breadcrumb
    items={[
      {
        title: <a href='/home'>Home</a>,
      },
      {
        title: container === 'bookPage' ? <a href='/book'><p className='text-black'>Book({Number(bookId)+1})</p></a> : "",
      }
    ]}
  />
    </div>
  )
}

export default Breadcrumbs
