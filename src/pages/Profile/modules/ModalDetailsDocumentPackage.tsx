import Documents, { IDocumentPackageData } from '@api/documents'
import { Modal } from '@ui/Modal'
import { useContext, useEffect, useState } from 'react'

import UserContext from '../../../contexts/user-context'

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
	const userContext = useContext(UserContext)
	const [documentPackage, setDocumentPackage] = useState<IDocumentPackageData>()
	const [iUpdating, setIUpdating] = useState<
		'check' | 'documentUpdate' | 'packageUpdate'
	>('check')
	const [documentId, setDocumentId] = useState('')
	const [nope, setNope] = useState(false)

	useEffect(() => {
		packageId &&
			DocumentsSerializer.readPackage({ id: packageId }).then(res => {
				res.json().then(data => {
					console.log(data)
					setDocumentPackage(data)
				})
			})
		console.log(documentPackage)
	}, [packageId, iUpdating])

	return (
		<Modal
			onClick={() => setIUpdating('check')}
			setActive={iUpdating == 'check' ? setModalActive : setNope}
			active={modalActive}
		>
			{iUpdating == 'documentUpdate' ? (
				<ModalUpdateDocument
					setIUpdating={setIUpdating}
					documentId={documentId}
				/>
			) : iUpdating == 'check' ? (
				<>
					{documentPackage && (
						<DetailPackage
							documentPackage={documentPackage}
							setIUpdating={setIUpdating}
							setDocumentId={setDocumentId}
						/>
					)}
				</>
			) : iUpdating == 'packageUpdate' ? (
				packageId && (
					<ModalUpdatePackage
						packageId={packageId}
						setIUpdating={setIUpdating}
					/>
				)
			) : (
				<>Error</>
			)}
		</Modal>
	)
}
