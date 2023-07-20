import Button from '@/components/Button'
import AppLayout from '@/layouts/AppLayout'
import { useGetUserQuery } from '@/lib/redux/apis/endpoints/account'
import { useEffect } from 'react'
import router from 'next/router'
import { useLogoutMutation } from '@/lib/redux/apis/endpoints/auth'
import { baseApi } from '@/lib/redux/apis/baseApi'
import { useDispatch } from 'react-redux'
import { showCategory, showSources } from '@/lib/redux/slices/preferenceModalSlice'
import { useGetUserCategoriesQuery } from '@/lib/redux/apis/endpoints/categories'
import { useGetUserSourcesQuery } from '@/lib/redux/apis/endpoints/sources'

function Account() {

  const { data: user, isLoading, isError } = useGetUserQuery()
  const { data: user_categories, isLoading: gettingUserCategories } = useGetUserCategoriesQuery()
  const { data: user_sources, isLoading: gettingUserSources } = useGetUserSourcesQuery()

  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    await logout()

    dispatch(baseApi.util.resetApiState())
  }

  const handlePreferenceModal = (which: 'category' | 'source') => {
    which == 'category' ?
      dispatch(showCategory()) :
      dispatch(showSources())
  }

  useEffect(() => {
    if ((!user && !isLoading) || isError) router.push('/')
  }, [user, isLoading, isError])

  return (
    <>
      <AppLayout title={'Account'} >
        <section className='pb-12 pb-md-4'>
          <p className='muted'>Account</p>
          <h1>{user?.name}</h1>
          <h2 className='h6 light'>{user?.email}</h2>
          <Button onClick={() => { }} title='Update Profile' className='p-0 underline action-btn' />
        </section>

        <section className="pb-12 pb-md-4">
          <h2 className='h6 light'>Newsletter</h2>
          <p>Not Subscribed</p>
          <Button onClick={() => { }} title='Subscribe' className='p-0 underline action-btn' />
        </section>

        <section className="pb-12 pb-md-4">
          <h2 className='h6 light'>Interest</h2>
          <div className="py-0 flex gap-4 align-top wrap">
            {!user_categories && <p>Not set</p>}
            <p>{user_categories?.map((category) => category.name).join(', ')}</p>
          </div>
          <Button onClick={() => handlePreferenceModal("category")} title='Edit Interests' className='p-0 underline action-btn' />
        </section>

        <section className="pb-12 pb-md-4">
          <h2 className='h6 light'>Preferred Sources</h2>
          {!user_sources && <p>Not set</p>}
          <p>{user_sources?.map((source) => source.name).join(', ')}</p>
          <Button onClick={() => handlePreferenceModal("source")} title='Edit Preferred Sources' className='p-0 underline action-btn' />
        </section>

        <section className="pb-12 pb-md-4">
          <Button onClick={handleLogout} title='Logout' className='p-0 underline action-btn' />
        </section>
      </AppLayout>
    </>
  )
}

export default Account