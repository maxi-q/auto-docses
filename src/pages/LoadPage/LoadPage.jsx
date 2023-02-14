import React, {useState, useEffect, useRef, createRef} from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import styled from 'styled-components'

import { Aside, LoadBox } from './components'
import { sumbitFiles, sumbitСhanges } from './api/cum'

export const LoadPage = () => {

  const autoFillForm = createRef()

  const [documentName, setDocumentName] = useState('Имя документа')
  const [keyValues, setKeyValues] = useState('Ждет файл...')
  const [inputElement, setInputElement] = useState('')
  const [upload, setUpload] = useState(() => false)
  const [autoFills, setAutoFills] = useState(null)
  const [files, setFiles] = useState(() => [])
  const [url, setUrl] = useState(() => '')
  const [keys, setKeys] = useState([])

  useEffect(() => {
    if (!files.length) return
  
    const fileArray = files.map(file => URL.createObjectURL(file))
    setUrl( fileArray )
    setUpload(Boolean(fileArray.length))

    const file = files[0]
    setDocumentName(file.name)

    // Отправить док-мент

    // Получить ключи
    setKeys(['NAME','STREET','SOMEKEYS'])
  }, [files])

  const firstUpdate = useRef(true);
  useEffect(()=>{
    if (firstUpdate.current) { 
      firstUpdate.current = false
      return
    }

    setAutoFills(
      <>
        {keys.map((key, i) => (
        <>
          <FeatureInput id={i}>
            <KeyLable>{key}:</KeyLable>
            <TextareaLable rows={1.4} type='text' name={key}></TextareaLable>
          </FeatureInput>
        </>
      ))}
      {keys.length ? (<><InputForm type='submit' value="Заполнить" name='Autofill'></InputForm> <br/></>) : nope}
      </>
    )
    setKeyValues('Заполните поля')
  },[keys])

  const fillFile = (e) => {
    e.preventDefault();
    fillDocument();
  }
  const fillDocument = () => {
    // Отправить на сервер, получить норм документ, SetFiles
    console.log(keyValues)
    return
  }
  const openClick = e => {
    e.preventDefault()
    inputElement.click()
    // Запускает changeHundler
  }
  const changeHundler = (e) => {
    if(Boolean(e.target.files.length)){
      setFiles(Array.from(e.target.files))
    }
  }
  function nope () { return <></> }

  return (
    <>
      <LoadPageStyled>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
          <Aside  
            documentName={documentName}
            keyValues={keyValues}
            autoFills={autoFills}
            fillFile={fillFile}
            autoFillForm={autoFillForm}
          />

          <LoadBox
            setInputElement={setInputElement}
            changeHundler={changeHundler}
            openClick={openClick}
            upload={upload}
            sumbitFiles={sumbitFiles}
            files={files}
            url={url}
          />
        </Worker>
      </LoadPageStyled>
    </>
  )
}

const LoadPageStyled = styled.div`
  padding-top: 3em;
  display: flex;
`
const TextareaLable = styled.textarea`
  margin-left:0px;
  margin-bottom:20px;
  min-height: 31px;
  font-style: italic;
  word-break: break-word;

`
const KeyLable = styled("span")`
  font-size: 1.0em;
  color:#767676;
`
const FeatureInput = styled.div`
display:flex;
  justify-content: space-between;
  align-items: start;
`
const InputForm = styled.input`
  background-color: #4990CD;
  cursor: pointer;
  display: block;
  padding: 20px;
  padding-bottom: 3px;
  padding-top: 3px;
  border-radius: 5px;
  border-width: 0px;
  color: white;
  font-size: 1.08em;
  margin-top: 0px;
  margin-left: auto;
  border: 2px solid #4990CD;
`

export default LoadPage




// useEffect(() => {
//     WebViewer(
//       {
//         path: '/lib',
//         preloadWorker: 'office',
//         fullAPI: false,
//         charset: 'UTF-8'
//       },
//       viewer.current
//     ).then((instance) => {
//         const { documentViewer } = instance.Core
//         setInstance(instance)
//         setParentUrl(window.location.href)
//         setDocumentViewer(documentViewer)
//         instance.UI.setLanguage('ru');
//         instance.UI.disableElements([ 'leftPanel', 'leftPanelButton', 'header' ]);
//         instance.UI.loadDocument(url[0], { filename: files[0].name });


//         documentViewer.addEventListener('documentLoaded', async () => {
//             await documentViewer.getDocument().documentCompletePromise();
//             documentViewer.updateView();
//             const doc = documentViewer.getDocument();

//             console.log(doc.filename, url[0])

//             setActionLabel('Отправить для заполнения документа')
//             setAutofillHidden(false)
//             setDocumentName(doc.filename)
//             setKeyValues('Ключи документа:')

//             console.log(doc)
//             doc.getTemplateKeys().then(keys => {
//                 setAutoFills(
//                     <>
//                     {keys.map((key, i) => {
//                         return(
//                             <FeatureInput id={i}>
//                                 <KeyLable>{key}:</KeyLable>
//                                 <Textarea rows={1.4} type='text' name={key}></Textarea>
//                             </FeatureInput>)})}
//                     {keys.length ? (<>
//                      <Input type='submit' value="Заполнить" name='Autofill'></Input> <br/></>) : nope} 
//                     </>
//                 )
//             });
//         })

//         // instance.UI.disableFeatures([instance.Feature.Forms])
//         // instance.UI.enableFeatures([instance.Feature.ContentEdit]);
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [url]);


















// const autofillDoc = async () => {
//     const elements = autoFillForm.current.elements;
//     const autofillMap = {};
//     for (let i = 0, element; (element = elements[i++]); ) {
//         if (element.type === 'textarea' && element.value.length > 0) {
  //             try {
    //             const json = JSON.parse(element.value);
    //             autofillMap[element.name] = json;
//             } catch (e) {
  //             autofillMap[element.name] = element.value.toString();
//             }
//         }
//     }
//     setFillingMap(autofillMap)
//     for (const entry in autofillMap) {
//         if (autofillMap[entry].hasOwnProperty('image_url')) {
  //             const path = autofillMap[entry]['image_url'];
//             if (path.substr(0, 4) !== 'http') {
  //             autofillMap[entry]['image_url'] = parentUrl + path;
  //             }
//         }
//     }
//     for (var k in autofillMap){
//         if (autofillMap.hasOwnProperty(k))
//         {
  //             autofillMap[k] = String(autofillMap[k]);
  //         }
  //     }
  //     await documentViewer_S.getDocument().applyTemplateValues(autofillMap);
  // }



