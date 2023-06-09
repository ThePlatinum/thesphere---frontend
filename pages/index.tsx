import Login from '@/components/Modals/Auth/Login'
import Register from '@/components/Modals/Auth/Register'
import AppLayout from '@/layouts/AppLayout'

function Home() {

  return (
    <>
      <AppLayout title={'Home'} >
        <div className='flex'>
        </div>
      </AppLayout>
      
      <Login />
      <Register />
    </>
  )
}

export default Home