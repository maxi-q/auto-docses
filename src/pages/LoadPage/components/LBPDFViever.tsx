import { Viewer } from '@react-pdf-viewer/core'
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
}

export const LoadBox = ({
	url,
	setInputElement,
	changeHandler,
	openClick,
	submitFiles,
	upload,
	files,
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
					<Preview>
						{upload ? (
							<>
								<Toolbar>
									{props => {
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
										} = props
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
										)
									}}
								</Toolbar>
								<Viewer
									fileUrl={url[0] ? url[0] : ''}
									plugins={[toolbarPluginInstance]}
								/>
							</>
						) : (
							'Файл не выбран'
						)}
					</Preview>
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
	height: 100%;
	flex-wrap: wrap;
	justify-content: center;
	padding: 0.5rem;
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
