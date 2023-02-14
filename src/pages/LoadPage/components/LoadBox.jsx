import React, { useState } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import styled from 'styled-components'

import { convertToHTML } from '../helpers/convertToHTML'
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';

export const LoadBox = (props) => {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
 
  function nope () { return <></> }

  let preview = ''

  if(props.url) {
    preview = props.url.map((item, i) => <p key={i}>{item}</p>)
    console.log(props.url, preview[0].props.children)
  }

  return <>
    <LoadDivStyled>
      <Title>Загрузка файлов</Title>
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
        <Preview> 
          {props.upload ? (
            <>
              <Toolbar>
                {(props) => {
                  const {
                    CurrentPageInput,
                    Download,
                    EnterFullScreen,
                    GoToNextPage,
                    GoToPreviousPage,
                    NumberOfPages,
                    Print,
                    ShowSearchPopover,
                    Zoom,
                    ZoomIn,
                    ZoomOut,
                  } = props;
                  return (
                    <>
                      <div style={{ padding: '0px 2px' }}>
                        <ShowSearchPopover />
                      </div>
                      <div style={{ padding: '0px 2px' }}>
                        <ZoomOut />
                      </div>
                      <div style={{ padding: '0px 2px' }}>
                        <Zoom />
                      </div>
                      <div style={{ padding: '0px 2px' }}>
                        <ZoomIn />
                      </div>
                      <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                        <GoToPreviousPage />
                      </div>
                      <div style={{ padding: '0px 2px' }}>
                        <CurrentPageInput /> / <NumberOfPages />
                      </div>
                      <div style={{ padding: '0px 2px' }}>
                        <GoToNextPage />
                      </div>
                      <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                        <EnterFullScreen />
                      </div>
                      <div style={{ padding: '0px 2px' }}>
                        <Download />
                      </div>
                      <div style={{ padding: '0px 2px' }}>
                        <Print />
                      </div>
                    </>
                  );
                }}
              </Toolbar>
              <Viewer fileUrl={preview[0].props.children} plugins={[toolbarPluginInstance]} />
            </>
          ) : "Файл не выбран"}
        </Preview>
      </LoadBoxStyled>
    </LoadDivStyled>
  </>
}

const Title = styled.h3`
  margin: 0 0 0 15px;
`
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
const WorkerBG = styled.div`
  background-color: rgb(166, 223, 67);
  width: 100%;
`
const ToolbarBG = styled.div`
  align-items: 'center',
  background-color: '#eeeeee',
  border-bottom: '1px solid rgba(0, 0, 0, 0.1)',
  display: 'flex',
  padding: '4px',
`
const ViewerBG = styled.div`
flex: 1,
overflow: 'hidden',
`