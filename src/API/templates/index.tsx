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

class Templates {
	ServerURL = process.env.ServerURL
		? process.env.ServerURL
		: 'http://26.81.229.58:9000/api/v1/'

	private headers = new Headers({
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('access')}`,
	})

	getList() {
		return fetch(this.ServerURL + 'templates/', {
			method: 'GET',
			headers: this.headers,
		})
	}

	create({ title, description, nameInDocument }: ITemplate) {
		return fetch(this.ServerURL + 'templates/', {
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
		return fetch(this.ServerURL + `templates/${id}/`, {
			method: 'GET',
			headers: this.headers,
		})
	}

	update({ id, title, description, nameInDocument }: IUpdateTemplate) {
		return fetch(this.ServerURL + `templates/${id}/`, {
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
		return fetch(this.ServerURL + `templates/${id}/`, {
			method: 'DELETE',
			headers: this.headers,
		})
	}

	getValuesList() {
		return fetch(this.ServerURL + 'default_templates_values/', {
			method: 'GET',
			headers: this.headers,
		})
	}

	createValue({ templateId, value }: ICreateTemplateValue) {
		return fetch(this.ServerURL + `default_templates_values/`, {
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
		return fetch(this.ServerURL + `default_templates_values/${templateId}/`, {
			method: 'GET',
			headers: this.headers,
		})
	}

	updateValue({ templateId, value }: IUpdateTemplateValue) {
		return fetch(this.ServerURL + `default_templates_values/${templateId}/`, {
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
