import { useDispatch, useSelector } from "react-redux";
import { removeImage } from "../reduxStore/downloadSlice";
import { FaTrash, FaSave } from "react-icons/fa";

const saveToGallery = (imageUrl) => {
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "downloaded-image.jpg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function DownloadedImgs() {
  const dispatch = useDispatch();
  const downloadedImages = useSelector((state) => state.download.images);


  return (
    <div className="px-4 max-w-6xl pt-25 flex mx-auto flex-col pb-10">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Downloads ({downloadedImages.length})</h1>
      <div className="columns-2 sm:columns-3 md:columns-3 lg:columns-3 md:gap-4 gap-2 md:space-y-4 space-y-2">
        {downloadedImages.map((image) => (
          <div key={image.id} className="relative break-inside-avoid overflow-hidden rounded-lg group">
            <img src={image.urls.small} alt={image.alt_description} className="w-full rounded-lg" />
            <div className="absolute top-3 right-3 flex gap-2">
              <button onClick={() => saveToGallery(image.urls.full)} className="text-white border-2 border-transparent hover:border-white p-2 rounded transinion duration-300 cursor-pointer">
                <FaSave />
              </button>
              <button onClick={() => dispatch(removeImage(image.id))} className="text-white border-2 border-transparent hover:border-white p-2 rounded transinion duration-300 cursor-pointer">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DownloadedImgs