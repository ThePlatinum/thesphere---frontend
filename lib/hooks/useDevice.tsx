import { useEffect, useState } from "react";

const useDevice = () => {

  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [deviceResolution, setDeviceResolution] = useState(window.devicePixelRatio);

  useEffect(() => {
    const handleResize = () => {
      setDeviceHeight(window.innerHeight);
      setDeviceWidth(window.innerWidth);
      setDeviceResolution(window.devicePixelRatio);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    deviceHeight,
    deviceWidth,
    deviceResolution,
  };
};

export default useDevice;