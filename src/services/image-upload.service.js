import axios from 'axios'

const keyFile = "photo";
const urlApi =  "https://expression-test-2.herokuapp.com/getMood";

class ImageUploadService {

  getMood(file) {

    const formData = new FormData();
    formData.append(keyFile, file);

    return axios.post( urlApi , formData , { timeout : 5000 })
    .then (data => {
      return data;
    })
    .catch( error => {
      alert(`Error calling API. \n${error}`);
    })

    // return fetch(urlApi, {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     return data;
    //   })
    //   .catch((error) => console.error(error));
  }

}

export default new ImageUploadService();
