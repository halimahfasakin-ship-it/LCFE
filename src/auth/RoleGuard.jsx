import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

const RoleGuard = ({ role }) => {
    const cookies = new Cookies();

    const token = cookies.get("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    const decoded = jwtDecode(token);

    if (decoded.role !== role) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default RoleGuard