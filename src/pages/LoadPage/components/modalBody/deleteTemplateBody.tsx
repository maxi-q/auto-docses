import Documents, { IOneDocumentData, TemplateInDocumentType } from '@api/documents'
import Templates from '@api/templates'
import { Button } from '@ui/index'
import styled from 'styled-components'
import { modalStatusType } from '../../modules/ModalUpdateTemplate'

interface IDeleteTemplateBody {
	setModalStatus: React.Dispatch<React.SetStateAction<modalStatusType>>
	updateTable: Function
	template: TemplateInDocumentType
	document: IOneDocumentData
}

const DeleteTemplateBody = ({
	setModalStatus,
	updateTable,
	template,
	document
}: IDeleteTemplateBody) => {
	const DocumentManager = new Documents()

	const Delete = () => {
		const templates = document.templates.filter(i => i.id != template.id).map(i => i.id)

		DocumentManager.update({
			id: document.id,
			templates: templates,
		}).then(_res => {
			setModalStatus('check')
			updateTable()
		})
	}
	const Cancel = () => {
		setModalStatus('check')
	}
	return (
		<>
			Удалить Поле?
			<ButtonBlock>
				<Button onClick={() => Delete()}>Да</Button>
				<Button onClick={() => Cancel()}>Нет</Button>
			</ButtonBlock>
		</>
	)
}

export { DeleteTemplateBody }

const ButtonBlock = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`
