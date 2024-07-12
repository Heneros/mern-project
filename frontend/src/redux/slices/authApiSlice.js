import {apiSlice} from "./apiSlice"
import {  AUTH_URL } from "../../utils/constants";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        loginUser: builder.mutation({
              query: (credentials)=>({
                url: `${AUTH_URL}/login`,
                method: "POST",
                body: credentials
              })  
        })
    })
})

export const {useLoginUserMutation} = authApiSlice