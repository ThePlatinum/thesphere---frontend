import Button from '@/components/Button'
import AppLayout from '@/layouts/AppLayout'

function Account() {

  return (
    <>
      <AppLayout title={'Account'} >
        <section className='pb-12 pb-md-4'>
          <p className='muted'>Account</p>
          <h1>Emmanuel Adesina</h1>
          <h2 className='h6 light'>platinumemirate@gmail.com</h2>
          <Button onClick={()=>{}} title='Update Profile' className='p-0 underline action-btn' />
        </section>

        <section className="pb-12 pb-md-4">
          <h2 className='h6 light'>Newsletter</h2>
          <p>Not Subscribed</p>
          <Button onClick={()=>{}} title='Subscribe' className='p-0 underline action-btn' />
        </section>

        <section className="pb-12 pb-md-4">
          <h2 className='h6 light'>Interest</h2>
          <p>Not set</p>
          <Button onClick={()=>{}} title='Edit Interests' className='p-0 underline action-btn' />
        </section>

        <section className="pb-12 pb-md-4">
          <h2 className='h6 light'>Preferred Sources</h2>
          <p>Not set</p>
          <Button onClick={()=>{}} title='Edit Preferred Sources' className='p-0 underline action-btn' />
        </section>
      </AppLayout>
    </>
  )
}

export default Account