import React, {useState, useEffect, useRef} from 'react';
import WebViewer from '@pdftron/webviewer';

import { sumbitFiles, sumbitСhanges } from '../../api/cum'
import { Aside } from './components/Aside';
import { createRef } from 'react';
import { LoadBox } from './components/LoadBox';
import styled from 'styled-components';
export const LoadPage = () => {

    const viewer = useRef();
    const [autofillHidden, setAutofillHidden] = useState(true);
    const [documentName, setDocumentName] = useState('Имя документа')
    const [keyValues, setKeyValues] = useState('Ждет файл...')
    const [autoFills, setAutoFills] = useState(null)
    const [fileUploaded, setFileUploaded] = useState('')
    const [actionLabel, setActionLabel] = useState('')
    const [parentUrl, setParentUrl] = useState(window.location.href)
    const [instance, setInstance] = useState(null)
    const [documentViewer_S, setDocumentViewer] = useState(null)
    const [upload, setUpload] = useState(() => false);
    const [files, setFiles] = useState(() => []);
    const [url, setUrl] = useState(() => '');
    const [fillingMap, setFillingMap] = useState({});

    const autoFillForm = createRef();
    useEffect(() => {
        WebViewer(
          {
            path: '/lib',
            preloadWorker: 'office',
            fullAPI: false
          },
          viewer.current
        ).then((instance) => {
            const { documentViewer } = instance.Core
            setInstance(instance)
            setParentUrl(window.location.href)
            setDocumentViewer(documentViewer)
            
            instance.UI.disableElements([ 'leftPanel', 'leftPanelButton', 'header' ]);
            instance.UI.loadDocument(url[0], { filename: files[0].name });


            documentViewer.addEventListener('documentLoaded', async () => {
                await documentViewer.getDocument().documentCompletePromise();
                documentViewer.updateView();
                const doc = documentViewer.getDocument();

                console.log(doc.filename, url[0])

                setActionLabel('Отправить для заполнения документа')
                setAutofillHidden(false)
                setDocumentName(doc.filename)
                setKeyValues('Ключи документа:')

                doc.getTemplateKeys().then(keys => {
                    setAutoFills(
                        <>
                        {keys.map((key, i) => {
                            return(
                                <FeatureInput id={i}>
                                    <KeyLable>{key}:</KeyLable>
                                    <TextareaLable rows={1.4} type='text' name={key}></TextareaLable>
                                </FeatureInput>)})}
                        {keys.length ? (<><InputForm type='submit' value="Заполнить" name='Autofill'></InputForm> <br/></>) : nope}
                        </>
                    )
                });
            })

            // instance.UI.disableFeatures([instance.Feature.Forms])
            // instance.UI.enableFeatures([instance.Feature.ContentEdit]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);
    
    useEffect(() => {
        if (Boolean(files.length)) 
            setUrl([ URL.createObjectURL(files[0]) ])
        else setUrl('')
        setUpload(Boolean(files.length))
    }, [files])

    useEffect(() => {
        sumbitСhanges(fillingMap)
    }, [fillingMap])
    

    const autofillDoc = async () => {
        const elements = autoFillForm.current.elements;
        const autofillMap = {};
        for (let i = 0, element; (element = elements[i++]); ) {
            if (element.type === 'textarea' && element.value.length > 0) {
                try {
                const json = JSON.parse(element.value);
                autofillMap[element.name] = json;
                } catch (e) {
                autofillMap[element.name] = element.value.toString();
                }
            }
        }
        setFillingMap(autofillMap)
        for (const entry in autofillMap) {
            if (autofillMap[entry].hasOwnProperty('image_url')) {
                const path = autofillMap[entry]['image_url'];
                if (path.substr(0, 4) !== 'http') {
                autofillMap[entry]['image_url'] = parentUrl + path;
                }
            }
        }
        for (var k in autofillMap){
            if (autofillMap.hasOwnProperty(k))
            {
                autofillMap[k] = String(autofillMap[k]);
            }
        }
        await documentViewer_S.getDocument().applyTemplateValues(autofillMap);
    }

    function nope () { return <></> }


    const fillFile = (e) => {
        e.preventDefault();
        autofillDoc();
    }
    const openClick = e => {
        e.preventDefault()
        inputElement.click()
    }
    const changeHundler = (e) => {
        setFiles(Array.from(e.target.files))
        loadDoc(Array.from(e.target.files)[0])
    }
    const loadDoc = async (file) => {
        if(file) {
            await instance.loadDocument(URL.createObjectURL(file), { filename: file.name });
            setFileUploaded('Файл загружен')
        }
    }
    const [inputElement, setInputElement] = useState('');

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
            />
        </LoadPageStyled>
        </>
    );
};

const LoadPageStyled = styled.div`
    padding-top: 3em;
    display: flex;
`
const KeyLable = styled("span")`
font-size: 1.0em;
color:#767676;
`
const TextareaLable = styled.textarea`
    margin-left:0px;
    margin-bottom:20px;
    min-height: 31px;
    font-style: italic;
    word-break: break-word;

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
const FeatureInput = styled.div`
   display:flex;
   justify-content: space-between;
   align-items: start;
`
export default LoadPage;