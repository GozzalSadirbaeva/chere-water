import { Outlet } from "react-router-dom";
import NavigatePage from "../pages/NavigatePage";
import NotFoundPage from "../pages/NotFoundPage";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Main from "../pages/main/Main";
import Products from "../pages/products/Products";

export const router = [
  { path: "/", element: <NavigatePage /> },
  {
    path: "/:lang",
    element: <Outlet />,
    children: [
      { path: "", element: <Main /> },
      { path: "products", element: <Products /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];
