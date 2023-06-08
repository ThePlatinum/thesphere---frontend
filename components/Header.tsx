import ApplicationLogo from "./ApplicationLogo"
import Button from "./Button"

const Header = () => {
  return (
    <nav>
      <div className="flex px-2 px-md-8 py-2 space-between align-center">
        <ApplicationLogo />

        <div className="flex gap-2">
          <Button onClick={() => { }} title="RSS Feed" />
          <Button onClick={() => { }} className="account" outline title="My Account" />
        </div>
      </div>
    </nav>
  )
}

export default Header