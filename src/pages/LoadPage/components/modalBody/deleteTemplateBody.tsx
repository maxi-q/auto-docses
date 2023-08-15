import { IOneDocumentData, TemplateInDocumentType } from '@api/documents'
import Templates from '@api/templates'
import { Button } from '@ui/index'
import styled from 'styled-components'

interface IDeleteTemplateBody {
	setModalStatus: React.Dispatch<
		React.SetStateAction<'check' | 'update' | 'delete' | 'add'>
	>
	updateTable: Function
	template: TemplateInDocumentType
}

const DeleteTemplateBody = ({
	setModalStatus,
	updateTable,
	template,
}: IDeleteTemplateBody) => {
	const TemplatesManager = new Templates()

	const Delete = () => {
		TemplatesManager.delete({
			id: template.id,
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
