import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("X-Requested-With", 'XMLHttpRequest')
    
    return headers
  },
  credentials: 'include'
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const XSRF_TOKEN = () => decodeURIComponent(document.cookie.split('=')[1]) // document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1')

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['User', 'Preference'],
  refetchOnReconnect: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({})
})

export const {
} = baseApi

