import React, {useEffect} from 'react';

const LoadPage = () => {

    useEffect(() => {
        const input = document.querySelector("#file")

        const open = document.createElement('button')
        open.classList.add('loadPage__openbtn')
        open.textContent = 'Открыть'
        console.log(document.querySelector("#file"))
        
        input.insertAdjacentElement('afterend', open)
      }, []);

    return (
        <>
        <div className={" loadPage"}>
            <div className={" loadBox "}>
                <h3>Загрузка файлов</h3>
                <label>
                    <input type="file" id="file" placeholder="Search"/>
                </label>
                {/* <button className='loadPage__openbtn'>Открыть</button>
                <button className='loadPage__loadbtn'>Загрузить</button> */}
            </div>
        </div>
        </>
    );
};

export default LoadPage;