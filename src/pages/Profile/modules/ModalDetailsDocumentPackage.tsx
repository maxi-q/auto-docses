import Documents, { IDocumentPackageData } from '@api/documents'
import { Modal } from '@ui/Modal'
import { useEffect, useState } from 'react'

import { DetailPackage } from '../components/DetailPackage'
import { ModalUpdateDocument } from './ModalUpdateDocument'
import { ModalUpdatePackage } from './ModalUpdatePackage'

interface IModalDetailsDocumentPackage {
	setModalActive: React.Dispatch<React.SetStateAction<boolean>>
	modalActive: boolean
	packageId?: string
}

export const ModalDetailsDocumentPackage = ({
	setModalActive,
	modalActive,
	packageId,
}: IModalDetailsDocumentPackage) => {
	const DocumentsSerializer = new Documents()
	const [documentPackage, setDocumentPackage] = useState<IDocumentPackageData>()
	const [modalStatus, setModalStatus] = useState<
		'check' | 'documentUpdate' | 'packageUpdate'
	>('check')
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
		setModalActive(true)
		setModalStatus('check')
	}
	const returnCheck = () => {
		setModalStatus('check')
	}
	return (
		<Modal
			setActive={modalStatus == 'check' ? closeModal : returnCheck}
			active={modalActive}
		>
			{modalStatus == 'documentUpdate' ? (
				<ModalUpdateDocument
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
			) : (
				<>Error</>
			)}
		</Modal>
	)
}
