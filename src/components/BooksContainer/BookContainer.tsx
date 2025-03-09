import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import BookCatalogue from './BookCatalogue';

const items: MenuProps['items'] = [
    {
        label: (
            <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
                1st menu item
            </a>
        ),
        key: '0',
    },
    {
        label: (
            <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
                2nd menu item
            </a>
        ),
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];

const BookContainer = () => {
    return (
        <div className='w-[78%] mx-auto p-7'>
            <div className='flex justify-between'>
                <div className='flex items-center space-x-2'>
                    <p className='text-2xl font-semibold'>Books</p>
                    <p className='text-sm text-gray-400'>(123 items)</p>
                </div>
                <div className='cursor-pointer border-2 border-black-600 w-40 flex items-center py-1 px-2'>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space className='flex space-x-2'>
                                <p className='text-xs font-semibold'>Sort by relevance</p>
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>

            <div>
                <BookCatalogue/>
            </div>
            Book container
        </div>
    )
}

export default BookContainer
