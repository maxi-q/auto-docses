import React, {useState, useEffect, useRef} from 'react';
import WebViewer from '@pdftron/webviewer';
import axios from 'axios'

import { sumbitFiles, sumbitСhanges } from '../config/cum'

const LoadPage = () => {

    const viewer = useRef();
    const [autofillHidden, setAutofillHidden] = useState('autofill-initial-hidden');
    const [documentName, setDocumentName] = useState('Имя документа')
    const [keyValues, setKeyValues] = useState('Ждет файл...')
    const [autoFills, setAutoFills] = useState(null)
    const [fileUploaded, setFileUploaded] = useState('')
    const [statusLabel, setStatusLabel] = useState('')
    const [parentUrl, setParentUrl] = useState(window.location.href)
    const [instance, setInstance] = useState(null)
    const [documentViewer_S, setDocumentViewer] = useState(null)
    const [isViewingSampleDocument, setIsViewingSampleDocument] = useState(true);
    const [upload, setUpload] = useState(() => false);
    const [files, setFiles] = useState(() => []);
    const [url, setUrl] = useState(() => '');
    const [fillingMap, setFillingMap] = useState({});

    useEffect(() => {
        WebViewer(
          {
            path: '/lib',
            preloadWorker: 'office',
            css: '../styles/trooncss.css',
            fullAPI: false,
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

                setStatusLabel('Отправить для заполнения документа')
                setAutofillHidden('')
                setDocumentName(doc.filename)
                setKeyValues('Ключи документа:')

                doc.getTemplateKeys().then(keys => {
                    setAutoFills(
                        <>
                        {keys.map((key, i) => {
                            return(
                                <div id={i}>
                                    <span className='tag-label'>{key}</span>
                                    <textarea rows={1.4} className='value-field' type='text' name={key}></textarea>
                                    <br/>
                                </div>)})}
                        {keys.length ? (<><input type='submit' className='auto-fill-button' value="Заполнить" name='Autofill'></input> <br/></>) : nope}
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
        const elements = document.getElementById('autofill-form').elements;
        const autofillMap = {};

        for (let i = 0, element; (element = elements[i++]); ) {
            if (element.className === 'value-field' && element.value.length > 0) {
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
        setIsViewingSampleDocument(false)
        loadDoc(Array.from(e.target.files)[0])
    }
    const loadDoc = async (file) => {
        if(file) {
            await instance.loadDocument(URL.createObjectURL(file), { filename: file.name });
            setFileUploaded('Файл загружен')
        }
    }
    

    let inputElement = '';
    
    return (
        <>
        <div className={" loadPage"}>
            <aside className="autofill sumbitForm">
                <h2 id="doc-title">{ documentName }</h2>
                <br />
                <h1 id="key-val-title">{ keyValues }</h1>
                <p id="current-status">{ statusLabel }</p>
                <form id="autofill-form" onSubmit={fillFile}>{ autoFills }</form>
                <div className={autofillHidden}>
                    <h2>Загрузка файла:</h2>
                    <p>Выберите свой собственный шаблон документа</p>
                    <div className="spacer"></div>
                    <label className="custom-file-upload">
                    <input id="file-picker" type="file" accept=".docx"/>
                    Выбрать файл </label>
                    <span id="file-status">{ fileUploaded }</span>
                </div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
            </aside>
            <div className={" loadBox "}>
                <h3>Загрузка файлов</h3>
                <div className='div_loadBox'>
                    <input ref={input => {inputElement = input}} multiple="multiple" onChange={changeHundler} type="file" id="file" placeholder="Search" className='loadPage__input'/>
                    <div>
                        <button onClick={openClick} className='loadPage__openbtn'>Открыть</button>
                        {upload ? (<button onClick={() => sumbitFiles(files)} className='loadPage__uploadbtn'>Загрузить</button>) : nope()}
                    </div>
                    {upload ? (<div className='loadPage__peview'> 
                        {url.map((urla, i) => {
                            return(
                                <div className="webviewer" key={i} ref={viewer}></div>
                            )
                        })}
                    </div>) : <div className='loadPage__peview'>Файл не выбран</div>}
                </div>
            </div>
        </div>
        </>
    );
};

export default LoadPage;