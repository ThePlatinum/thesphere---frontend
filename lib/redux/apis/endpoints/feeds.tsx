import { baseApi } from "../baseApi";

export interface Feeds {
  title: string
  description: string
  slug: string
  image_url: string
  source: {
    name: string
  }
  published_at: Date
  categories: {
    name: string
  }[]
}

interface responseProps {
  data: Feeds[]
  last_page: number
  total: number
}

const feedsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getFeeds: builder.query<responseProps, { page?: number, query?: string }>({
      query: (q) => {
        let queryString = "api/feed/all?";

        if (q.query) {
          queryString += `query=${q.query}&`;
        }

        if (q.page) {
          queryString += `page=${q.page}&`;
        }

        // Remove the trailing '&' character
        queryString = queryString.slice(0, -1);

        return queryString;
      },
      providesTags: ['Feeds'],
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return {
          data: baseQueryReturnValue.data,
          last_page: baseQueryReturnValue.last_page,
          total: baseQueryReturnValue.total
        };
      },
    })

  })
})

export const {
  useGetFeedsQuery,
} = feedsApi;

export default feedsApi;