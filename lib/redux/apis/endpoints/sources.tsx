import { store } from "../../store";
import { XSRF_TOKEN, baseApi } from "../baseApi";

interface CategoryProps {
  id: number
  name: string
  description: string
}

const sourcesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getAllSources: build.query<Array<CategoryProps>, void>({
      query: () => 'api/sources',
      providesTags: ['Sources'],
    }),

    getUserSources: build.query<Array<CategoryProps>, void>({
      query: () => 'api/user/sources',
      providesTags: ['UserSources'],
    }),

    updateUserSources: build.mutation<any, Array<number>>({
      query: (q) => ({
        url: 'api/user/sources',
        method: 'POST',
        body: {
          rtk_token: XSRF_TOKEN(),
          'sources': q
        }
      }),
      invalidatesTags: ['UserSources', 'Feeds']
    }),

  })
})

export const {
  useGetAllSourcesQuery,
  useUpdateUserSourcesMutation,
  useGetUserSourcesQuery
} = sourcesApi;

export default sourcesApi;