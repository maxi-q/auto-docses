import styled from 'styled-components'

import { toolbarPlugin } from '@react-pdf-viewer/toolbar'
import React from 'react'
import { COLORS } from '../../../constants/style/COLORS'
import { Button } from '../../../ui'

interface ILoadBox {
	url: Array<string>
	setInputElement: Function
	changeHandler: React.ChangeEventHandler
	openClick: React.MouseEventHandler
	submitFiles: Function
	upload: boolean
	files: Array<File>
	viewer: any
}

export const LoadBox = ({
	url,
	setInputElement,
	changeHandler,
	openClick,
	submitFiles,
	upload,
	files,
	viewer
}: ILoadBox) => {
	const toolbarPluginInstance = toolbarPlugin()
	const { Toolbar } = toolbarPluginInstance

	function nope() {
		return <></>
	}

	let preview: Array<React.ReactNode> = []

	if (url) {
		preview = url.map((item, i) => <p key={i}>{item}</p>)
	}

	return (
		<>
			<LoadDivStyled>
				<Title>Загрузка файлов</Title>
				<LoadBoxStyled>
					<NoneInput
						ref={input => {
							setInputElement(input)
						}}
						multiple={true}
						onChange={changeHandler}
						type='file'
						id='file'
						placeholder='Search'
					/>
					<ButtonsBlock>
						<OpenButton onClick={openClick}>Открыть</OpenButton>
						{upload ? (
							<UploadButton onClick={() => submitFiles(files)}>
							Загрузить
						</UploadButton>
						) : (
							nope()
						)}
					</ButtonsBlock>
					{upload ? (
						<Preview>
							{url.map((urla, i) => {
								return <WebViewer key={i} ref={viewer}></WebViewer>
							})}
						</Preview>
					) : (
						<Preview>Файл не выбран</Preview>
					)}
				</LoadBoxStyled>
			</LoadDivStyled>
		</>
	)
}

const Title = styled.h3`
	margin: 0 0 0 15px;
`
const LoadDivStyled = styled.div`
	background: ${COLORS.blue100};
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
const ButtonsBlock = styled.div`
	display: flex;
	margin-left: 40px;
`
const OpenButton = styled(Button)`
	border-radius: 12px;
	margin-top: 20px;
	width: 140px;
`
const UploadButton = styled(Button)`
	border-radius: 12px;
	margin-left: 10px;
	margin-top: 20px;
	width: 140px;
`
const Preview = styled.div`
	display: flex;
	height: 900px;
	flex-wrap: wrap;
	justify-content: center;
	padding: 0.5rem;
`
const WebViewer = styled.div`
    width: 100%;
`