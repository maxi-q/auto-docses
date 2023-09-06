interface IDocumentUserData {
	title: string
	description?: string
	templates: Array<string>
}
interface ICreateList {
	title: string
	documents: Array<string>
}

export interface IDocument extends IDocumentUserData {
	file: File
}

interface ISingleObjectByID {
	id: string
}

interface IUpdateDocument {
	title?: string
	description?: string
	templates?: Array<string>
	id: string
}

export type TemplateInDocumentType = {
	id: string
	title: string
	description: string
	is_official: boolean
	name_in_document: string
}

export interface IOneDocumentData {
	id: string
	title: string
	author: IUser
	description?: string
	file: URL
	templates: Array<TemplateInDocumentType>
	creation_date: string
}
export interface IDocumentPackageData {
	id: string
	title: string
	author: { id: string; username: string; email: string }
	documents: Array<IOneDocumentData>
}
interface IUpdateIDocumentPackage {
	title?: string
	id: string
	documents?: Array<string>
}

interface IGetWithParam { 
	authorId?: string
	search?: string
}

import { IUser } from '@api/user/profileData'
import { API_URL } from '@constants/API'

class Documents {
	API_URL = API_URL

	private get headers() {
		return new Headers({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('access')}`,
		})
	}

	private toBase64 = (file: File): Promise<string | null | ArrayBuffer> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => resolve(reader.result)
			reader.onerror = error => reject(error)
		})

	getList({authorId, search}: IGetWithParam) {
		const param = (authorId ? `author=${authorId}`: '') + (search ? `search=${search}` : '')
		return fetch(this.API_URL + `documents/?${param}`, {
			method: 'GET',
			headers: this.headers,
		})
	}

	getPackagesList({authorId, search}: IGetWithParam) {
		const param = (authorId ? `author=${authorId}`: '') + (search ? `search=${search}` : '')
		return fetch(this.API_URL + `documents_packages/?${param}`, {
			method: 'GET',
			headers: this.headers,
		})
	}

	async create({ file, title, description, templates }: IDocument) {
		const base64textN = await this.toBase64(file)
		if (typeof base64textN != 'string') {
			return new Error('xui')
		}
		let base64text = base64textN

		base64text =
			`data:${file.name.split('.')[0]};docx;base64;` +
				base64text.split(',')[1] || ''

		return fetch(this.API_URL + 'documents/', {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				title: title,
				description: description,
				templates: templates,
				file: base64text,
			}),
		})
	}

	createPackage({ title, documents }: ICreateList) {
		return fetch(this.API_URL + 'documents_packages/', {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				title: title,
				documents: documents,
			}),
		})
	}

	read({ id }: ISingleObjectByID) {
		return fetch(this.API_URL + `documents/${id}/`, {
			method: 'GET',
			headers: this.headers,
		})
	}

	readPackage({ id }: ISingleObjectByID) {
		return fetch(this.API_URL + `documents_packages/${id}/`, {
			method: 'GET',
			headers: this.headers,
		})
	}

	update({ id, title, description, templates }: IUpdateDocument) {
		return fetch(this.API_URL + `documents/${id}/`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				title: title,
				description: description,
				templates: templates,
			}),
		})
	}

	updatePackage({ id, title, documents }: IUpdateIDocumentPackage) {
		return fetch(this.API_URL + `documents_packages/${id}/`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				title: title,
				documents: documents,
			}),
		})
	}

	delete({ id }: ISingleObjectByID) {
		return fetch(this.API_URL + `documents/${id}/`, {
			method: 'DELETE',
			headers: this.headers,
		})
	}
	deletePackage({ id }: ISingleObjectByID) {
		return fetch(this.API_URL + `documents_packages/${id}/`, {
			method: 'DELETE',
			headers: this.headers,
		})
	}
}

export default Documents
