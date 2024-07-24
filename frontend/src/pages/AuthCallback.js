import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AuthCallback() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            localStorage.setItem('googleToken', token);
            navigate('/profile');
        } else {
            navigate('/login');
        }
    }, [location, navigate]);

    return <div>Authenticating...</div>;
}

export default AuthCallback;