import React from 'react'
import { Navigate } from 'react-router-dom'

type AuthRoutesProps = {
    children: React.ReactNode
}

const AuthRoutes = ({children}: AuthRoutesProps) => {

    const token = localStorage.getItem('token')

    return token ? <Navigate to={"/"}/> : <>{children}</>
}

export default AuthRoutes
