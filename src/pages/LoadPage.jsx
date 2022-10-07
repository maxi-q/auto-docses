import React, {useState, useEffect} from 'react';
import DocViewer, { DocViewerRenderers }  from 'react-doc-viewer';

const trueUpload = (options = {}) => {
    const input = document.querySelector("#file")
    const preview = document.createElement('div')
    preview.classList.add('loadPage__peview')

    const open = document.createElement('button')

    open.classList.add('loadPage__openbtn')
    open.textContent = 'Открыть'
    
    if (options.multi) {
        input.setAttribute('multiple', true)
    }
    if (options.accept && Array.isArray(options.accept)) {
        input.setAttribute('accept', options.accept.join(','))
    }
}

const LoadPage = () => {
    const [open, setOpen] = useState(true);
    const [files, setFiles] = useState([]);
    const [src, setSrc] = useState([]);

    function nope () {}

    let inputElement = '';

    useEffect(() => {
        trueUpload({
            //multi: false,
            //accept: ['.docx']
        })
        }, []);
    const uploadClick = e => {
        e.preventDefault()
        inputElement.click()
    }
    const changeHundler = (e) => {
        setFiles(Array.from(e.target.files))
    }
    useEffect(() => {
        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = ev => {
                const srcer = ev.target.result
                setSrc([srcer])
            }

            reader.readAsDataURL(file)
        })
    }, [files])

    return (
        <>
        <div className={" loadPage"}>
            <div className={" loadBox "}>
                <h3>Загрузка файлов</h3>
                <label>
                    <input ref={input => {inputElement = input}} onChange={changeHundler} type="file" id="file" placeholder="Search" className='loadPage__input'/>
                    {open ? (<button onClick={uploadClick} className='loadPage__openbtn'>Открыть</button>) : (nope)}
                    {src ? (<div className='loadPage__peview'>
                        {src.map(srcer => {
                                console.log(srcer)
                                // return <DocViewer key={srcer} pluginRenderers={DocViewerRenderers} documents={require('../tests/test1.docx')}/>
                                return <img key={srcer} className='loadPage__peview__image' src={srcer}/>
                        })}
                    </div>) : nope}
                </label>
                {/* <button className='loadPage__openbtn'>Открыть</button>
                <button className='loadPage__loadbtn'>Загрузить</button> */}
            </div>
        </div>
        </>
    );
};

export default LoadPage;