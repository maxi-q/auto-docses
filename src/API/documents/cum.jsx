import { Buffer } from 'buffer';
import { encode, decode } from 'js-base64';
import { Base64 } from 'js-base64';

const URL = 'http://192.168.0.107:5000/api/v1/'

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

async function sumbitFiles (files) {
  const base64text = await toBase64(files[0])

  console.log(base64text)
  
  
  files.forEach((file) => {
      formData.append(`file`, file);
  })

  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: {
      name: 'fileName',
      file: base64text
    }
  }

  fetch(URL + `documents/`, options)
    .then(response => response.json())
    .then(cons => console.log(cons));
    // setFile(reponse.file)

  
}

function sumbitСhanges(document_id, fills = {}, setFile) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: fills
  }

  fetch(URL + `documents/${document_id}`)
    .then(response => response.json())
    .then(cons => console.log(cons));
    // setFile(reponse.file)
}

function getAllfiles(document_id) {

  fetch(URL + `documents/${document_id}/download`)
    .then(response => response.json())
    .then(cons => console.log(cons));
  // setFiles(reponse.file)

  const date = new Date()
  const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'авгуса', 'сентября', 'октября', 'ноября', 'декабря']
  const dataa = [date.getDate(), month[date.getMonth()], date.getFullYear() + 'г.'].join(' ')
  return [
    {
      id:1,
      name:'text1.docx',
      dateOfChange: dataa
    },
    {
      id:2,
      name:'text2.docx',
      dateOfChange: dataa
    }
  ]
}

function getfile(document_id, setFile) {
  
  fetch(URL + `documents/${document_id}/download`)
    .then(response => response.json())
    .then(cons => console.log(cons));
    // setFile(reponse.file)
}


export {sumbitFiles, sumbitСhanges, getAllfiles, getfile}
