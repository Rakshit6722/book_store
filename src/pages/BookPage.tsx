import React from 'react'
import Breadcrumbs from '../components/Common/Breadcrumbs'
import Header from '../components/Common/Header'
import BookDetails from '../components/BookDetails/BookDetails'

const BookPage = () => {
    return (
        <>
            <Header container='home' />
            <div className='max-w-6xl mx-auto p-8'>
                <Breadcrumbs container="bookPage" />
                <BookDetails/>
            </div>
        </>
    )
}

export default BookPage
