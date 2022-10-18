import React, {useState, useEffect} from 'react';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const LoadPage = () => {
    const [open, setOpen] = useState(true);
    const [upload, setUpload] = useState(false);
    const [files, setFiles] = useState([]);
    const [src, setSrc] = useState([]);

    function nope () {}

    let inputElement = '';

    const uploadClick = () => {
        console.log(';загрузка на сервер...')
    }
    const openClick = e => {
        e.stopPropagation()
        inputElement.click()
    }
    const changeHundler = (e) => {
        setFiles(Array.from(e.target.files))
    }
    useEffect(() => {
        if (files.length == 0) {
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
    const doc = [{ uri: require("../tests/test5.jpg") }];
    let a = 0
    
    return (
        <>
        <div className={" loadPage"}>
            <div className={" loadBox "}>
                <h3>Загрузка файлов</h3>
                <div>
                    <input ref={input => {inputElement = input}} onChange={changeHundler} type="file" id="file" placeholder="Search" className='loadPage__input'/>
                    {open ? (<button onClick={openClick} className='loadPage__openbtn'>Открыть</button>) : (nope)}
                    {upload ? (<button onClick={uploadClick}></button>) : nope}
                    {src ? (<div className='loadPage__peview'>
                        {src.map(srcer => {
                            a+=1
                            console.log(srcer)
                                return <DocViewer key={a} pluginRenderers={DocViewerRenderers} documents={[{ uri: srcer}]}/>
                                // return <DocViewer key={srcer.target.total} pluginRenderers={DocViewerRenderers} style={{width: "auto", height: 1000}} documents={srcer} />;
                        })}
                    </div>) : nope}
                </div>
                {/* <button className='loadPage__openbtn'>Открыть</button>
                <button className='loadPage__loadbtn'>Загрузить</button> */}
            </div>
        </div>
        </>
    );
};

export default LoadPage;