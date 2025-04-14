import { useContext, useState } from "react";
import { ExpressionContext } from "../context/expressionContext";
import { getMood } from "../services/image-upload.service";

const FormComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [getPhotoFile, setPhotoFile] = useState({});
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

  const requestPredict = async () => {
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
    <div className="relative flex-1 flex justify-center content-center flex-col max-w-md" id="container-form">
      <div className="flex flex-col text-left text-white font-bold gap-6">
        <p className="text-4xl lg:text-6xl" id="title">
          Upload a photo you want to be predicted
        </p>
        <p className="text-base" id="description">
          Click on the image to upload a photo
        </p>
      </div>

      <section className="w-full mx-auto items-center" id="section-form">
        <div className="mx-auto bg-gray-800 rounded-lg overflow-hidden items-center">
          <div className="py-6">
            <div
              id="image-preview"
              className="p-6 mb-4 bg-gray-800 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer"
            >
              <input
                id="upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => selectPhoto(e)}
              />
              <label htmlFor="upload" className="cursor-pointer">

                {getPhotoFile.src ? (
                  <img
                    className="max-h-48 rounded-lg mx-auto"
                    src={getPhotoFile.src}
                    alt="Image preview"
                  />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-8 h-8 text-gray-400 mx-auto mb-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-400">
                      Upload picture
                    </h5>
                  </>

                )}
              </label>
            </div>
            <div className="w-full flex items-center justify-center">
              <button
                className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center cursor-pointer ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-600"}`}
                onClick={() => requestPredict()}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white mr-3"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  <span className="text-center ml-2">Upload</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="text-justify text-red-500 font-bold h-16 flex items-center justify-center" aria-live="polite">
        {showTimeoutMessage ? (
          <p className="text-xl" id="timeout_message">
            Note: The first upload request may experience a delay due to
            server initialization. If this occurs, please try again after a
            minute.
          </p>
        ) : (
          <span className="invisible"></span>
        )}
      </div>
    </div>
  );
};

export default FormComponent;
