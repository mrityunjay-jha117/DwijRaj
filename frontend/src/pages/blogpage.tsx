import React, { useEffect, useState } from "react";
import Header from "./thussaheader";
import PoemCard from "../components/primary_components/primary_components/cards/poemcard";
import { DwijPoem } from "../components/primary_components/primary_components/cards/poemcard";
import PoetryDisplay from "./display_cards/poetry_display_card";
import Footer from "../components/primary_components/dashboard/footer";

function useResponsivePaginationWindow() {
  const [windowSize, setWindowSize] = useState(
    typeof window !== "undefined" && window.innerWidth > 768 ? 4 : 3
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleResize = () => {
      setWindowSize(mediaQuery.matches ? 4 : 3);
    };

    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return windowSize;
}

const BlogPage: React.FC = () => {
  const [dwijs, setDwij] = useState<DwijPoem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const paginationWindow = useResponsivePaginationWindow();
  const [id, setid] = useState(10);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `http://127.0.0.1:8787/api/v1/dwij/bulk?page=${page}&perPage=7`
      );
      const json = await res.json();
      setDwij(json.data);
      setTotalPages(json.meta.totalPages);
      if (json.data.length > 0) {
        setid(json.data[0].id);
      }
    }
    fetchData();
  }, [page]);

  const generatePageNumbers = () => {
    const pages = [];
    const half = Math.floor(paginationWindow / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + paginationWindow - 1);

    if (end - start < paginationWindow - 1) {
      start = Math.max(1, end - paginationWindow + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <>
      <Header />
      <main className="bg-[#0e0e10] text-white min-h-screen overflow-hidden">
        <div className="flex mt-10 flex-row gap-4 px-10">
          {/* Left Column */}
          <div className="w-7/10 flex flex-col  pr-2 h-full">
            <div className="flex flex-wrap justify-between gap-3">
              <div className="w-full my-auto sm:w-[96%] lg:w-[64%] h-40 bg-white rounded-2xl">
                <h1 className="text-8xl font-extrabold my-8 text-center text-black tracking-loose">
                  Explore
                </h1>
              </div>
              {dwijs.map((poem) => (
                <PoemCard
                  key={poem.id}
                  poem={poem}
                  onClick={() => {
                    if (poem.id !== id) setid(poem.id);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-3/10 sticky top-0 h-[90vh] overflow-y-auto rounded-3xl">
            <PoetryDisplay id={id} />
          </div>
          
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6 mb-20 flex-wrap">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                page === 1
                  ? "text-gray-500 border-gray-700 cursor-not-allowed"
                  : "border-white text-white hover:bg-white hover:text-black"
              }`}
            >
              Prev
            </button>

            {generatePageNumbers().map((pageNum) => (
              <button
                key={`page-${pageNum}`}
                onClick={() => setPage(pageNum)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  page === pageNum
                    ? "bg-white text-black"
                    : "bg-transparent text-white border-white hover:bg-white hover:text-black"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                page === totalPages
                  ? "text-gray-500 border-gray-700 cursor-not-allowed"
                  : "border-white text-white hover:bg-white hover:text-black"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;
