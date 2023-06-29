import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/dist/query/react";

export const employesApi = createApi({
    reducerPath: 'employeesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:5000/',
    }),
    endpoints: (build) => ({
        getEmployees: build.query({
            query: () => ({
                url: 'api/employee/all',
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetEmployeesQuery } = employesApi