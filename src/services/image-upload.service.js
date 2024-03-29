const keyFile = "photo";
const urlApi =  "https://expression-mood-api.herokuapp.com/getMood";

export const getMood = async (file) => {
  const formData = new FormData();
  formData.append(keyFile, file);
  const response = await fetch(urlApi, {
  method: 'POST',
  body: formData
})
  .then(res => {
    return res.json()
  })
  .catch(error => {
   console.log(error)
  }) 
  return response 
}
