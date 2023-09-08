import Documents, { IDocumentPackageData } from '@api/documents'
import { Modal } from '@ui/Modal'
import { useEffect, useState } from 'react'

import { DetailPackage } from '../../../components/DetailPackage'
import { ModalAddDocument } from '../Document/ModalAddDocument'
import { ModalUpdateDocumentP } from './ModalUpdateDocumentInPackage'
import { ModalUpdatePackage } from './ModalUpdatePackage'

interface IModalDetailsDocumentPackage {
	setModalActive: React.Dispatch<React.SetStateAction<boolean>>
	modalActive: boolean
	packageId?: string
}
export type modalStatusTypeInPackage =
	| 'check'
	| 'documentUpdate'
	| 'packageUpdate'
	| 'addDocuments'

export const ModalDetailsDocumentPackage = ({
	setModalActive,
	modalActive,
	packageId,
}: IModalDetailsDocumentPackage) => {
	const DocumentsSerializer = new Documents()
	const [documentPackage, setDocumentPackage] = useState<IDocumentPackageData>()
	const [modalStatus, setModalStatus] =
		useState<modalStatusTypeInPackage>('check')

	const [documentId, setDocumentId] = useState('')

	useEffect(() => {
		packageId &&
			DocumentsSerializer.readPackage({ id: packageId }).then(res => {
				res.json().then(data => {
					setDocumentPackage(data)
				})
			})
	}, [packageId, modalStatus])

	const closeModal = () => {
		setModalActive(false)
		setModalStatus('check')
	}
	const returnCheck = () => {
		setModalStatus('check')
	}
	const updateTable = () => {
		return
	}
	return (
		<Modal
			setActive={modalStatus == 'check' ? closeModal : returnCheck}
			active={modalActive}
		>
			{modalStatus == 'documentUpdate' ? (
				<ModalUpdateDocumentP
					setIUpdating={setModalStatus}
					documentId={documentId}
				/>
			) : modalStatus == 'check' ? (
				<>
					{documentPackage && (
						<DetailPackage
							documentPackage={documentPackage}
							setIUpdating={setModalStatus}
							setDocumentId={setDocumentId}
						/>
					)}
				</>
			) : modalStatus == 'packageUpdate' ? (
				packageId && (
					<ModalUpdatePackage
						packageId={packageId}
						setIUpdating={setModalStatus}
					/>
				)
			) : modalStatus == 'addDocuments' ? (
				packageId && (
					<ModalAddDocument
						packageDocuments={documentPackage}
						packageId={packageId}
						setIUpdating={setModalStatus}
						updateTable={updateTable}
					/>
				)
			) : (
				<>Error</>
			)}
		</Modal>
	)
}
