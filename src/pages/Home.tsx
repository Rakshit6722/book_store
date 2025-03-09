import React from 'react'
import Header from '../components/Common/Header'
import BookContainer from '../components/BookContainer/BookContainer'
import Footer from '../components/Common/Footer'

const Home = () => {
    return (
        <div>
            <Header container='home' />
            <BookContainer/>
            <Footer/>
        </div>
    )
}

export default Home
