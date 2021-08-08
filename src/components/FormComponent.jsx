import { useState } from 'react';
import ImageUploadService from '../services/image-upload.service';
import '../styles/FormComponent.css'

function FormComponent({ changeExpressions, changePhoto, photo }) {

  const [getPhotoFile, setPhotoFile] = useState();

  const selectPhoto = (event) => {
    const photoSelect = event.target.files[0];
    setPhotoFile(photoSelect);
    changePhoto(photoSelect);
  };

  const requestPredict = async () => {
    const response = (await ImageUploadService.getMood(getPhotoFile));
    if (response && response.data){
      console.log("Call API SUCCESS!");
      changeExpressions(response.data.expressions)
    }
    else {
      console.log("Call API FAILED.")
    }
    // ImageUploadService.getMood(getPhotoFile).then((response) => {
    //   if (response) {
    //     console.log("Call API success!");
    //     changeExpressions(response.expressions);
    //   } else {
    //     console.log("Call API failed.");
    //   }
    // });
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
          <img src={photo.photoUrl} alt="blankPic"></img>
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