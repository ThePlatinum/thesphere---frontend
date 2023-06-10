import { store } from "../../store";
import { baseApi } from "../baseApi";

interface UserProps {
  name: string
  email: string
}

const accountApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getUser: build.query<UserProps, void>({
      query: () => 'api/user',
      providesTags: ['User'],
      transformErrorResponse(baseQueryReturnValue, meta, arg) {

        baseQueryReturnValue.data = null;
        
        return baseQueryReturnValue;
      },
    }),

    updateUser: build.mutation<any, any>({
      query: (q) => ({
        url: 'login',
        method: 'POST',
        body: q
      }),
      invalidatesTags: ['User']
    }),
  })
})

export const {
  useGetUserQuery,
  useUpdateUserMutation
} = accountApi;

export default accountApi;

