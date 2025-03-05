import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const Layout = () => {
  const location = useLocation();
  const isNotFound =
    location.pathname.includes("404") || location.pathname === "/404";

  return (
    <div>
      <main>
        <Outlet />
      </main>
      {!isNotFound && <Footer />}
    </div>
  );
};

export default Layout;
