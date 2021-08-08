import axios from 'axios'

const keyFile = "photo";
const urlApi =  "http://ec2-3-236-13-113.compute-1.amazonaws.com:9004/getMood";

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
