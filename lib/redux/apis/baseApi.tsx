import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("X-Requested-With", 'XMLHttpRequest')
    
    return headers
  },
  credentials: 'same-origin'
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const XSRF_TOKEN = (name = 'XSRF-TOKEN') => {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};
// decodeURIComponent(document.cookie.split('=')[1]) // document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1')

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRetry,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({}),
  tagTypes: [
    'User',
    'Categories',
    'UserCategories',
    'Sources',
    'UserSources',
    'Feeds',
    'Popular',
    'FeedCategory'
  ]
})

export const {
} = baseApi

