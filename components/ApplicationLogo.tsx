import TheSphere from "@img/TheSphere.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ApplicationLogo = ({ height, classes, ...props }: any) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const defaultHeight = 45

  const logoHeight =
    height ? height :
      isMobile ? defaultHeight / 1.5 : defaultHeight;

  return (
    <Link href="/">
      <Image
        src={TheSphere}
        alt="TheSphere Logo"
        height={logoHeight}
        className={classes}
        {...props}
      />
    </Link>
  );
};

export default ApplicationLogo;
