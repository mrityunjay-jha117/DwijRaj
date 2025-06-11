import PoetryLayout from "./pages/home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import BlogPage from "./pages/blogpage";
import { ScrollToTop } from "./useful_functions/scrolltotop";
import { Toaster } from "react-hot-toast";
import PoetryDisplay from "./pages/display_cards/poetry_display_card";

export default function App() {
  // const images = [
  //   "/images/carousel_images/1.jpg",
  //   "/images/carousel_images/2.jpg",
  //   "/images/carousel_images/3.jpg",
  //   "/images/carousel_images/4.jpg",
  //   "/images/carousel_images/5.jpg",
  //   "/images/carousel_images/6.jpg",
  //   "/images/carousel_images/7.jpg",
  //   "/images/carousel_images/8.jpg",
  //   "/images/carousel_images/9.jpg",
  //   "/images/carousel_images/11.jpg",
  //   "/images/carousel_images/12.jpg",
  //   "/images/carousel_images/13.jpg",
  //   "/images/carousel_images/14.jpg",
  //   "/images/carousel_images/15.jpg",
  //   "/images/carousel_images/16.jpg",
  //   "/images/carousel_images/17.jpg",
  //   "/images/carousel_images/18.jpg",
  //   "/images/carousel_images/19.jpg",
  //   "/images/carousel_images/20.jpg",
  //   "/images/carousel_images/1.jpg",
  //   "/images/carousel_images/2.jpg",
  //   "/images/carousel_images/3.jpg",
  //   "/images/carousel_images/4.jpg",
  //   "/images/carousel_images/5.jpg",
  //   "/images/carousel_images/6.jpg",
  //   "/images/carousel_images/7.jpg",
  //   "/images/carousel_images/8.jpg",
  //   "/images/carousel_images/9.jpg",
  //   "/images/carousel_images/11.jpg",
  //   "/images/carousel_images/12.jpg",
  //   "/images/carousel_images/13.jpg",
  //   "/images/carousel_images/14.jpg",
  //   "/images/carousel_images/15.jpg",
  //   "/images/carousel_images/16.jpg",
  //   "/images/carousel_images/17.jpg",
  //   "/images/carousel_images/18.jpg",
  //   "/images/carousel_images/19.jpg",
  //   "/images/carousel_images/20.jpg",
  // ];
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
