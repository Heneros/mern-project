import {apiSlice} from "./apiSlice"
import {  AUTH_URL } from "../../utils/constants";
import {logout} from './auth'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        loginUser: builder.mutation({
              query: (credentials)=>({
                url: `${AUTH_URL}/login`,
                method: "POST",
                body: credentials
              })  
        }),
            logout: builder.query({
      query: (data) => ({
        url: `${AUTH_URL}/logout`,
        method: "GET"
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}){
        try{
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState())
        }catch(err){
          console.log(err)
        }
      }
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        // body: data,
        credentials: "include",
      }),
    }),
    })
})

export const {useLoginUserMutation, useLogoutQuery} = authApiSlice