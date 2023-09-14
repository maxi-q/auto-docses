import { IDocumentPackageData } from '@api/documents'
import Records from '@api/records'
import { Button, Modal } from '@ui/index'
import { useEffect, useState } from 'react'
import { Download } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

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

	const RecordsManager = new Records()

	useEffect(() => {
		if (!recordId) return
		setLinks([])

		setLinks(
			documentPackage.documents.map(document => {
				return {
					url: RecordsManager.getDownloadLink({
						record_id: recordId,
						document_id: document.id,
					}),
					title: document.title,
				}
			})
		)
	}, [recordId])

	const downloadDocument = async (link: string) => {
		const documentLink = await RecordsManager.downloadDocument({
			link: link,
		})

		window.open(documentLink, '_blank')
	}
	const navigate = useNavigate()
	const closeModal = () => {
		console.log('/Profile')
		setModalActive(false)
		navigate('/Profile')
	}

	return (
		<Modal setActive={closeModal} active={modalActive}>
			<Header>
				<Title>Скачать</Title>
			</Header>
			<Body>
				{recordId &&
					links?.map((link, i) => (
						<DownloadRow key={i}>
							<div>{link.title}</div>
							<div>
								<Link onClick={() => downloadDocument(link.url)}>
									<Button>{<Download />}</Button>
								</Link>
								<br />
							</div>
						</DownloadRow>
					))}
			</Body>
		</Modal>
	)
}

export { ModalDownloadDocument }

const DownloadRow = styled.div`
	width: 100%;
	display: flex;
	height: min-content;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0;
	border-bottom: 1px black solid;
`
const Link = styled.a`
	display: inline-block;
	margin: 0 0 0 10px;
	& > button {
		display: flex;
	}
`
const Header = styled.div`
	height: 30px;
	display: flex;
	flex-direction: column;
`
const Title = styled.div`
	font-size: 22px;
`
const Body = styled.div`
	width: 260px;
	width: max-content;
`