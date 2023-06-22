import ApplicationLogo from "./ApplicationLogo";

const Footer = () =>
  <footer>
    <div className="flex px-2 px-md-8 py-4 space-between align-center bg-grey">
      <ApplicationLogo />
      <div className="flex gap-2">
        <div className="social"></div>
        <div className="social"></div>
        <div className="social"></div>
      </div>
    </div>
  </footer>

export default Footer