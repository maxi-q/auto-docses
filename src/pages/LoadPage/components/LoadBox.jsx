import React from 'react'
import styled from 'styled-components'

import { convertToHTML } from '../helpers/convertToHTML'

export const LoadBox = (props) => {
  function nope () { return <></> }
  let preview = ''

  if(props.url) {
    preview = props.url.map((item, i) => <p key={i}>{item}</p>)
  }
  if (preview[0]){
    convertToHTML(preview[0])
  }

  return<>
    <LoadDivStyled>
      <h3>Загрузка файлов</h3>
      <LoadBoxStyled>
        <NoneInput 
          ref={input => {props.setInputElement(input)}} 
          multiple="multiple" 
          onChange={props.changeHundler} 
          type="file" 
          id="file" 
          placeholder="Search"
        />
        <div>
          <OpenButton onClick={props.openClick}>Открыть</OpenButton>
          {props.upload ? (
            <UploadButton 
              onClick={() => props.sumbitFiles(props.files)}>
              Загрузить
            </UploadButton>
          ) : nope()}
        </div>
        {props.upload ? (
          <Preview> 
            {preview}
          </Preview>
        ) : <Preview>Файл не выбран</Preview>}
      </LoadBoxStyled>
    </LoadDivStyled>
  </>
}

const LoadDivStyled = styled.div`
    background: rgb(227, 227, 227);
    padding: 4px;
    min-height: 100vh;
    border-radius: 12px;
    margin: 0 7%;
    flex: 1;
    display: flex;
    flex-direction: column;
`

const LoadBoxStyled = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const NoneInput = styled.input`
    display: none;
`
const OpenButton = styled.button`
    border-radius: 12px;
    margin-top: 20px;
    border: 4px solid rgb(166, 223, 67);
    width: 140px;
    background-color: rgb(166, 223, 67);
`
const UploadButton = styled.button`
    border-radius: 12px;
    margin-left: 10px;
    margin-top: 20px;
    border: 4px solid rgb(166, 223, 67);
    width: 140px;
    background-color: rgb(255, 255, 255);
`
const Preview = styled.div`
    display: flex;
    height: 100%;
    flex-wrap: wrap;
    justify-content: center;
    padding: .5rem;
`