import { store } from "../../store";
import { XSRF_TOKEN, baseApi } from "../baseApi";

interface CategoryProps {
  id: number
  name: string
  description: string
}

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getAllCategories: build.query<Array<CategoryProps>, void>({
      query: () => 'api/categories',
      providesTags: ['Categories'],
    }),

    getUserCategories: build.query<Array<CategoryProps>, void>({
      query: () => 'api/user/categories',
      providesTags: ['UserCategories'],
    }),

    updateUserCategories: build.mutation<any, Array<number>>({
      query: (q) => ({
        url: 'api/user/categories',
        method: 'POST',
        body: {
          rtk_token: XSRF_TOKEN(),
          'categories': q
        }
      }),
      invalidatesTags: ['UserCategories', 'Feeds']
    }),

  })
})

export const {
  useGetAllCategoriesQuery,
  useUpdateUserCategoriesMutation,
  useGetUserCategoriesQuery
} = categoriesApi;

export default categoriesApi;

