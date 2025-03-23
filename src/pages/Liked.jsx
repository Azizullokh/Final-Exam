import { useDispatch, useSelector } from "react-redux";
import { removeLike } from "../reduxStore/LikedSlice";
import { addImage } from "../reduxStore/downloadSlice";
import { FiDownload } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import { motion } from "framer-motion";

const Liked = () => {
  const likedImages = useSelector((state) => state.likes.likedImages);
  const dispatch = useDispatch();
   const [hoveredImage, setHoveredImage] = useState(null)
  const downloadedImages = useSelector((state) => state.download.images);

  return (
    <div className="pt-20 pb-10 px-4 max-w-6xl mx-auto md:px-4 px-0 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-black dark:text-white text-2xl font-bold my-6">
      Liked Images ({likedImages.length})
      </h2>

      {likedImages.length === 0 ? (
        <p className="text-center text-gray-500">No liked images yet.</p>
      ) : (
        <div className="columns-2 sm:columns-3 md:columns-3 lg:columns-3 md:gap-4 gap-2 md:space-y-4 space-y-2">
          {likedImages.map((image) => {
            const isDownloaded = downloadedImages.some(
              (img) => img.id === image.id
            );
            return (
              <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
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
                <div className={`absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300 bg-black/60 ${
                  hoveredImage === image.id ? "opacity-100" : "opacity-0"
                }`}>
                  <div className="absolute bottom-2 left-2 flex items-center gap-2">
                    <img
                      src={image.user.profile_image.small}
                      alt={image.user.name}
                      className="w-8 h-8 rounded-full border border-white"
                    />
                    <span className="text-white font-bold">
                      {image.user.name}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2 items-center">
                    <button
                      className={`text-white text-2xl p-1 rounded border-2 border-transparent hover:border-white transition duration-300 ${
                        isDownloaded ? "text-blue-500" : ""
                      }`}
                      onClick={() => dispatch(addImage(image))}
                    >
                      <FiDownload />
                    </button>
                    <button
                      className="text-white text-2xl p-1 rounded border-2 border-transparent hover:border-white transition duration-300"
                      onClick={() => dispatch(removeLike(image.id))}
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Liked;
