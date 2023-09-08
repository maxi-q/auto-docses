import Documents from '@api/documents'
import { FormWithValidate } from '@components/FormWithValidate'
import { Button } from '@ui/index'
import styled from 'styled-components'
import { modalStatusTypeInDocument } from '../../DocumentPage'

interface IModalUpdateDocument {
	documentId?: string
	setActive: React.Dispatch<React.SetStateAction<boolean>>
	setModalStatus: React.Dispatch<
		React.SetStateAction<modalStatusTypeInDocument>
	>
	updateTable: () => void
}

const ModalDeleteDocument = ({
	setActive,
	documentId,
	setModalStatus,
	updateTable,
}: IModalUpdateDocument) => {
	const DocumentsManager = new Documents()

	const onSubmit = () => {
		documentId &&
			DocumentsManager.delete({ id: documentId }).then(_ => {
				setModalStatus('update')
				setActive(false)
				updateTable()
			})
	}
	return (
		<FormWithValidate onSubmit={onSubmit}>
			<Title>Удалить документ безвозвратно?</Title>
			<Button type='submit'>Удалить</Button>
		</FormWithValidate>
	)
}
const Title = styled.h3``

export { ModalDeleteDocument }
