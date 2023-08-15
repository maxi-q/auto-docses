import {
	IDocumentPackageData,
	IOneDocumentData,
	TemplateInDocumentType,
} from '@api/documents'
import { Modal } from '@ui/index'
import { useEffect, useState } from 'react'
import { AddTemplateBody } from '../components/components/addTemplateBody'
import { CheckTemplateBody } from '../components/components/checkTemplateBody'
import { DeleteTemplateBody } from '../components/components/deleteTemplateBody'
import { UpdateTemplateBody } from '../components/components/updateTemplateBody'

interface IModalUpdateTemplate {
	setModalActive: React.Dispatch<React.SetStateAction<boolean>>
	modalActive: boolean
	documentPackage: IDocumentPackageData
	document: IOneDocumentData
	addTemplate: Function
	updateTable: Function
}

const ModalUpdateTemplate = ({
	setModalActive,
	modalActive,
	document,
	documentPackage,
	addTemplate,
	updateTable,
}: IModalUpdateTemplate) => {
	const [modalStatus, setModalStatus] = useState<
		'check' | 'update' | 'delete' | 'add'
	>('check')

	const [template, setTemplate] = useState<TemplateInDocumentType>()

	const closeModal = () => {
		setModalStatus('check')
		setModalActive(false)
	}
	useEffect(()=> {
		console.log(modalStatus, template)
	}, [template, modalStatus])

	return (
		<Modal setActive={closeModal} active={modalActive}>
			{modalStatus == 'check' ? (
				<CheckTemplateBody
					setModalStatus={setModalStatus}
					setTemplate={setTemplate}
					documentPackage={documentPackage}
					document={document}
					closeModal={closeModal}
				/>
			) : modalStatus == 'update' ? (
				template && (
					<UpdateTemplateBody
						document={document}
						addTemplate={addTemplate}
						setModalStatus={setModalStatus}
						updateTable={updateTable}
						template={template}
					/>
				)
			) : modalStatus == 'delete' ? (
				template && <DeleteTemplateBody
					document={document}
					addTemplate={addTemplate}
					setModalStatus={setModalStatus}
					updateTable={updateTable}
					template={template}
				/>
			) : modalStatus == 'add' ? (
				  (
					<AddTemplateBody
						updateTable={updateTable}
						document={document}
						setModalStatus={setModalStatus}
						addTemplate={addTemplate}
					/>
				)
			) : (
				<>Error</>
			)}
		</Modal>
	)
}

export { ModalUpdateTemplate }
