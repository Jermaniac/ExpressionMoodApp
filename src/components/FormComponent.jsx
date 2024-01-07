import { useContext, useState } from 'react';
import { ExpressionContext } from '../context/expressionContext';
import { getMood } from '../services/image-upload.service';
import '../styles/FormComponent.css'

const FormComponent = () => {
  const expContext = useContext(ExpressionContext)

  const [getPhotoFile, setPhotoFile] = useState()

  const selectPhoto = (event) => {
    const photoSelect = event.target.files[0];
    setPhotoFile(photoSelect);
  };

  const requestPredict = async () => {
    const response = (await getMood(getPhotoFile));
    if (!response && !response.expressions){
      console.log("Call API FAILED.")
    }
    console.log("Call API SUCCESS!");
    expContext.setExpressions(response.expressions)
  };

  return (
    <div className="col-12 col-md-4 col-lg-3" id="form">
      <div className="row">
        <div id="title">Upload the photo you want to be predicted</div>
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
          <img src={getPhotoFile?.photoUrl} alt="blankPic"></img>
        </label>
      </div>
      <div className="row">
        <button id="buttonSubmit" onClick={requestPredict}>
          PREDICT THIS PHOTO
        </button>
      </div>
    </div>
  );
}

export default FormComponent;