import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constants";
import {logout, setCredentials} from './auth'



const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, {getState}) =>{
     const token = getState().auth.user?.accessToken;
     const googleToken = getState().auth.googleToken;
     if(token){
        headers.set("authorization", `Bearer ${token}`)
     }else{
        headers.set("authorization", `Bearer ${googleToken}`)
     }
     return headers;
  }
});


const baseQueryWithRefreshToken = async(args, api, extraOptions) => {
    let response = await baseQuery(args, api, extraOptions);
    if(response?.error?.originalStatus === 403){
       const refreshResponse = await baseQuery(
        "/auth/new_access_token",
        api,
        extraOptions
       );
       if(refreshResponse?.data){
        api.dispatch(setCredentials({...refreshResponse.data}));
        response  = await baseQuery(args, api, extraOptions);
       }else{
        api.dispatch(logout())
       }
    }
    return response;
}


export const apiSlice = createApi({
  baseQuery:baseQueryWithRefreshToken,
  tagTypes: ["Post", "User"],
  endpoints: (builder) => ({}),
});
