import React, { useContext, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import BookCatalogue from './BookCatalogue';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SearchContext } from '../../context/SearchProvider';

const BookContainer = () => {
    const { setSortQuery }: any = useContext(SearchContext);
    const { bookList } = useSelector((state: RootState) => state.bookList);
    
    const [sortOrder, setSortOrder] = useState<string>('relevance');

    
    const items: MenuProps['items'] = [
        {
            label: 'Sort by relevance',
            key: 'relevance',
            onClick: () => handleSort('relevance'),
        },
        {
            label: 'Price: High to Low',
            key: 'highToLow',
            onClick: () => handleSort('highToLow'),
        },
        {
            label: 'Price: Low to High',
            key: 'lowToHigh',
            onClick: () => handleSort('lowToHigh'),
        },
    ];

   
    const handleSort = (sortKey: string) => {
        setSortOrder(sortKey);
        setSortQuery(sortKey); 
    };

    const getSortLabel = (sortOrder: string) => {
        if (sortOrder === 'highToLow') return 'Price: High to Low';
        if (sortOrder === 'lowToHigh') return 'Price: Low to High';
        return 'Sort by relevance';
    };

    return (
        <div className='max-w-6xl mx-auto p-4 md:p-8'>
            <div className='flex justify-between items-center mb-6'>
                <div className='flex items-center space-x-2'>
                    <p className='text-lg md:text-2xl font-semibold'>Books</p>
                    <p className='text-xs md:text-sm text-gray-400'>({bookList.length} items)</p>
                </div>
                <div className='cursor-pointer border-2 border-black-600 w-40 flex items-center justify-center py-1 px-2'>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <button onClick={(e) => e.preventDefault()}>
                            <Space className='flex justify-between items-center w-full'>
                                <p className='text-xs font-semibold'>
                                    {getSortLabel(sortOrder)}
                                </p>
                                <DownOutlined />
                            </Space>
                        </button>
                    </Dropdown>
                </div>
            </div>

            <div className='mt-4 min-h-[70vh]'>
                <BookCatalogue />
            </div>
        </div>
    );
};

export default BookContainer;
