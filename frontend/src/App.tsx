import PoetryLayout from "./pages/home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import BlogPage from "./pages/blogpage";
import { ScrollToTop } from "./useful_functions/scrolltotop";
import { Toaster } from "react-hot-toast";
export default function App() {
 return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/home" element={<PoetryLayout />} />
          <Route path="/blog_page" element={<BlogPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
