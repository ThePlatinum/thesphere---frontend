import { useDispatch, useSelector } from "react-redux"
import ApplicationLogo from "./ApplicationLogo"
import Button from "./Button"
import { RootState } from "@/lib/redux/store"
import router from 'next/router'
import { showLogin } from "@/lib/redux/slices/authModalSlice"

const Header = () => {

  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  const handleAccount = () => {
    auth ?
      router.push('/account') :
      dispatch(showLogin())
  }

  return (
    <nav>
      <div className="flex px-2 px-md-8 py-2 space-between align-center">
        <ApplicationLogo />

        <div className="flex">
          <Button onClick={() => { }} title="RSS Feed" />
          <Button onClick={handleAccount} className="account" title="My Account" />
        </div>
      </div>
    </nav>
  )
}

export default Header