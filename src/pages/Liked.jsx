import { useSelector } from "react-redux";

const Liked = () => {
  const likedImages = useSelector((state) => state.likes.likedImages);

  return (
    <div className="max-w-6xl mx-auto md:px-4 px-0 bg-gray-200 dark:bg-gray-900">
      <h2 className="text-center text-2xl font-bold my-6">Liked Images</h2>
      
      {likedImages.length === 0 ? (
        <p className="text-center text-gray-500">No liked images yet.</p>
      ) : (
        <div className="columns-2 sm:columns-3 md:columns-3 lg:columns-3 md:gap-4 gap-2 md:space-y-4 space-y-2">
          {likedImages.map((image) => (
            <div key={image.id} className="relative break-inside-avoid overflow-hidden rounded-lg group">
              <img
                src={image.urls.small}
                alt={image.alt_description}
                className="w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Liked;