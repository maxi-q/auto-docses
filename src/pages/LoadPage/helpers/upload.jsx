export function upload(selector) {
    
  const input = document.querySelector('#file')

  const open = document.createElement('button')
  open.classList.add('loadPage__openbtn')
  open.textContent = 'Открыть'
  input.insertAdjacentElement('aftereend', open)
    
}