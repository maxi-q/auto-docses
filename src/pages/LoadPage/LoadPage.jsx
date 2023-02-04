import React, {useState, useEffect, useRef, createRef} from 'react'
import styled from 'styled-components'

import { Aside, LoadBox } from './components'
import { sumbitFiles, sumbitСhanges } from './api/cum'

export const LoadPage = () => {

  const autoFillForm = createRef()
  const viewer = useRef()

  const [documentName, setDocumentName] = useState('Имя документа')
  const [autofillHidden, setAutofillHidden] = useState(true)
  const [keyValues, setKeyValues] = useState('Ждет файл...')
  const [fileUploaded, setFileUploaded] = useState('')
  const [inputElement, setInputElement] = useState('')
  const [actionLabel, setActionLabel] = useState('')
  const [upload, setUpload] = useState(() => false)
  const [autoFills, setAutoFills] = useState(null)
  const [fillingMap, setFillingMap] = useState({})
  const [docxHTML, setDocxHTML] = useState(<></>)
  const [files, setFiles] = useState(() => [])
  const [url, setUrl] = useState(() => '')

  useEffect(() => {
    // сменить рендереный файл
  }, [url])

  useEffect(() => {
    if (Boolean(files.length)) 
      setUrl( files.map(file => URL.createObjectURL(file) ) )
    else setUrl('')
    setUpload(Boolean(files.length))
  }, [files])

  useEffect(() => {
    sumbitСhanges(fillingMap)
  }, [fillingMap])

  const fillFile = (e) => {
    e.preventDefault()
    // autofillDoc()
  }
  const openClick = e => {
    e.preventDefault()
    inputElement.click()
  }
  const changeHundler = (e) => {
    setFiles(Array.from(e.target.files))
    loadDoc(Array.from(e.target.files))
  }
  const loadDoc = async (file) => {
    if(file) {
      // await instance.loadDocument(URL.createObjectURL(file), { filename: file.name });
      setFileUploaded('Файл загружен')
    }
  }

  return (
    <>
      <LoadPageStyled>
        <Aside  
          documentName={documentName}
          keyValues={keyValues}
          statusLabel={actionLabel}
          fillFile={fillFile}
          autoFills={autoFills}
          autofillHidden={autofillHidden}
          fileUploaded={fileUploaded}
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
          viewer={viewer}
          docxHTML={docxHTML}
          setDocxHTML={setDocxHTML}
        />
      </LoadPageStyled>
    </>
  )
}

const LoadPageStyled = styled.div`
  padding-top: 3em;
  display: flex;
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