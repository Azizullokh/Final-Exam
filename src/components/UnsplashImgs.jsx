import { useEffect, useState } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { FiDownload } from "react-icons/fi";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { GoDownload } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { addImage } from "../reduxStore/downloadSlice";
import { addLike } from "../reduxStore/LikedSlice";

const UnsplashImgs = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const dispatch = useDispatch();
  const likedImages = useSelector((state) => state.likes.likedImages);
  const downloadedImages = useSelector((state) => state.download.images);

  const fetchImages = async (searchQuery, pageNum) => {
    const accessKey = "BdNtKrF0I9Pg2gbNGzUBKQPnuT5r2Rr4F_2u8EbtI-0";
    const finalQuery = searchQuery.trim() === "" ? "random" : searchQuery;

    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      finalQuery
    )}&client_id=${accessKey}&per_page=15&page=${pageNum}&orientation=landscape`;

    try {
      setLoading(true);
      const response = await axios.get(url);
      setImages((prev) =>
        pageNum === 1
          ? response.data.results
          : [...prev, ...response.data.results]
      );
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(query, page);
  }, [query, page]);

  const handleSearch = debounce((value) => {
    setQuery(value);
    setPage(1);
  }, 500);

  return (
    <div className="max-w-6xl mx-auto pb-10 px-4 bg-gray-100 dark:bg-gray-900">
      <div className="mb-6 flex justify-end items-end">
        <div className="relative md:w-[45%] w-[100%]">
          <input
            type="text"
            placeholder="Search images..."
            className="p-3 border-2 dark:border-white border-black rounded-md w-full max-w-lg"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <FaSearch className="absolute right-4 top-4" />
        </div>
      </div>
      <div className="flex mx-auto items-center justify-center">
        {loading && <span className="loading loading-ring loading-xl"></span>}
      </div>
      <div className="columns-2 sm:columns-3 md:columns-3 lg:columns-3 md:gap-4 gap-2 md:space-y-4 space-y-2">
        {images.map((image) => {
          const isLiked = likedImages.some((img) => img.id === image.id);
          const isDownloaded = downloadedImages.some(
            (img) => img.id === image.id
          );
          return (
            <div
              key={image.id}
              className="relative break-inside-avoid overflow-hidden rounded-lg group"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
              onTouchStart={() => setHoveredImage(hoveredImage === image.id ? null : image.id)}
            >
              <img
                src={image.urls.small}
                alt={image.alt_description}
                className="w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className={`absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300 bg-black/60 ${
                  hoveredImage === image.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute bottom-1 left-2 md:bottom-2 md:left-4 flex items-center gap-2 mb-2">
                  <img
                    src={image.user.profile_image.small}
                    alt={image.user.name}
                    className="md:w-8 md:h-8 w-5 h-5 rounded-full"
                  />
                  <span className="text-white md:text-2xl text-[10px]">
                    {image.user.name}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex gap-2 justify-between">
                  <button
                    className={`text-white md:text-2xl text-xl border-2 border-transparent hover:border-white p-1 rounded transition duration-300 ${
                      isLiked ? "text-red-500" : "text-white"
                    }`}
                    onClick={() => dispatch(addLike(image))}
                  >
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <button
                    className={`text-white md:text-2xl text-xl border-2 border-transparent hover:border-white p-1 rounded transition duration-300 ${
                      isDownloaded ? "text-blue-500" : ""
                    }`}
                    onClick={() => dispatch(addImage(image))}
                  >
                    <FiDownload />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          className="px-6 py-2 bg-black text-white rounded-md flex items-center gap-2"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading}
        >
          <GoDownload />
          Load More
        </button>
      </div>
    </div>
  );
};

export default UnsplashImgs;
