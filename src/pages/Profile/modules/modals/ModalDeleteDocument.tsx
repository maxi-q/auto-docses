import Documents from '@api/documents'
import { FormWithValidate } from '@components/FormWithValidate'
import { Button, Modal } from '@ui/index'
import styled from 'styled-components'

interface IModalUpdateDocument {
	setModalActive: React.Dispatch<React.SetStateAction<boolean>>
	modalActive: boolean
	documentId?: string
}

const ModalDeleteDocument = ({
	setModalActive,
	modalActive,
	documentId,
}: IModalUpdateDocument) => {
	const DocumentsManager = new Documents()

	const onSubmit = () => {
		documentId && DocumentsManager.delete({ id: documentId })
    .then(res => {
      if(res.status == 204) location.reload()
    })
	}
	return (
		<Modal setActive={setModalActive} active={modalActive}>
			<FormWithValidate onSubmit={onSubmit}>
				<Title>Удалить документ безвозвратно?</Title>
				<Button type='submit'>Удалить</Button>
			</FormWithValidate>
		</Modal>
	)
}
const Title = styled.h3``

export { ModalDeleteDocument }
