import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SideScroll() {
  const navigate = useNavigate();

  // slider drag state
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState("country");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // mobile open/collapse state
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // fetch/search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("jwt");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    let endpoint = "";
    switch (selectedField) {
      case "country":
        endpoint = `/location?country=${encodeURIComponent(searchQuery)}`;
        break;
      case "author":
        endpoint = `/author?name=${encodeURIComponent(searchQuery)}`;
        break;
      case "title":
        endpoint = `/title?title=${encodeURIComponent(searchQuery)}`;
        break;
    }
    try {
      const res = await fetch(
        `https://my-app.mrityunjay-jha2005.workers.dev/api/v1/blog/search${endpoint}`,
        { headers }
      );
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs || []);
      }
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  // drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    sliderRef.current.classList.add("cursor-grabbing");
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };
  const onMouseLeave = () => {
    setIsDragging(false);
    sliderRef.current?.classList.remove("cursor-grabbing");
  };
  const onMouseUp = () => {
    setIsDragging(false);
    sliderRef.current?.classList.remove("cursor-grabbing");
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    sliderRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };

  return (
    <aside
      className="
        bg-black text-white p-4
        w-full lg:w-80
        lg:sticky lg:top-0 lg:bottom-0 lg:h-screen
        overflow-hidden
      "
    >
      {/* only on mobile: toggle button */}
      <div className="lg:hidden flex justify-center mb-4">
        <button
          onClick={() => setIsOpenMobile((o) => !o)}
          className="p-2 w-10 bg-white bg-opacity-20 rounded-full transform transition-transform duration-300 focus:outline-none"
          aria-label={isOpenMobile ? "Close sidebar" : "Open sidebar"}
        ></button>
      </div>

      {/* on mobile: expand in-flow */}
      <div
        className={`
          transition-all duration-400
          ${isOpenMobile ? "max-h-screen" : "max-h-0"}
          lg:max-h-none lg:overflow-visible
          overflow-hidden
        `}
      >
        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search by ${selectedField}`}
            className="h-8 mx-1 sm:h-14 rounded-4xl sm:rounded-full text-center my-2 sm:mb-4 border-1 sm:border-4 border-white text-white text-xs sm:text-2xl"
          />
          <div className="flex justify-around gap-2">
            {["author", "title", "country"].map((field) => (
              <label
                key={field}
                className={`
                  cursor-pointer p-2 w-1/3 text-center
                  rounded-4xl sm:rounded-full border-1 text-xs sm:text-xl sm:border-4
                  ${
                    selectedField === field
                      ? "bg-red-400 border-red-400 text-white"
                      : "bg-transparent text-white"
                  }
                `}
              >
                <input
                  type="radio"
                  name="searchField"
                  value={field}
                  checked={selectedField === field}
                  onChange={(e) => setSelectedField(e.target.value)}
                  className="hidden"
                />
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            ))}
          </div>
          {/* <button
            type="submit"
            className="p-2 w-full h-8 sm:h-[60px] rounded-4xl sm:rounded-full mt-4 text-xs sm:text-2xl text-white tracking-widest bg-green-600 border-1 sm:border-6 border-green-600 relative overflow-hidden flex items-center justify-center group transition-all duration-500"
          >
            <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative group-hover:text-green-600 transition-colors duration-500">
              Search
            </span>
          </button> */}
          <button
  type="submit"
  disabled={loading}
  className="
    p-2 w-full h-8 sm:h-[60px] rounded-4xl sm:rounded-full mt-4
    text-xs sm:text-2xl text-white tracking-widest
    bg-green-600 border-1 sm:border-6 border-green-600
    relative overflow-hidden flex items-center justify-center group
    transition-all duration-500
  "
>
  {loading ? (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  ) : (
    <>
      {/* slide-in background only on lg+ */}
      <span
        className="
          absolute inset-0 bg-white transform -translate-x-full
          lg:group-hover:translate-x-0 transition-transform duration-500
        "
      />
      {/* color change only on lg+ */}
      <span className="relative lg:group-hover:text-green-600 lg:transition-colors duration-500">
        Search
      </span>
    </>
  )}
</button>

        </form>

        {/* Draggable Slider */}
        {loading && <div className="p-2 text-center">Loading...</div>}
        <div
          ref={sliderRef}
          className="
            flex flex-row lg:flex-col gap-2 sm:gap-6
            overflow-x-auto lg:overflow-y-auto
            scrollbar-hide cursor-grab p-2
            whitespace-nowrap lg:whitespace-normal
          "
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="flex-shrink-0 w-40 sm:w-full h-30 sm:h-80 relative bg-cover bg-center rounded-2xl sm:rounded-4xl shadow-xl transition-transform transform hover:scale-[1.02] cursor-pointer"
                style={{ backgroundImage: `url(${blog.blogHead})` }}
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent rounded-2xl" />
                <div className="absolute text-[10px] font-thin bottom-2 sm:bottom-4 left-4 text-white space-y-1 z-10 max-w-[70%] sm:max-w-full">
                  <h3 className=" sm:text-lg font-medium line-clamp-2 text-wrap">
                    {blog.title}
                  </h3>
                  <p className="hidden sm:block  sm:text-sm truncate">
                    {blog.author.name}
                  </p>
                  <p className="hidden sm:block  line-clamp-2">
                    {blog.description1}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-2 text-center w-full">
              {loading ? "" : "Oops nothing here!"}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
