import { useContext, useState } from "react";
import { ExpressionContext } from "../context/expressionContext";
import { getMood } from "../services/image-upload.service";

const FormComponent = () => {
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
    const response = await getMood(getPhotoFile.file);
    if (response && response.expressions) {
      expContext.setExpressions(response.expressions);
    }
  };

  return (
    <div className="flex justify-center bg-black p-5" id="form">
      <form
        className="max-w-3xl bg-gradient-to-br from-purple-800 to-indigo-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 text-center"
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
        <label className="flex justify-center" htmlFor="photo">
          <input
            className="hidden"
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            onChange={selectPhoto}
          ></input>
          <img
            className="p-6 w-80 h-96"
            src={getPhotoFile.src}
            alt="selectedImage"
          />
        </label>
        {getPhotoFile.file && (
          <button
            className="bg-white text-gray-800 font-bold py-2 px-4 rounded-full hover:bg-gray-200 transition duration-300"
            id="buttonSubmit"
            onClick={requestPredict}
            disabled={!getPhotoFile.file}
          >
            PREDICT THIS PHOTO
          </button>
        )}
      </form>
    </div>
  );
};

export default FormComponent;
