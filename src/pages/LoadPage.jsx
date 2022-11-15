import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios'
import WebViewer from '@pdftron/webviewer';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

const prePopulate = {
    client_full_name: { val: 'Mrs. Eric Tragar', rows: 1 },
    client_gender_possesive: { val: 'her', rows: 1 },
    current_date: { val: '07/16/21', rows: 1 },
    dest_address: { val: '187 Duizelstraat\n5043 EC Tilburg, Netherlands', rows: 2 },
    dest_street_address: { val: '187 Duizelstraat', rows: 1 },
    dest_given_name: { val: 'Janice N.', rows: 1 },
    dest_surname: { val: 'Symonds', rows: 1 },
    dest_title: { val: 'Ms.', rows: 1 },
    land_location: { val: '225 Parc St., Rochelle, QC ', rows: 1 },
    lease_problem: { val: 'According to the city records, the lease was initiated in September 2010 and never terminated', rows: 3 },
    sender_name: { val: 'Arnold Smith', rows: 1 },
    logo: { val: '{"image_url":"../../files/logo_red.png", "width":64, "height":64}', rows: 2 },
  };

const LoadPage = () => {

    const viewer = useRef();
    const [autofillHidden, setAutofillHidden] = useState('autofill-initial-hidden');
    const [documentName, setDocumentName] = useState('SampleDocument')
    const [keyValues, setKeyValues] = useState('Currently preparing...')
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
            instance.UI.loadDocument(url[0], { filename: 'myfile.docx' });

            documentViewer.addEventListener('documentLoaded', async () => {
                await documentViewer.getDocument().documentCompletePromise();
                documentViewer.updateView();

                const doc = documentViewer.getDocument();
                console.log(doc.filename, doc)

                setStatusLabel('Submit to populate the document preview')

                setAutofillHidden('')
                setDocumentName(doc.filename)
                setKeyValues('Key values :')

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
                        {keys.length ? (<><input type='submit' value="Заполнить" name='Autofill'></input> <br/></>) : nope}
                        
                        </>
                    )
                });
            })

            
            instance.UI.disableFeatures([instance.Feature.Forms])
            instance.UI.enableFeatures([instance.Feature.ContentEdit]);

        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [url]);

    const submitFile = (e) => {
        e.preventDefault();
        autofillDoc();
    }
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

        console.log({"Date": 123,"Name": 123, "Street": "Mc.Donald"}, autofillMap)
        await documentViewer_S.getDocument().applyTemplateValues(autofillMap);
    }


    function nope () { return <></> }

    let inputElement = '';

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
            setFileUploaded('File uploaded')
        }
    }
    
    useEffect(() => {
        if (Boolean(files.length)) 
            setUrl([ URL.createObjectURL(files[0]) ])
        else setUrl('')
        setUpload(Boolean(files.length))
    }, [files])

    


    const sumbitFile = () => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append(`file`, file);
        })
        axios.post('http://192.168.0.107:5000/load_file', formData)
        .then((json) => console.log(json))
        .catch(error => console.log(error, "error"))

    }
    
    return (
        <>
        <div className={" loadPage"}>
            <aside className="autofill sumbitForm">
                <h2 id="doc-title">{ documentName }</h2>
                
                <br />
                <h1 id="key-val-title">{ keyValues }</h1>
                <p id="current-status">{ statusLabel }</p>
                <form id="autofill-form" onSubmit={submitFile}>{ autoFills }</form>
                <div className={autofillHidden}>
                    <h2>Upload file:</h2>
                    <p>Choose your own template document</p>
                    <div className="spacer"></div>
                    <label className="custom-file-upload">
                    <input id="file-picker" type="file" accept=".docx"/>
                    Choose file </label>
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
                        {upload ? (<button onClick={(e) => submitFile(e)} className='loadPage__uploadbtn'>Загрузить</button>) : nope()}
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