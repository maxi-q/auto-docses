import React, {useState, useEffect} from 'react';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { sendFile } from '../config/requests';
import axios from "axios";

const LoadPage = () => {
    const [upload, setUpload] = useState(false);
    const [files, setFiles] = useState([]);
    const [src, setSrc] = useState([]);

    function nope () { return <></> }

    let inputElement = '';

    const uploadClick = () => {
        sendFile(files)

    }

    const openClick = e => {
        e.stopPropagation()
        inputElement.click()
    }
    const changeHundler = (e) => {
        setFiles(Array.from(e.target.files))
    }
    useEffect(() => {
        if (files.length === 0) {
            setSrc([])
            setUpload(false)
            return
        }
        setUpload(true)
        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = ev => {
                const srcer = ev.target.result
                setSrc([srcer])
            }
            reader.readAsDataURL(file)
        })
    }, [files])

    const sumbitFile = () => {
        const dataArray = new FormData();
        dataArray.append("uploadFile", files[0]);

        
        fetch('http://192.168.88.62:5000/load_file', {
            method:'POST',
            headers: new Headers({
                'Content-Type': 'multipart/form-data',
                "type": "formData"
            }),
            body: dataArray
        })
        .then((json) => json.json()
            .then(js => console.log(js))
        )
        .catch(error => console.log(error, "error"))

    }

    let a = 0
    return (
        <>
        <div className={" loadPage"}>
            <div className={" loadBox "}>
                <h3>Загрузка файлов</h3>
                <div>
                    <input ref={input => {inputElement = input}} onChange={changeHundler} type="file" id="file" placeholder="Search" className='loadPage__input'/>
                    <button onClick={openClick} className='loadPage__openbtn'>Открыть</button>
                    {upload ? (<button onClick={sumbitFile} className='loadPage__uploadbtn'>Загрузить</button>) : nope()}
                    {src ? (<div className='loadPage__peview'>
                        {src.map(srcer => {
                            return nope()
                                // return <DocViewer key={srcer.target.total} pluginRenderers={DocViewerRenderers} style={{width: "auto", height: 1000}} documents={srcer} />;
                        })}
                    </div>) : nope()}
                </div>
                {/* <button className='loadPage__openbtn'>Открыть</button>
                <button className='loadPage__loadbtn'>Загрузить</button> */}
            </div>
        </div>
        </>
    );
};

export default LoadPage;