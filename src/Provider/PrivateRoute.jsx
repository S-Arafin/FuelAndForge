import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../Context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-teal-400"></span>
            </div>
        );
    }

    if (user) {
        return children;
    }

    // Passes the location they tried to visit into the state, so Login can read it later
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default PrivateRoute;