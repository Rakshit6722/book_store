import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../../api/bookApi';
import { setBookList, setLoading } from '../../services/slice/bookSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
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
    bookCover1,
    bookCover2,
    bookCover3,
    bookCover4,
    bookCover5,
    bookCover6,
    bookCover7,
    bookCover8,
    bookCover9
];

const BookCatalogue = () => {
    const dispatch = useDispatch<AppDispatch>();
    const bookList = useSelector((state: RootState) => state.bookList.bookList);
    const loading = useSelector((state: RootState) => state.bookList.loading)

    useEffect(() => {
        getBooksList();
    }, []);

    const getBooksList = async () => {
        dispatch(setLoading(true))
        const data = await getBooks();
        dispatch(setBookList(data?.data?.result || []));
        dispatch(setLoading(false))
    };

    if(loading){
        return (
            <div className='flex justify-center items-center h-[80vh]'>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color:"#A03037" }} spin />} />
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {bookList.length > 0 ? (
                bookList.map((book, index) => (
                    <NavLink to={`/home/${book._id}`} key={index}>
                        <div className='flex justify-center'>
                            <Book book={{ ...book, cover: bookCovers[index % bookCovers.length] }} />
                        </div>
                    </NavLink>
                ))
            ) : (
                <div className='flex justify-center items-center h-[80vh]'>
                    <p className='text-[#A03037] font-semibold text-lg'>No books available</p>
                </div>
            )}
        </div>
    );
};

export default BookCatalogue;
