import { useContext, useState } from "react";
import { ExpressionContext } from "../context/expressionContext";
import { getMood } from "../services/image-upload.service";

const ENDPOINT_CALL_TIMEOUT = 5000;

const FormComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [photoFile, setPhotoFile] = useState({ file: null, src: "" });
  const expContext = useContext(ExpressionContext);

  const selectPhoto = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoFile({ file, src: e.target.result });
    };
    reader.onerror = () => {
      setPhotoFile({ file: null, src: "" });
      alert("Failed to read file.");
    };
    reader.readAsDataURL(file);
  };

  const requestPredict = async () => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => setShowTimeoutMessage(true), ENDPOINT_CALL_TIMEOUT);

    try {
      const response = await getMood(photoFile.file);
      const sortedExpressions = [...response.expressions].sort(
        (a, b) => b.probability - a.probability
      );
      expContext.setExpressions(sortedExpressions);
      expContext.setWinnerMood(sortedExpressions[0].mood);
    } catch (error) {
      console.error("Error calling API: ", error);
      alert("Failed to predict mood. Please try again.");
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
      setShowTimeoutMessage(false);
    }
  };

  return (
    <div
      className="relative flex-1 flex justify-center content-center flex-col"
      id="container-form"
      aria-busy={isLoading}
    >
      <div className="flex flex-col text-left text-white font-bold gap-6">
        <p className="text-4xl lg:text-6xl" id="title">
          Upload a photo you want to be predicted
        </p>
        <p className="text-base" id="description">
          Click below to upload a photo
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
                onChange={selectPhoto}
                disabled={isLoading}
              />
              <label htmlFor="upload" className="cursor-pointer">
                {photoFile.src ? (
                  <img
                    className="max-h-48 rounded-lg mx-auto"
                    src={photoFile.src}
                    alt="Image preview"
                    loading="lazy"
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
                className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center cursor-pointer transition
      ${isLoading || photoFile.file === null
                    ? "bg-gray-400 cursor-not-allowed opacity-60"
                    : "bg-black hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-600"
                  }`}
                onClick={requestPredict}
                disabled={isLoading || photoFile.file === null}
                aria-busy={isLoading}
                aria-disabled={isLoading || photoFile.file === null}
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
                  <span className="text-center ml-2">
                    Predict this photo
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {showTimeoutMessage && (
        <div className="text-justify text-red-500 font-bold h-16 flex items-center justify-center" aria-live="polite">
          <p className="text-xl" id="timeout_message">
            Note: The first upload request may experience a delay due to
            server initialization. If this occurs, please try again after a
            minute.
          </p>
        </div>
      )}
    </div>
  );
};

export default FormComponent;