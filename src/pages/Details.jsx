import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiLike } from "react-icons/bi";
import { RxDimensions } from "react-icons/rx";
import { TbFileDescription } from "react-icons/tb";
import { TiDownload } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";

const Details = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const accessKey = "BdNtKrF0I9Pg2gbNGzUBKQPnuT5r2Rr4F_2u8EbtI-0";
        const response = await axios.get(
          `https://api.unsplash.com/photos/${id}?client_id=${accessKey}`
        );
        setImage(response.data);
      } catch (error) {
        console.error("Error fetching image details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImageDetails();
  }, [id]);

  if (!image) {
    return <h2 className="text-center text-2xl mt-10">Image not found</h2>;
  }

  return (
    <div className="max-w-6xl pt-15 mx-auto p-4 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl my-10 text-black dark:text-white font-bold">Image Details</h2>
      <div className="flex justify-between flex-col md:flex-row mx-auto">
        <div className="text-black dark:text-white md:w-[45%] w-full">
          {loading && (
            <span className="loading loading-ring loading-2xl text-4xl"></span>
          )}
          <motion.div 
           initial={{ y: "-50%", opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-5">
            <img
              src={image.user.profile_image.medium}
              alt={image.user.name}
              className="w-40 h-40 rounded-full border-2 border-gray-500"
            />

            <p className="absolute left-50 top-2 md:top-10 text-[10px] md:text-sm text-gray-500 flex items-center gap-2">
              <FaLocationDot /> {image.user.location || "Unknown location"}
            </p>

            <p className="absolute left-50 top-8 md:top-17 text-[10px] md:text-sm italic">
              {image.user.bio || "No bio"}
            </p>
          </motion.div>

          <motion.div
           initial={{ x: "-50%", opacity: 0 }} 
           animate={{ x: 0, opacity: 1 }}
           transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-start gap-2">
            <p className="text-lg font-bold">{image.user.name}</p>

            <p className="flex gap-2 items-center text-2xl w-[90%] truncate">
              <strong className="flex items-center">
                <TbFileDescription className="text-3xl" />
              </strong>
              {image.alt_description || "No description"}
            </p>

            <p className="text-2xl mt-2 text-red-500 flex gap-3">
              <strong className="flex items-center">
                <BiLike />
              </strong>
              {image.likes}
            </p>

            <p className="text-2xl mt-2 text-blue-500 flex gap-3">
              <strong className="flex items-center">
                <RxDimensions />
              </strong>
              {image.width} x {image.height} px
            </p>

            <p className="text-lg mt-2">
              <strong>Published: </strong>
              {new Date(image.created_at).toLocaleDateString()}
            </p>

            <a
              href={`https://unsplash.com/@${image.user.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-black p-1 rounded border-2 border-black hover:bg-white hover:text-black transition duration-300"
            >
              View Profile
            </a>
          </motion.div>
        </div>
        <motion.div 
        initial={{ x: "50%", opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 1, ease: "easeOut" }} 
        className="md:w-[50%] w-full mt-5 md:mt-0 flex flex-col items-end">
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className="w-[100%] rounded-lg mb-6"
          />
          <div className="">
            <a
              href={image.links.download}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white dark:hover:border-white border-2 border-transparent hover:border-black flex p-1 rounded items-center gap-2 transition duration-300"
            >
              Click to <TiDownload />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Details;
