function upload(selector) {
    
    const input = document.querySelector("#file")

    const open = document.createElement('button')
    open.classList.add('loadPage__openbtn')
    open.textContent = 'Открыть'
    console.log(document.querySelector("#file"))
    input.insertAdjacentElement('aftereend', open)
    
}
export default upload