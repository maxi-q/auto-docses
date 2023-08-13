import { IDocumentPackageData } from '@api/documents'
import Records from '@api/records'
import { Modal } from '@ui/index'
import { useEffect, useState } from 'react'

interface IModalAddTemplate {
	setModalActive: React.Dispatch<React.SetStateAction<boolean>>
	modalActive: boolean
	documentPackage: IDocumentPackageData
	recordId: string
}

type LinkType = {
	url: string
	title: string
}

const ModalDownloadDocument = ({
	setModalActive,
	modalActive,
	recordId,
	documentPackage,
}: IModalAddTemplate) => {
	const [links, setLinks] = useState<Array<LinkType>>([])
	const [crutch, setCrutch] = useState<LinkType>()

	const RecordsManager = new Records()

	useEffect(() => {
		crutch && setLinks([...links, crutch])
	}, [crutch])
	
	useEffect(() => {
		if (!recordId) return
		setLinks([])

		for (const document of documentPackage.documents) {
			RecordsManager.getDownloadLink({
				record_id: recordId,
				document_id: document.id,
			}).then(link => {
				setCrutch({
					url: link,
					title: document.title
				})
			})
		}
	}, [recordId])

	return (
		<Modal setActive={setModalActive} active={modalActive}>
			{recordId &&
				links?.map((link, i) => (
					<div key={i}>
						{link.title}: <a href={link.url}> скачать документ</a> <br />
					</div>
				))}
		</Modal>
	)
}

export { ModalDownloadDocument }
