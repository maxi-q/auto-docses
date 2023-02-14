
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});


async function sumbitFiles (files = []) {
  const base64text = await toBase64(files[0])

  // const formData = new FormData();

  // files.forEach((file) => {
  //     formData.append(`file`, file);
  // })
  // axios.post('http://192.168.0.107:5000/load_file', formData)
  // .then((json) => console.log(json))
  // .catch(error => console.log(error, "error"))
}

function sumbitСhanges(fills = {}) {
  // sumbit changes
}

function getAllfiles(files) {
  // axios.post('http://192.168.0.107:5000/load_file', formData)
  // .then((json) => console.log(json))
  // .catch(error => console.log(error, "error"))
}

function getfile(files) {
  // axios.post('http://192.168.0.107:5000/load_file', formData)
  // .then((json) => console.log(json))
  // .catch(error => console.log(error, "error"))
}
export {sumbitFiles, sumbitСhanges, getAllfiles, getfile}
