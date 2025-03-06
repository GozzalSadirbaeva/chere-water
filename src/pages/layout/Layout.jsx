import { Outlet, useLocation, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NotFoundPage from "../../components/NotFoundPage";

const Layout = () => {
  const location = useLocation();
  const isNotFound =
    location.pathname.includes("404") || location.pathname === "/404";
  const allowedLangs = ["uz", "ru"];
  const { lang } = useParams();

  if (!allowedLangs.includes(lang)) {
    return <NotFoundPage />;
  }
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
