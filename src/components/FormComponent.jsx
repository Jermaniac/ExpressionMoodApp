import { useContext, useState } from "react";
import { ExpressionContext } from "../context/expressionContext";
import { getMood } from "../services/image-upload.service";

const Spinner = () => {
  return (
    <div className="w-6 h-6 border-t-2 border-blue-500 border-solid rounded-full animate-spin relative inset-0 m-auto"></div>
  );
};

const FormComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [getPhotoFile, setPhotoFile] = useState({
    src: "./assets/images/blankPhoto.webp",
  });
  const expContext = useContext(ExpressionContext);

  const selectPhoto = (event) => {
    const photoSelect = event.target.files[0];
    setPhotoFile((prev) => ({ ...prev, file: photoSelect }));
    if (photoSelect) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoFile((prev) => ({ ...prev, src: e.target.result }));
      };
      reader.readAsDataURL(photoSelect);
    }
  };

  const requestPredict = async (event) => {
    event.preventDefault();
    let timeoutId;
    setIsLoading(true);
    timeoutId = setTimeout(() => {
      setShowTimeoutMessage(true);
    }, 4000);
    await getMood(getPhotoFile.file)
      .then((response) => {
        expContext.setExpressions(response.expressions);
      })
      .catch((error) => console.log("Error calling API: ", error))
      .finally(() => {
        clearTimeout(timeoutId);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex justify-center bg-black p-5" id="form">
      <form
        className="max-w-xl bg-gradient-to-br from-purple-800 to-indigo-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 text-center"
        id="form"
      >
        <div className="p-4 text-center text-white font-bold">
          <p className="text-2xl" id="title">
            Upload a photo you want to be predicted.
          </p>
          <p className="text-base" id="instructions">
            Click on the image to upload a photo.
          </p>
        </div>
        <div className="flex justify-center">
          <label className="w-fit cursor-pointer" htmlFor="photo">
            <input
              className="hidden"
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              onChange={selectPhoto}
            ></input>
            <img
              className="p-6 w-72 h-46 sm:w-96 sm:h-96"
              src={getPhotoFile.src}
              alt="selectedImage"
            />
          </label>
        </div>
        {getPhotoFile.file && (
          <button
            className="bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-xl hover:bg-gray-300 text-xs whitespace-nowrap sm:text-base"
            id="buttonSubmit"
            onClick={requestPredict}
            disabled={isLoading || !getPhotoFile.file}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <span className="text-black">PREDICT THIS PHOTO</span>
            )}
          </button>
        )}
        <div className="p-4 text-center text-red-500 font-bold">
          {showTimeoutMessage && (
            <p className="text-xl" id="timeout_message">
              Note: The first upload request may experience a delay due to
              server initialization. If this occurs, please try again after a
              minute.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
