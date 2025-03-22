import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../../api/bookApi';
import { setBookList, setLoading } from '../../services/slice/bookSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Pagination } from 'antd';
import Book from './Book';
import bookCover1 from '../../assets/images/BookCover1.png';
import bookCover2 from '../../assets/images/BookCover2.png';
import bookCover3 from '../../assets/images/BookCover3.png';
import bookCover4 from '../../assets/images/BookCover4.png';
import bookCover5 from '../../assets/images/BookCover5.png';
import bookCover6 from '../../assets/images/BookCover6.png';
import bookCover7 from '../../assets/images/BookCover7.png';
import bookCover8 from '../../assets/images/BookCover8.png';
import bookCover9 from '../../assets/images/BookCover9.png';
import { AppDispatch, RootState } from '../../store';

const bookCovers: string[] = [
    bookCover1, bookCover2, bookCover3, bookCover4, bookCover5, 
    bookCover6, bookCover7, bookCover8, bookCover9
];

const BookCatalogue = () => {
    const dispatch = useDispatch<AppDispatch>();
    const bookList = useSelector((state: RootState) => state.bookList.bookList);
    const loading = useSelector((state: RootState) => state.bookList.loading);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8); 

    useEffect(() => {
        getBooksList();
    }, []);

    const getBooksList = async () => {
        dispatch(setLoading(true));
        const response = await getBooks();
        dispatch(setBookList(response?.data?.result || [])); 
        dispatch(setLoading(false));
    };

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedBooks = bookList.slice(startIndex, startIndex + pageSize);

    const handlePageChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) setPageSize(pageSize);
    };

    if (loading) {
        return (
            <div className='flex justify-center items-center h-[80vh]'>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#A03037" }} spin />} />
            </div>
        );
    }

    return (
        <div className='flex flex-col'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {paginatedBooks.length > 0 ? (
                    paginatedBooks.map((book, index) => (
                        <NavLink to={`/home/${book._id}`} key={book._id}>
                            <div className='flex justify-center'>
                                <Book book={{ ...book, cover: bookCovers[(startIndex + index) % bookCovers.length] }} />
                            </div>
                        </NavLink>
                    ))
                ) : (
                    <div className='flex justify-center items-center h-[80vh]'>
                        <p className='text-[#A03037] font-semibold text-lg'>No books available</p>
                    </div>
                )}
            </div>

            {bookList.length > pageSize && (
                <div className='flex justify-center mt-10 mb-6'>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={bookList.length} 
                        onChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default BookCatalogue;
