import NavigatePage from "./pages/NavigatePage";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Layout from "./pages/layout/Layout";
import Main from "./pages/main/Main";
import Products from "./pages/products/Products";

export const router = [
  { path: "", element: <NavigatePage /> },
  {
    path: "/:lang",
    element: <Layout />,
    children: [
      { path: "", element: <Main /> },
      { path: "products", element: <Products /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
];
