// const proxy = process.env.proxy
// 	? process.env.proxy
// 	: 'http://192.168.0.107:5000/api/v1/'

// const toBase64 = (file: File): Promise<string | null | ArrayBuffer> =>
// 	new Promise((resolve, reject) => {
// 		const reader = new FileReader()
// 		reader.readAsDataURL(file)
// 		reader.onload = () => resolve(reader.result)
// 		reader.onerror = error => reject(error)
// 	})

// async function submitFilоes(files: Array<File>) {
// 	if (!files[0]) return 0

// 	const base64text = await toBase64(files[0])

// 	if (typeof base64text !== 'string') return 0

// 	const options = {
// 		method: 'PATCH',
// 		headers: {
// 			'Content-Type': 'application/json;charset=utf-8',
// 		},
// 		body: JSON.stringify({
// 			name: 'fileName',
// 			file: base64text,
// 		}),
// 	}

// 	fetch(proxy + `documents/`, options)
// 		.then(response => response.json())
// 		.then(cons => console.log(cons))
// 	// setFile(response.file)
// 	return 1
// }

// interface IFill {
// 	name: string
// 	value: string
// }
// interface ISubmitChanges {
// 	document_id: number
// 	fills?: IFill
// 	setFile: Function
// }

// function submitChanges({ document_id, fills, setFile }: ISubmitChanges) {
// 	const options = {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json;charset=utf-8',
// 		},
// 		body: fills,
// 	}

// 	fetch(URL + `documents/${document_id}`)
// 		.then(response => response.json())
// 		.then(cons => console.log(cons))
// 	// setFile(response.file)
// }

// export type documentFileType = {
// 	id: number
// 	name: string
// 	dateOfChange: string
// 	photo?: File
// }

// function getAllFiles(): Array<documentFileType> {
// 	fetch(URL + `documents/download`)
// 		.then(response => response.json())
// 		.then(cons => console.log(cons))
// 	// setFiles(response.file)

// 	const date = new Date()
// 	const month = [
// 		'января',
// 		'февраля',
// 		'марта',
// 		'апреля',
// 		'мая',
// 		'июня',
// 		'июля',
// 		'августа',
// 		'сентября',
// 		'октября',
// 		'ноября',
// 		'декабря',
// 	]
// 	const dataa = [
// 		date.getDate(),
// 		month[date.getMonth()],
// 		date.getFullYear() + 'г.',
// 	].join(' ')

// 	return [
// 		{
// 			id: 1,
// 			name: 'text1.docx',
// 			dateOfChange: dataa,
// 		},
// 		{
// 			id: 2,
// 			name: 'text2.docx',
// 			dateOfChange: dataa,
// 		},
// 	]
// }

// interface IGetFile {
// 	document_id: number
// 	setFile: Function
// }

// function getFile({ document_id, setFile }: IGetFile) {
// 	fetch(URL + `documents/${document_id}/download`)
// 		.then(response => response.json())
// 		.then(cons => console.log(cons))
// 	// setFile(response.file)
// }

// export { submitFiles, submitChanges, getAllFiles, getFile }
