import { XSRF_TOKEN, baseApi } from "../baseApi";

export interface LoginAuthProps {
  email: string
  password: string
}

export interface RegisterAuthProps extends LoginAuthProps {
  name: string
  confirm_password: string
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    initCsrf: builder.query<void, void>({
      query: () => `sanctum/csrf-cookie`
    }),

    login: builder.mutation<any, LoginAuthProps>({
      query: (loginProps) => ({
        url: 'login',
        method: 'POST',
        body: {
          rtk_token: XSRF_TOKEN(),
          ...loginProps
        },
      }),
      invalidatesTags: ['User', 'UserCategories', 'Feeds',  'Popular', 'UserSources']
    }),

    register: builder.mutation<any, RegisterAuthProps>({
      query: (registerProps) => ({
        url: 'register',
        method: 'POST',
        body: {
          rtk_token: XSRF_TOKEN(),
          ...registerProps
        }
      }),
      invalidatesTags: ['User', 'UserCategories']
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
        body: {
          rtk_token: XSRF_TOKEN(),
        },
      }),
      invalidatesTags: ['User', 'UserCategories']
    }),
  })
})

export const {
  useLazyInitCsrfQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation
} = authApi;

export default authApi;

