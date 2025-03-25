import React, { useContext, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../../api/bookApi';
import { setBookList, setLoading } from '../../services/slice/bookSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Pagination } from 'antd';
import Book from './Book';
import { AppDispatch, RootState } from '../../store';
import { SearchContext } from '../../context/SearchProvider';
import bookCover1 from '../../assets/images/BookCover1.png';
import bookCover2 from '../../assets/images/BookCover2.png';
import bookCover3 from '../../assets/images/BookCover3.png';
import bookCover4 from '../../assets/images/BookCover4.png';
import bookCover5 from '../../assets/images/BookCover5.png';
import bookCover6 from '../../assets/images/BookCover6.png';
import bookCover7 from '../../assets/images/BookCover7.png';
import bookCover8 from '../../assets/images/BookCover8.png';
import bookCover9 from '../../assets/images/BookCover9.png';
import { resetCart } from '../../services/slice/cartSlice';

const bookCovers: string[] = [
    bookCover1, bookCover2, bookCover3, bookCover4, bookCover5, 
    bookCover6, bookCover7, bookCover8, bookCover9
];

const BookCatalogue = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { searchQuery, sortQuery }: any = useContext(SearchContext);
    const bookList = useSelector((state: RootState) => state.bookList.bookList);
    const loading = useSelector((state: RootState) => state.bookList.loading);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);

    useEffect(() => {
        getBooksList();
        // dispatch(resetCart())
    }, []);

    const getBooksList = async () => {
        dispatch(setLoading(true));
        const response = await getBooks();
        dispatch(setBookList(response?.data?.result || []));
        dispatch(setLoading(false));
    };


    const sortedBooks = useMemo(() => {
        let sortedArray = [...bookList];
    
        if (sortQuery === 'highToLow') {
            sortedArray.sort((a, b) => {
                if (a.price === 0 && b.price !== 0) return 1; 
                if (b.price === 0 && a.price !== 0) return -1; 
                return b.price - a.price;
            });
        } else if (sortQuery === 'lowToHigh') {
            sortedArray.sort((a, b) => {
                if (a.price === 0 && b.price !== 0) return 1; 
                if (b.price === 0 && a.price !== 0) return -1;
                return a.price - b.price;
            });
        }
        return sortedArray;
    }, [sortQuery, bookList]);
    

    const filteredBooks = useMemo(() => {
        if (!searchQuery) return sortedBooks;
        return sortedBooks.filter((book) => 
            book.bookName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, sortedBooks]);


    const startIndex = (currentPage - 1) * pageSize;
    const paginatedBooks = filteredBooks.slice(startIndex, startIndex + pageSize);

    const handlePageChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) setPageSize(pageSize);
    };

    if (loading) {
        return (
            <div className='flex justify-center items-center h-[75vh]'>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#A03037" }} spin />} />
            </div>
        );
    }

    return (
        <div className='flex flex-col justify-between min-h-[80vh]'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {paginatedBooks.length > 0 ? (
                    paginatedBooks.map((book, index) => (
                        <NavLink to={`/book/${book._id}`} key={book._id}>
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

            {filteredBooks.length > pageSize && (
                <div className='flex justify-center mt-10 mb-6'>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={filteredBooks.length}
                        onChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default BookCatalogue;
