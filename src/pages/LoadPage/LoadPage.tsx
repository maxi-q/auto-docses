import WebViewer, { Core, WebViewerInstance } from '@pdftron/webviewer'
import { Worker } from '@react-pdf-viewer/core'
import { createRef, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { FormWithValidate } from '../../components/FormWithValidate'
import { Button, Input } from '../../ui'

import { FieldNames } from '../../helpers/validator'
import { Aside, LoadBox } from './components'

export const LoadPage = () => {
	const viewer = useRef<HTMLElement>()
	const [documentName, setDocumentName] = useState('Имя документа')
	const [formAction, setFormAction] = useState('Ждет файл...')
	const [inputElement, setInputElement] = useState<HTMLInputElement | ''>('')
	const [actionLabel, setActionLabel] = useState('actionLabel')
	const [instance, setInstance] = useState<WebViewerInstance>()
	const [documentViewer_S, setDocumentViewer] = useState<Core.DocumentViewer>()
	const [upload, setUpload] = useState(() => false)
	const [autofillHidden, setAutofillHidden] = useState(true)
	const [parentUrl, setParentUrl] = useState(window.location.href)
	const [FormWithFills, setFormWithFills] = useState<React.ReactNode>(null)
	const [keyValues, setKeyValues] = useState('keyValues')
	const [files, setFiles] = useState<Array<File>>(() => [])
	const [url, setUrl] = useState(() => [''])
	const [keys, setKeys] = useState<Array<string>>(['hello'])

	const autoFillForm = createRef()
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
			const { documentViewer } = instance.Core
			setInstance(instance)
			setParentUrl(window.location.href)
			setDocumentViewer(documentViewer)

			if (!files[0]) return
			if (!url[0]) return

			instance.UI.disableElements([
				'leftPanel',
				'leftPanelButton',
				'header',
				'toolsHeader',
			])
			instance.UI.loadDocument(url[0], { filename: files[0].name })

			documentViewer.addEventListener('documentLoaded', async () => {
				await documentViewer.getDocument().getDocumentCompletePromise()
				documentViewer.updateView()
				const doc = documentViewer.getDocument()

				// console.log(doc.filename, url[0])

				setActionLabel('Отправить для заполнения документа')
				setAutofillHidden(false)
				// setDocumentName(doc.filename)
				setKeyValues('Ключи документа:')
			})
			// instance.UI.disableFeatures([instance.Feature.Forms])
			// instance.UI.enableFeatures([instance.Feature.ContentEdit]);
		})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url])

	useEffect(() => {
		if (files[0]) {
			setUrl([URL.createObjectURL(files[0])])
		} else setUrl([''])
		setUpload(Boolean(files.length))

		//after send to server
		setKeys(['qwe', 'ads'])
	}, [files])

	const firstUpdate = useRef(true)

	const onSubmit = (data: object) => fillFile(data)

	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false
			return
		}

		setFormWithFills(
			<>
				<FormWithValidate onSubmit={onSubmit}>
					{keys.map((key, i) => (
						<FeatureInput key={i}>
							<KeyLabel>{key}:</KeyLabel>
							<Input
								field={FieldNames.field}
								placeholder={''}
								type='textarea'
								name={key}
							/>
						</FeatureInput>
					))}
					{keys.length && <Button type='submit'>Заполнить документ</Button>}
				</FormWithValidate>
			</>
		)
		setFormAction('Заполните поля')
	}, [keys])
	//

	const fillFile = (data: object) => {
		console.log(data)
		fillDocument()
	}
	const fillDocument = () => {
		console.log(formAction)
		return
	}

	const openClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		// e.preventDefault() !
		if (inputElement) {
			inputElement.click()
		}
		// Запускает changeHundler
	}
	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (Boolean(e.target?.files)) {
			setFiles(Array.from(e.target.files || []))
		}
	}
	const submitFiles = (files: Array<File>) => {}
	return (
		<>
			<LoadPageStyled>
				<Worker workerUrl='https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js'>
					<Aside
						documentName={documentName}
						formAction={formAction}
						FormWithFills={FormWithFills}
						fillFile={fillFile}
					/>

					<LoadBox
						setInputElement={setInputElement}
						changeHandler={changeHandler}
						submitFiles={submitFiles}
						openClick={openClick}
						upload={upload}
						viewer={viewer}
						files={files}
						url={url}
					/>
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
