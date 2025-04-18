import React, { useEffect } from "react";
import { useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


type Props = {
    children?: React.ReactNode
};

const Layout: React.FC<Props> = ({children}) => {
  // const { pathname } = useLocation();
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    //   eslint-disable-next-line
    }, [pathname]);

    return null;
  };
  ScrollToTop();
  return (
    <React.Fragment>
        <Navbar/>
        <div className="body pt-20 md:pt-24">{children}</div> {/* Added padding-top */}
        <Footer/>
    </React.Fragment>
  );
};

export default Layout;