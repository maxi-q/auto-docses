import WebViewer, { WebViewerInstance } from '@pdftron/webviewer'
import { Worker } from '@react-pdf-viewer/core'
import { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { FormWithValidate } from '../../components/FormWithValidate'

import Documents, {
	IDocumentPackageData,
	IOneDocumentData,
} from '@api/documents'
import Records from '@api/records'
import Templates, { ITemplateDataWithValue } from '@api/templates'
import { Button, Input } from '@ui/index'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { AuthContext, UserContext } from '../../contexts'
import { FieldNames } from '../../helpers/validator'
import { Aside, LoadBox } from './components'
import { ModalDownloadDocument } from './modules/ModalDownloadDocument'
import { ModalUpdateTemplate } from './modules/ModalUpdateTemplate'
import { fetchRequestProfile } from '@api/user/profileData'
import { getFullDate } from '@helpers/date'
import { API_URL, Server_URL } from '@constants/API'

type keyInDocumentType = {
	title: string
	name_in_document: string
	id: string
	value: string
}

type NavigationType = {
	setUser: Function
	setLoggedIn: Function
}

export const ViewDocument = ({ setUser, setLoggedIn }: NavigationType) => {
	const viewer = useRef<HTMLElement>()

	const [maxPage, setMaxPage] = useState(0)
	const [instance, setInstance] = useState<WebViewerInstance>()
	const [FormWithFills, setFormWithFills] = useState<React.ReactNode>(null)
	const [url, setUrl] = useState('')
	const [keys, setKeys] = useState<Array<keyInDocumentType>>([])
	const [documentName, setDocumentName] = useState('')
	const [modalActive, setModalActive] = useState(false)
	const [formAction, setFormAction] = useState('Ждет файл...')
	const navigate = useNavigate()
	const [document, setDocument] = useState<IOneDocumentData>()
	const params = useParams()

	const userContext = useContext(UserContext)
	const authContext = useContext(AuthContext)

	const documentId = params.id


	useEffect(() => {
		if (!viewer.current) return

		WebViewer(
			{
				path: '/lib',
				preloadWorker: 'office',
				fullAPI: false,
			},
			viewer.current
		).then(instance => {
			setInstance(instance)

			instance.UI.disableElements([
				'leftPanel',
				'leftPanelButton',
				'header',
				'toolsHeader',
			])
		})
		fetchRequestProfile().then(data => {
			if(data.status == 401) {
				setLoggedIn(false)
			}
			setUser(data)
		})
	}, [])

	useEffect(() => {
		if (!url) return
		if (!instance) return

		const { documentViewer } = instance.Core

		instance.UI.loadDocument(url, {
			extension: 'docx',
		})

		documentViewer.addEventListener('documentLoaded', async () => {
			await documentViewer.getDocument().getDocumentCompletePromise()
			documentViewer.updateView()
		})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url])

	const documentsSerializer = new Documents()

	const setNowDocument = async (document: IOneDocumentData) => {
		const nowDocument = document
		if (!nowDocument) return
		const fileUrl = Server_URL + nowDocument?.file
		if (!fileUrl) return
		const blob = await fetch(fileUrl).then(r => r.blob())
		const url = URL.createObjectURL(blob)
		setUrl(url)
		setDocumentName(nowDocument.title)
	}

	const TemplateSerializer = new Templates()

	useEffect(() => {
		updateTable()
	}, [])

	const updateTable = () => {
		documentsSerializer
			.read({ id: documentId || '' })
			.then(res => {
				if (res.status == 404) navigate('/Profile')

				res.json().then(async (data: IOneDocumentData) => {
					setNowDocument(data)

					setDocumentName(data.title)

					if (!data) return
					setMaxPage(1)

					let templateSet: Array<keyInDocumentType> = []
					const values = await (await TemplateSerializer.getValuesList()).json()

					data.templates?.map(template => {
						if (!templateSet.find(item => item.id == template.id)) {
							const value = values?.find(
								(value: ITemplateDataWithValue) =>
									value.template.id == template.id
							)

							templateSet.push({
								name_in_document: template.title,
								title: template.title,
								id: template.id,
								value: value ? value.value : '',
							})
						}
					})

					setKeys(templateSet)
				})
			})
			.catch(err => {
				console.log(err)
			})
	}
	const addNewTemplate = (newTemplate: keyInDocumentType) => {
		setKeys([...keys, newTemplate])
	}
	const checkButton = useRef<HTMLInputElement>()
	const recordSerializer = new Records()
	const SaveTemplateValuesF = (templates_values: any[]) => {
		if (!checkButton) return
		if (!checkButton.current) return
		if (!checkButton.current.checked) return

		templates_values.map(value => {
			TemplateSerializer.updateValue({
				templateId: value.template,
				value: value.value,
			}).then(res => {
				console.log(res)

				if (res.status == 404) {
					TemplateSerializer.createValue({
						templateId: value.template,
						value: value.value,
					})
				}
			})
		})
	}
	const onSubmit = (data: object) => {
		const templates_values = []
		for (const [key, value] of Object.entries(data)) {
			templates_values.push({ template: key, value: value })
		}

		console.log('make filled in document')
			// recordSerializer
			// 	.create({
			// 		documents_package: documentPackage.id,
			// 		templates_values: templates_values,
			// 	})
			// 	.then(res => {
			// 		res.json().then(data => {
			// 			const recordIdq = data.id
			// 			setRecordId(recordIdq)
			// 			setDownloadModal(true)
			// 		})
			// })

		// SaveTemplateValues(templates_values)
	}
	const addTemplate = () => {
		setModalActive(true)
		console.log(document)
	}

	const onClickCheckBox = () => {
		// setSaveTemplateValues(!saveTemplateValues)
	}

	useEffect(() => {
		if (!keys) return

		setFormWithFills(
			<div style={{ width: '100%' }}>
				<FormWithValidate onSubmit={onSubmit}>
					{keys &&
						keys.map((key, i) => {
							return (
								<FeatureInput key={i}>
									<KeyLabel>{key.name_in_document}:</KeyLabel>
									<Input
										defaultValue={key.value}
										field={FieldNames.field}
										placeholder={''}
										type='textarea'
										name={key.id}
									/>
								</FeatureInput>
							)
						})}
					{keys && <Button type='submit'>Заполнить все документы</Button>}
				</FormWithValidate>
				{userContext?.id == document?.author.id && (
					<AddTemplateBlock>
						<AddTemplateButton onClick={addTemplate}>
							Изменить поля
						</AddTemplateButton>
					</AddTemplateBlock>
				)}
			</div>
		)
		setFormAction('Заполните поля')
	}, [keys, document, userContext])

	return (
		<>
			{!authContext && <Navigate to={'/Auth'} />}

			<LoadPageStyled>
				<Worker workerUrl='https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js'>
					<Aside
						documentPackageName={documentName}
						documentName={documentName}
						formAction={formAction}
						FormWithFills={FormWithFills}
						saveTemplateValues={SaveTemplateValuesF}
						onClickCheckBox={onClickCheckBox}
						checkButton={checkButton}
					/>

					<LoadBox viewer={viewer} maxPage={maxPage} />

					{/* {document  && (
						<ModalUpdateTemplate
							documentPackage={documentPackage}
							document={document}
							setModalActive={setModalActive}
							modalActive={modalActive}
							addTemplate={addNewTemplate}
							updateTable={updateTable}
						/>
					)} */}
					{/* {documentPackage && (
						<ModalDownloadDocument
							setModalActive={setDownloadModal}
							modalActive={downloadModal}
							documentPackage={documentPackage}
							recordId={recordId}
						/> 
					)}*/}
				</Worker>
			</LoadPageStyled>
		</>
	)
}

const LoadPageStyled = styled.div`
	padding-top: 3em;
	display: flex;
`

const KeyLabel = styled('span')`
	font-size: 1em;
	color: #767676;
`
const FeatureInput = styled.div`
	margin-left: 5px;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: start;
`

const AddTemplateButton = styled(Button)`
	width: 100%;
`
const AddTemplateBlock = styled.div`
	margin: 1% 0 0 0;
	width: 100%;
`
const TemplateSplitter = styled.div`
	width: 100%;
	height: 1px;
	background-color: grey;
`
export default ViewDocument
