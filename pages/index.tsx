import Button from '@/components/Button'
import FeedCards from '@/components/Feed/FeedCards'
import Login from '@/components/Modals/Auth/Login'
import Register from '@/components/Modals/Auth/Register'
import AppLayout from '@/layouts/AppLayout'
import { useGetUserCategoriesQuery } from '@/lib/redux/apis/endpoints/categories'
import { useGetFeedsQuery } from '@/lib/redux/apis/endpoints/feeds'
import { useGetUserSourcesQuery } from '@/lib/redux/apis/endpoints/sources'
import { showCategory, showSources } from '@/lib/redux/slices/preferenceModalSlice'
import { useRef, useState } from 'react'
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
    const MAX_DISPLAY_COUNT = 12;
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

  const [page, setPage] = useState<number>(1)
  const [query, setQuery] = useState<string>('')

  const searchBoxRef = useRef(null);

  const { data: feedsData, isLoading } = useGetFeedsQuery({
    page: page,
    query: query
  })

  const feeds = feedsData?.data

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') handleSearch()
  };

  const handleSearch = () => {
    const searchBox = searchBoxRef?.current;
    // @ts-ignore
    setQuery(searchBox?.value)
  };

  return (
    <>
      <AppLayout title={'Home'} >

        {/* Popular */}
        <div className='flex'>
        </div>

        {/* Search */}
        <div className="py-2 search flex gap-4">
          <input
            type="text"
            className='flex-1 px-2'
            placeholder='Search'
            ref={searchBoxRef}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={handleSearch} className='auth-btn'>Search</Button>
        </div>

        {/* Preferences: Interests */}
        <p className="py-0">
          <b>Interests:</b>
          {user_categories?.map((category) => category.name).join(', ')} {' '}
          <Button onClick={() => handlePreferenceModal("category")} title='Edit Interests' className='p-0 underline action-btn' />
        </p>

        {/* Preferences: Sources */}
        <SourceList user_sources={user_sources} />

        <div className="flex">
          <div className="col-12 col-md-8">
            {/* Feeds */}
            <div className="py-2">
              <h5>For You</h5>
              <hr className="red" />
              {feeds?.map((feed, i) => <FeedCards key={i} feed={feed} />)}
            </div>

          </div>
        </div>

      </AppLayout>

      <Login />
      <Register />
    </>
  )
}

export default Home