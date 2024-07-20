import React from 'react';
import { useSelector } from 'react-redux';

import {
    selectCurrentUserGoogleToken,
    selectCurrentUserToken,
} from '../redux/slices/auth';
import { decodeToken } from 'react-jwt';
const useAuthUser = () => {
    const token = useSelector(selectCurrentUserToken);
    const googleToken = useSelector(selectCurrentUserGoogleToken);

    let isAdmin = false;
    let isEditor = false;
    let accessRight = 'User';
    //   console.log(token)
    if (token) {
        const decodedToken = decodeToken(token);
        const { roles } = decodedToken;
        console.log(roles)

        isAdmin = roles.includes('Admin');
        isEditor = roles.includes('Editor');
        if (isAdmin) {
            accessRight = 'Admin';
            return { roles, isAdmin, accessRight };
        } else if (isEditor) {
            accessRight = 'Editor';
            return { roles, isEditor, accessRight };
        }
    } else if (googleToken) {
        const gDecodedToken = decodeToken(googleToken);
        const { roles } = gDecodedToken;
        isAdmin = roles.includes('Admin');
        isEditor = roles.includes('Editor');
        if (isAdmin) {
            accessRight = 'Admin';
            return { roles, isAdmin, accessRight };
        } else if (isEditor) {
            accessRight = 'Editor';
            return { roles, isEditor, accessRight };
        }
    }
        return {roles: [], isAdmin, isEditor, accessRight}

};

export default useAuthUser;
