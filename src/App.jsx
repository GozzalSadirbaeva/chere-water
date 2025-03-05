import { Outlet, Route, Router, Routes } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import NavigatePage from "./pages/NavigatePage";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Main from "./pages/main/Main";
import Products from "./pages/products/Products";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavigatePage />} />
        <Route path="/:lang/*" element={<Outlet />}>
          <Route index element={<Main />} />
          <Route path="products" element={<Products />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
