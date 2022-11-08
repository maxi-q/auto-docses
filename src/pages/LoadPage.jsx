import React, {useState, useEffect} from 'react';
import axios from 'axios'

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const LoadPage = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();


    const [upload, setUpload] = useState(false);
    const [files, setFiles] = useState([]);
    const [url, setUrl] = useState('');

    function nope () { return <></> }

    let inputElement = '';

    const openClick = e => {
        e.stopPropagation()
        inputElement.click()
    }
    const changeHundler = (e) => {
        setFiles(Array.from(e.target.files))
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

    
    let a = 0
    return (
        <>
        <div className={" loadPage"}>
            <div className={" loadBox "}>
                <h3>Загрузка файлов</h3>
                <div>
                    <input ref={input => {inputElement = input}} multiple="multiple" onChange={changeHundler} type="file" id="file" placeholder="Search" className='loadPage__input'/>
                    <button onClick={openClick} className='loadPage__openbtn'>Открыть</button>
                    {upload ? (<button onClick={sumbitFile} className='loadPage__uploadbtn'>Загрузить</button>) : nope()}
                    {upload ? (<div className='loadPage__peview'> 
                        {url.map((urla, i) => {
                            console.log(url)
                            return(
                                <Worker key={i} workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
                                    <Viewer className="loadPage__preview__Viever" plugins={[
                                        defaultLayoutPluginInstance
                                    ]} fileUrl={urla} />
                                </Worker>
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