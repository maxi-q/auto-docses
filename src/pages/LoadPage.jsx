import React, {createElement, useEffect} from 'react';

const upload =(selector, options = {}) => {

    const input = document.querySelector(selector)
    const preview = document.createElement('div')
    preview.classList.add('loadPage__peview')

    const open = document.createElement('button')
    document.querySelectorAll('button').forEach(el => {
        el.parentNode.removeChild(el)
    })

    open.classList.add('loadPage__openbtn')
    open.textContent = 'Открыть'
    
    if (options.multi) {
        input.setAttribute('multiple', true)
    }
    if (options.accept && Array.isArray(options.accept)) {
        input.setAttribute('accept', options.accept.join(','))
    }

    input.insertAdjacentElement('afterend', preview)
    input.insertAdjacentElement('afterend', open)

    const triggerInput = () => input.click()
    open.addEventListener('click', triggerInput)
    
    const createrSuka = (src) => {
        console.log(src)
        return "<div className='loadPage__peview__image'><img src='" + {src} +"' alt='каптринка'/> </div>"
    }

    const changeHundler = event => {
        if(!event.target.files.length) { return }
        const files = Array.from(event.target.files)
        
        files.forEach(file => {
            if (!file.type.match('image')){
             return
            }
            const reader = new FileReader()
            
            reader.onload = ev => {
                const src = ev.target.result
                console.log(createrSuka(src))
                preview.insertAdjacentHTML('afterbegin', "<div className='loadPage__peview__image'><img style='width:500px; height:auto; padding: .5rem;' src='" + src +"' alt='каптринка' /> </div>"
                )
            }

            reader.readAsDataURL(file)
            

        })
        
    }

    input.addEventListener('change', changeHundler)
}

const LoadPage = () => {

    useEffect(() => {
        

        upload("#file", {
            multi: false,
            //accept: ['.docx']
        })
      }, []);

    return (
        <>
        <div className={" loadPage"}>
            <div className={" loadBox "}>
                <h3>Загрузка файлов</h3>
                <label>
                    <input type="file" id="file" placeholder="Search" className='loadPage__input'/>
                </label>
                {/* <button className='loadPage__openbtn'>Открыть</button>
                <button className='loadPage__loadbtn'>Загрузить</button> */}
            </div>
        </div>
        </>
    );
};

export default LoadPage;