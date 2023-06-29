import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken
      // const userInfo = getState().auth.userInfo
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
        // headers.set('authorization', `Bearer ${userInfo}`)
        return headers
      }
    },
  }),
  endpoints: (build) => ({
    getDetails: build.query({
      query: () => ({
        url: 'api/user/profile',
        method: 'GET',
        // headers: {
        //   'Content-type': 'application/json',
        //   'Authorization': `Bearer ${}`, // notice the Bearer before your token
        // },
      }),
    }),
  }),
})

// export react hook
export const { useGetDetailsQuery } = authApi
