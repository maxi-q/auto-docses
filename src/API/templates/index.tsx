interface ITemplate {
	title: string
	description: string
	nameInDocument: string
}

interface ISingleTemplateByID {
	id: string
}

interface IUpdateTemplate extends ITemplate, ISingleTemplateByID {}

export interface ITemplateData {
	id: string
	title: string
	author: string
	description: string
	is_official: boolean
	name_in_document: string
}

interface ICreateTemplateValue {
	templateId: string
	value: string
}

interface IFindTemplateValue {
	templateId: string
}

interface IUpdateTemplateValue
	extends ICreateTemplateValue,
		IFindTemplateValue {}

export interface ITemplateDataWithValue {
	id: string
	template: ITemplateData
	value: string
}
import { API_URL } from '@constants/API'

class Templates {
	API_URL = API_URL
	private get headers() {
		return new Headers({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('access')}`,
		})
	}

	getList() {
		return fetch(this.API_URL + 'templates/', {
			method: 'GET',
			headers: this.headers,
		})
	}

	create({ title, description, nameInDocument }: ITemplate) {
		return fetch(this.API_URL + 'templates/', {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				title: title,
				description: description,
				name_in_document: nameInDocument,
			}),
		})
	}

	get({ id }: ISingleTemplateByID) {
		return fetch(this.API_URL + `templates/${id}/`, {
			method: 'GET',
			headers: this.headers,
		})
	}

	update({ id, title, description, nameInDocument }: IUpdateTemplate) {
		return fetch(this.API_URL + `templates/${id}/`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				title: title,
				description: description,
				name_in_document: nameInDocument,
			}),
		})
	}

	delete({ id }: ISingleTemplateByID) {
		return fetch(this.API_URL + `templates/${id}/`, {
			method: 'DELETE',
			headers: this.headers,
		})
	}

	getValuesList() {
		return fetch(this.API_URL + 'default_templates_values/', {
			method: 'GET',
			headers: this.headers,
		})
	}

	createValue({ templateId, value }: ICreateTemplateValue) {
		return fetch(this.API_URL + `default_templates_values/`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				template_value: {
					template: templateId,
					value: value,
				},
			}),
		})
	}

	getValueByTemplateId({ templateId }: IFindTemplateValue) {
		return fetch(this.API_URL + `default_templates_values/${templateId}/`, {
			method: 'GET',
			headers: this.headers,
		})
	}

	updateValue({ templateId, value }: IUpdateTemplateValue) {
		return fetch(this.API_URL + `default_templates_values/${templateId}/`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				template_value: {
					template: templateId,
					value: value,
				},
			}),
		})
	}
}

export default Templates
