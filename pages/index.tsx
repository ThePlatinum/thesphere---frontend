import Button from '@/components/Button'
import Login from '@/components/Modals/Auth/Login'
import Register from '@/components/Modals/Auth/Register'
import AppLayout from '@/layouts/AppLayout'
import { useGetUserCategoriesQuery } from '@/lib/redux/apis/endpoints/categories'
import { showCategory, showSources } from '@/lib/redux/slices/preferenceModalSlice'
import { useDispatch } from 'react-redux'

function Home() {

  const dispatch = useDispatch()

  const { data: user_categories, isLoading: gettingUserCategories } = useGetUserCategoriesQuery()

  const handlePreferenceModal = (which: 'category' | 'source') => {
    which == 'category' ?
      dispatch(showCategory()) :
      dispatch(showSources())
  }

  return (
    <>
      <AppLayout title={'Home'} >
        {/* Banner */}
        <div className='flex'>
        </div>

        {/* Search */}
        <div className="py-2 search flex gap-4">
          <input type="text" className='flex-1 px-2' placeholder='Search' />
          <Button onClick={() => { }} className='auth-btn'>Search</Button>
        </div>

        {/* Preferences: Interests */}
        <div className="py-0 flex gap-4 align-top wrap">
          <p className='bold'>Interests:</p>
          <p>{user_categories?.map((category) => category.name).join(', ')}</p>
          <Button onClick={() => handlePreferenceModal("category")} title='Edit Interests' className='p-0 underline action-btn' />
        </div>

      </AppLayout>

      <Login />
      <Register />
    </>
  )
}

export default Home