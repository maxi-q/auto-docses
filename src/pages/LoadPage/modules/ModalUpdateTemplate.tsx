import {
	IDocumentPackageData,
	IOneDocumentData,
	TemplateInDocumentType,
} from '@api/documents'
import { Modal } from '@ui/index'
import { useEffect, useState } from 'react'
import { AddExistingTemplateBody } from '../components/modalBody/addExistingTemplateBody'
import { AddTemplateBody } from '../components/modalBody/addTemplateBody'
import { CheckTemplateBody } from '../components/modalBody/checkTemplateBody'
import { DeleteTemplateBody } from '../components/modalBody/deleteTemplateBody'
import { UpdateTemplateBody } from '../components/modalBody/updateTemplateBody'

interface IModalUpdateTemplate {
	setModalActive: React.Dispatch<React.SetStateAction<boolean>>
	modalActive: boolean
	documentPackage?: IDocumentPackageData
	document: IOneDocumentData
	addTemplate: Function
	updateTable: Function
	authorId: string
}
export type modalStatusType = 'check' | 'update' | 'delete' | 'add' | 'addExist'

const ModalUpdateTemplate = ({
	setModalActive,
	modalActive,
	document,
	documentPackage,
	addTemplate,
	updateTable,
	authorId,
}: IModalUpdateTemplate) => {
	const [modalStatus, setModalStatus] = useState<modalStatusType>('check')

	const [template, setTemplate] = useState<TemplateInDocumentType>()

	const closeModal = () => {
		setModalStatus('check')
		setModalActive(false)
	}
	const returnCheck = () => {
		setModalStatus('check')
	}
	useEffect(() => {
		console.log(modalStatus, template)
	}, [template, modalStatus])

	return (
		<Modal
			setActive={modalStatus == 'check' ? closeModal : returnCheck}
			active={modalActive}
		>
			{modalStatus == 'check' ? (
				<CheckTemplateBody
					setModalStatus={setModalStatus}
					setTemplate={setTemplate}
					documentPackage={documentPackage}
					document={document}
					closeModal={closeModal}
					authorId={authorId}
				/>
			) : modalStatus == 'update' ? (
				template && (
					<UpdateTemplateBody
						setModalStatus={setModalStatus}
						updateTable={updateTable}
						template={template}
					/>
				)
			) : modalStatus == 'delete' ? (
				template && (
					<DeleteTemplateBody
						setModalStatus={setModalStatus}
						updateTable={updateTable}
						template={template}
						document={document}
					/>
				)
			) : modalStatus == 'add' ? (
				<AddTemplateBody
					updateTable={updateTable}
					document={document}
					setModalStatus={setModalStatus}
					addTemplate={addTemplate}
				/>
			) : modalStatus == 'addExist' ? (
				<AddExistingTemplateBody
					updateTable={updateTable}
					document={document}
					setModalStatus={setModalStatus}
				/>
			) : (
				<>Error</>
			)}
		</Modal>
	)
}

export { ModalUpdateTemplate }
