import { baseApi } from "../baseApi";

interface UserProps {
  name: string
  email: string
}

const accountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getUser: builder.query<UserProps, void>({
      query: () => 'api/user',
      providesTags: ['User'],
      transformErrorResponse(baseQueryReturnValue, meta, arg) {

        baseQueryReturnValue.data = null;

        return baseQueryReturnValue;
      },
    }),

  })
})

export const {
  useGetUserQuery
} = accountApi;

export default accountApi;

