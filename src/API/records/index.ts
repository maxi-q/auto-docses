interface ISimpleDocumentPackage {
	id: string
	title: string
}

interface ISimpleTemplate {
	id: string
	title: string
}
interface ISimpleTemplateValue {
	template: ISimpleTemplate
	value: string
}

export interface IRecordData {
	id: string
	documents_package: ISimpleDocumentPackage
	templates_values: Array<ISimpleTemplateValue>
	creation_date: string
}

interface ICreateUpdateTemplateValue {
	template: string
	value: string
}

interface ICreateUpdateRecord {
	documents_package: string
	templates_values: Array<ICreateUpdateTemplateValue>
}

export interface IGetSelfRecords {
	id: string
	documents_package: ISimpleDocumentPackage
	templates_values: ISimpleTemplateValue
	value: string
}

interface IGetDownloadLink {
	record_id: string
	document_id: string
}

class Records {
	proxy = process.env.proxy
		? process.env.proxy
		: 'http://26.81.229.58:9000/api/v1/'

	private headers = new Headers({
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('access')}`,
	})

	getList() {
		return fetch(this.proxy + 'records/', {
			method: 'GET',
			headers: this.headers,
		})
	}

	create({ documents_package, templates_values }: ICreateUpdateRecord) {
		return fetch(this.proxy + 'records/', {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				documents_package: documents_package,
				templates_values: templates_values,
			}),
		})
	}

	info({ id }: IGetSelfRecords) {
		return fetch(this.proxy + `records/${id}/`, {
			method: 'POST',
			headers: this.headers,
		})
	}

	async getDownloadLink({ record_id, document_id }: IGetDownloadLink) {
		const blob = await fetch(
			this.proxy + `records/${record_id}/download/${document_id}/`,
			{
				method: 'GET',
				headers: this.headers,
			}
		).then(r => {
			return r.blob()
		})
		return URL.createObjectURL(blob)
	}
}

export default Records
