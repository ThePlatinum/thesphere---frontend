import Login from '@/components/Modals/Auth/Login'
import AppLayout from '@/layouts/AppLayout'

function Home() {

  return (
    <>
      <AppLayout title={'Home'} >
        <div className='flex'>
        </div>
      </AppLayout>
      
      <Login />
    </>
  )
}

export default Home