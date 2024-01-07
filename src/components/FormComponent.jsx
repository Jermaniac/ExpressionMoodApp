import { useContext, useState } from "react";
import { ExpressionContext } from "../context/expressionContext";
import { getMood } from "../services/image-upload.service";
// import '../styles/FormComponent.css'

const FormComponent = () => {
  const [getPhotoFile, setPhotoFile] = useState({
    src: "./assets/images/blankPhoto.png",
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
    if (!response && !response.expressions) {
      console.log("Call API FAILED.");
    }
    console.log("Call API SUCCESS!");
    expContext.setExpressions(response.expressions);
  };

  return (
    <form
      className="flex items-center justify-center px-20 border border-sky-500 rounded mx-auto"
      id="form"
    >
      <div className="text-white">
        <h1 className="" id="title">
          Upload the photo you want to be predicted. Click on the image to
          upload a photo.
        </h1>
        <label htmlFor="photo">
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            style={{ display: "none" }}
            onChange={selectPhoto}
          ></input>
          <img
            src={getPhotoFile.src}
            alt="selectedImage"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />
        </label>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          id="buttonSubmit"
          onClick={requestPredict}
        >
          PREDICT THIS PHOTO
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
