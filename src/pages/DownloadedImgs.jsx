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
    <div>
      <h1 className="text-xl font-bold mb-4">Downloads ({downloadedImages.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {downloadedImages.map((image) => (
          <div key={image.id} className="relative">
            <img src={image.urls.small} alt={image.alt_description} className="w-full rounded-lg" />
            <div className="absolute top-3 right-3 flex gap-2">
              <button onClick={() => saveToGallery(image.urls.full)} className="text-white bg-green-500 p-2 rounded">
                <FaSave />
              </button>
              <button onClick={() => dispatch(removeImage(image.id))} className="text-white bg-red-500 p-2 rounded">
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