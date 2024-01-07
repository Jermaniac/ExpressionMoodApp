import { useContext, useState } from 'react';
import { ExpressionContext } from '../context/expressionContext';
import { getMood } from '../services/image-upload.service';
import '../styles/FormComponent.css'

const FormComponent = () => {
  const [getPhotoFile, setPhotoFile] = useState({
    src: './assets/images/blankPhoto.png' 
  })
  const expContext = useContext(ExpressionContext)

  const selectPhoto = (event) => {
    const photoSelect = event.target.files[0];
    setPhotoFile(prev => ({ ...prev, file: photoSelect }));
    if (photoSelect) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoFile(prev => ({ ...prev, src: e.target.result }));
      };
      reader.readAsDataURL(photoSelect)
    }
  };

  const requestPredict = async () => {
    const response = (await getMood(getPhotoFile.file));
    if (!response && !response.expressions){
      console.log("Call API FAILED.")
    }
    console.log("Call API SUCCESS!");
    expContext.setExpressions(response.expressions)
  };

  return (
    <form className="col-12 col-md-4 col-lg-3" id="form">
      <div className="row">
        <h1 className="text-white" id="title">Upload the photo you want to be predicted</h1>
      </div>
      <div className="row">
        <div id="instruction">Click on the image</div>
      </div>
      <div className="row">
        <label htmlFor="photo">
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            style={{ display: "none" }}
            onChange={selectPhoto}
          ></input>
          <img src={getPhotoFile.src} alt="selectedImage" style={{ maxWidth: '300px', maxHeight: '300px' }}/>
        </label>
      </div>
      <div className="row">
        <button id="buttonSubmit" onClick={requestPredict}>
          PREDICT THIS PHOTO
        </button>
      </div>
    </form>
  );
}

export default FormComponent;