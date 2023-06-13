import Button from '@/components/Button'
import Login from '@/components/Modals/Auth/Login'
import Register from '@/components/Modals/Auth/Register'
import AppLayout from '@/layouts/AppLayout'
import { useGetUserCategoriesQuery } from '@/lib/redux/apis/endpoints/categories'
import { useGetUserSourcesQuery } from '@/lib/redux/apis/endpoints/sources'
import { showCategory, showSources } from '@/lib/redux/slices/preferenceModalSlice'
import { useDispatch } from 'react-redux'

function Home() {

  const dispatch = useDispatch()

  const { data: user_categories, isLoading: gettingUserCategories } = useGetUserCategoriesQuery()
  const { data: user_sources, isLoading: gettingUserSources } = useGetUserSourcesQuery()

  const handlePreferenceModal = (which: 'category' | 'source') => {
    which == 'category' ?
      dispatch(showCategory()) :
      dispatch(showSources())
  }

  const SourceList = ({ user_sources }: any) => {
    const MAX_DISPLAY_COUNT = 20;
    const remainingCount = user_sources?.length - MAX_DISPLAY_COUNT;
  
    return (
      <p className="py-0 pt-2 pt-md-0">
        <b>Sources:</b> 
        {user_sources?.slice(0, MAX_DISPLAY_COUNT).map((source: any) => source?.name).join(', ')}{' '}
        {remainingCount > 0 && <span>+{remainingCount} </span>}
        <Button onClick={() => handlePreferenceModal("source")} title='Edit Sources' className='p-0 underline action-btn' />
      </p>
    );
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
        <p className="py-0">
          <b>Interests:</b> 
          {user_categories?.map((category) => category.name).join(', ')} {' '}
          <Button onClick={() => handlePreferenceModal("category")} title='Edit Interests' className='p-0 underline action-btn' />
        </p>

        {/* Preferences: Sources */}
        <SourceList user_sources={user_sources} />

      </AppLayout>

      <Login />
      <Register />
    </>
  )
}

export default Home