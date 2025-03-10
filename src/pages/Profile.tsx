import React from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import ProfileEditForm from '../components/Profile/ProfileEditForm'
import AddressForm from '../components/Profile/AddressForm'
import Breadcrumbs from '../components/Common/Breadcrumbs'

function Profile() {
    return (
        <div>
            <Header container='home' />
            <div className='min-h-[83.75vh] max-w-6xl p-5 mx-auto flex flex-col gap-2 mt-2'>
                <Breadcrumbs container='profile'/>
                <div className='w-full md:w-[60%] ml-12 mt-3 flex flex-col gap-10 items-start'>
                    <ProfileEditForm />
                    <AddressForm/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile
