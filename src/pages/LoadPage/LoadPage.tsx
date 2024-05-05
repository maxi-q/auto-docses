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
import { fetchRequestProfile } from '@api/user/profileData'
import { Server_URL } from '@constants/API'
import { Button, Input } from '@ui/index'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { AuthContext, UserContext } from '../../contexts'
import { FieldNames } from '../../helpers/validator'
import { Aside, LoadBox } from './components'
import { ModalDownloadDocument } from './modules/ModalDownloadDocument'
import { ModalUpdateTemplate } from './modules/ModalUpdateTemplate'

type keyInDocumentType = {
	title: string
	name_in_document: string
	id: string
	value: string
	regex: RegExp
	example_value: string
	description: string
}

type NavigationType = {
	setUser: Function
	setLoggedIn: Function
}

export const LoadPage = ({ setUser, setLoggedIn }: NavigationType) => {
	const viewer = useRef<HTMLElement>()

	const [recordId, setRecordId] = useState('')
	const [saveTemplateValues, setSaveTemplateValues] = useState(true)
	const [downloadModal, setDownloadModal] = useState(false)
	const [documentPackageName, setDocumentPackageName] = useState('Имя пакета')
	const [documentName, setDocumentName] = useState('Имя документа')
	const [formAction, setFormAction] = useState('Ждет файл...')
	const [maxPage, setMaxPage] = useState(0)
	const [instance, setInstance] = useState<WebViewerInstance>()
	const [FormWithFills, setFormWithFills] = useState<React.ReactNode>(null)
	const [url, setUrl] = useState('')
	const [keys, setKeys] = useState<Array<keyInDocumentType>>([])
	const [documentPackage, setDocumentPackage] = useState<IDocumentPackageData>()
	const [modalActive, setModalActive] = useState(false)
	const navigate = useNavigate()
	const [document, setDocument] = useState<IOneDocumentData>()
	const [prodId, setProdId] = useState<string | undefined>()
	const [view, setView] = useState(false)
	const params = useParams()

	const userContext = useContext(UserContext)
	const authContext = useContext(AuthContext)

	const [nowDocumentIndex, setNowDocumentIndex] = useState(
		Number(params.index) || 0
	)

	useEffect(() => {
		setProdId(params.id)
		setNowDocumentIndex(Number(params.index) || 0)
	}, [params])

	useEffect(() => {
		setDocument(documentPackage?.documents[nowDocumentIndex])
	}, [nowDocumentIndex, documentPackage])

	useEffect(() => {
		documentPackage && setNowDocument(documentPackage)
	}, [document])

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
			setDocumentF()
		})

		fetchRequestProfile().then(data => {
			if (data.status == 401) {
				setLoggedIn(false)
			}
			setUser(data)
		})
	}, [])

	useEffect(() => {
		setDocumentF()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url])

	const setDocumentF = () => {
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
	}
	const documentsSerializer = new Documents()

	const setNowDocument = async (documentPackage: IDocumentPackageData) => {
		const nowDocument = documentPackage.documents[nowDocumentIndex]
		if (!nowDocument) return
		const fileUrl = nowDocument?.file
		if (!fileUrl) return
		const blob = await fetch(Server_URL + fileUrl).then(r => r.blob())
		const url = URL.createObjectURL(blob)
		setUrl(url)
		setDocumentName(nowDocument.title)
	}

	const TemplateSerializer = new Templates()

	useEffect(() => {
		if (!prodId) return
		updateTable()
	}, [prodId])

	const updateTable = () => {
		documentsSerializer
			.readPackage({ id: prodId || '' })
			.then(res => {
				if (res.status == 404) navigate('/Profile')

				res.json().then(async (data: IDocumentPackageData) => {
					setNowDocument(data)

					setDocumentPackage(data)
					setDocumentPackageName(data.title)

					if (!data.documents) return
					setMaxPage(data.documents.length)

					let templateSet: Array<keyInDocumentType> = []
					const values: ITemplateDataWithValue[] =
						await TemplateSerializer.getValuesList()

					data.documents.map(document =>
						document.templates?.map(template => {
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
									regex: new RegExp(template.regex),
									example_value: template.example_value,
									description: template.description,
								})
							}
						})
					)
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
	const checkButton = useRef<HTMLInputElement>(null)
	const recordSerializer = new Records()
	const SaveTemplateValues = (templates_values: any[]) => {
		if (!checkButton) return
		if (!checkButton.current) return
		if (!checkButton.current.checked) return

		templates_values.map(value => {
			TemplateSerializer.updateValue({
				templateId: value.template,
				value: value.value,
			}).then(res => {
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
			if (!keys.find(el => el.id == key)) continue
			templates_values.push({ template: key, value: value })
		}
		documentPackage &&
			recordSerializer
				.create({
					documents_package: documentPackage.id,
					templates_values: templates_values,
				})
				.then(res => {
					res.json().then(data => {
						const recordIdq = data.id
						setRecordId(recordIdq)
						setDownloadModal(true)
					})
				})
				.catch(_ => {
					window.alert('произошла ошибка на сервере, обновите страницу')
				})
		SaveTemplateValues(templates_values)
	}

	const addTemplate = () => {
		setModalActive(true)
	}

	const onClickCheckBox = () => {
		setSaveTemplateValues(!saveTemplateValues)
	}

	useEffect(() => {
		if (!keys) return
		console.log(keys)
		setFormWithFills(
			<div style={{ width: '100%' }}>
				<FormWithValidate onSubmit={onSubmit}>
					{keys &&
						keys.map((key, i) => {
							return (
								<Input
									defaultValue={key.value}
									field={FieldNames.field}
									className='w-100 my-2'
									placeholder={key.name_in_document}
									type='textarea'
									name={key.id}
									key={i}
									validationParams={{
										regex: key.regex,
										errormessage: key.description,
									}}
								/>
							)
						})}
					{keys && <Button type='submit'>Заполнить все документы</Button>}
				</FormWithValidate>
				{userContext?.id == documentPackage?.author.id && (
					<AddTemplateBlock>
						<AddTemplateButton onClick={addTemplate}>
							Изменить поля
						</AddTemplateButton>
					</AddTemplateBlock>
				)}
			</div>
		)
		setFormAction('Заполните поля')
	}, [keys, documentPackage, userContext])

	return (
		<>
			{!authContext && <Navigate to={'/Auth'} />}

			<LoadPageStyled>
				<Worker workerUrl='https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js'>
					<Aside
						documentPackageName={documentPackageName}
						documentName={documentName}
						formAction={formAction}
						FormWithFills={FormWithFills}
						saveTemplateValues={saveTemplateValues}
						onClickCheckBox={onClickCheckBox}
						checkButton={checkButton}
						view={view}
						setView={setView}
					/>

					<LoadBox
						viewer={viewer}
						maxPage={maxPage}
						view={view}
						setView={setView}
						setDocumentF={setDocumentF}
					/>
				</Worker>
				{document && documentPackage && (
					<ModalUpdateTemplate
						documentPackage={documentPackage}
						document={document}
						setModalActive={setModalActive}
						modalActive={modalActive}
						addTemplate={addNewTemplate}
						updateTable={updateTable}
						authorId={documentPackage.author.id}
					/>
				)}
				{documentPackage && (
					<ModalDownloadDocument
						setModalActive={setDownloadModal}
						modalActive={downloadModal}
						documentPackage={documentPackage}
						recordId={recordId}
					/>
				)}
			</LoadPageStyled>
		</>
	)
}

const LoadPageStyled = styled.div`
	padding-top: 3em;
	display: flex;
`

const KeyLabel = styled('span')`
	font-size: 1rem;
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
export default LoadPage

// useEffect(() => {
//     WebViewer(
//       {
//         path: '/lib',
//         preloadWorker: 'office',
//         fullAPI: false,
//         charset: 'UTF-8'
//       },
//       viewer.current
//     ).then((instance) => {
//         const { documentViewer } = instance.Core
//         setInstance(instance)
//         setParentUrl(window.location.href)
//         setDocumentViewer(documentViewer)
//         instance.UI.setLanguage('ru');
//         instance.UI.disableElements([ 'leftPanel', 'leftPanelButton', 'header' ]);
//         instance.UI.loadDocument(url[0], { filename: files[0].name });

//         documentViewer.addEventListener('documentLoaded', async () => {
//             await documentViewer.getDocument().documentCompletePromise();
//             documentViewer.updateView();
//             const doc = documentViewer.getDocument();

//             console.log(doc.filename, url[0])

//             setActionLabel('Отправить для заполнения документа')
//             setAutofillHidden(false)
//             setDocumentName(doc.filename)
//             setKeyValues('Ключи документа:')

//             console.log(doc)
//             doc.getTemplateKeys().then(keys => {
//                 setAutoFills(
//                     <>
//                     {keys.map((key, i) => {
//                         return(
//                             <FeatureInput id={i}>
//                                 <KeyLable>{key}:</KeyLable>
//                                 <Textarea rows={1.4} type='text' name={key}></Textarea>
//                             </FeatureInput>)})}
//                     {keys.length ? (<>
//                      <Input type='submit' value="Заполнить" name='Autofill'></Input> <br/></>) : nope}
//                     </>
//                 )
//             });
//         })

//         // instance.UI.disableFeatures([instance.Feature.Forms])
//         // instance.UI.enableFeatures([instance.Feature.ContentEdit]);
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [url]);

// const autofillDoc = async () => {
//     const elements = autoFillForm.current.elements;
//     const autofillMap = {};
//     for (let i = 0, element; (element = elements[i++]); ) {
//         if (element.type === 'textarea' && element.value.length > 0) {
//             try {
//             const json = JSON.parse(element.value);
//             autofillMap[element.name] = json;
//             } catch (e) {
//             autofillMap[element.name] = element.value.toString();
//             }
//         }
//     }
//     setFillingMap(autofillMap)
//     for (const entry in autofillMap) {
//         if (autofillMap[entry].hasOwnProperty('image_url')) {
//             const path = autofillMap[entry]['image_url'];
//             if (path.substr(0, 4) !== 'http') {
//             autofillMap[entry]['image_url'] = parentUrl + path;
//             }
//         }
//     }
//     for (var k in autofillMap){
//         if (autofillMap.hasOwnProperty(k))
//         {
//             autofillMap[k] = String(autofillMap[k]);
//         }
//     }
//     await documentViewer_S.getDocument().applyTemplateValues(autofillMap);
// }
