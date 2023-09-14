import Documents, { IDocumentPackageData } from '@api/documents'
import Records, { IRecordData } from '@api/records'
import { getFullDate, getTime } from '@helpers/date'
import { Button, Modal } from '@ui/index'
import { useEffect, useRef, useState } from 'react'
import { Download } from 'react-bootstrap-icons'
import Table from 'react-bootstrap/esm/Table'
import styled from 'styled-components'

interface IModalUpdateDocument {
	setModalActive: React.Dispatch<React.SetStateAction<boolean>>
	modalActive: boolean
	record: IRecordData
}

type LinkType = {
	url: string
	title: string
}

const ModalDetails = ({
	setModalActive,
	modalActive,
	record,
}: IModalUpdateDocument) => {
	const RecordsManager = new Records()
	const DocumentsManager = new Documents()

	const [links, setLinks] = useState<Array<LinkType>>([])

	const [downloadTagAttr, setDownloadTagAttr] = useState<{
		link: string
		title: string
	}>({ link: '', title: '' })

	useEffect(() => {
		setLinks([])

		DocumentsManager.readPackage({ id: record.documents_package.id }).then(
			res =>
				res.json().then((data: IDocumentPackageData) => {
					setLinks(
						data.documents.map(document => {
							return {
								url: RecordsManager.getDownloadLink({
									record_id: record.id,
									document_id: document.id,
								}),
								title: document.title,
							}
						})
					)
				})
		)
	}, [record])
	const anchor = useRef<HTMLAnchorElement>(null)

	const downloadDocument = async (link: string, title: string) => {
		const documentLink = await RecordsManager.downloadDocument({
			link: link,
		})

		setDownloadTagAttr({ link: documentLink, title: '' })

		// window.open(documentLink, '', `download=${title}.docx`)
	}

	useEffect(() => {
		downloadTagAttr.link && anchor.current?.click()
	}, [downloadTagAttr])

	return (
		<Modal setActive={setModalActive} active={modalActive}>
			<Header>
				<Title>{record.documents_package.title}</Title>
				<div>
					{getFullDate(record.creation_date)} {getTime(record.creation_date)}
				</div>
			</Header>
			<Body>
				{links?.map((link, i) => (
					<DownloadRow key={i}>
						<div>{link.title}:</div>
						<div>
							<Link onClick={() => downloadDocument(link.url, link.title)}>
								<Button>{<Download />}</Button>
							</Link>
							<br />
						</div>
					</DownloadRow>
				))}
				<TemplateTable>
					<tbody>
						{record.templates_values.map(value => (
							<Template>
								{value.template.title}: <Value>{value.value}</Value>
							</Template>
						))}
						{anchor && (
							<a
								href={downloadTagAttr.link}
								download={downloadTagAttr.title}
								ref={anchor}
								style={{ display: 'none' }}
							></a>
						)}
					</tbody>
				</TemplateTable>
			</Body>
		</Modal>
	)
}

export { ModalDetails }

const Header = styled.div`
	height: 50px;
	display: flex;
	flex-direction: column;
`
const Title = styled.div`
	font-size: 22px;
`
const Value = styled.span`
	font-size: 12px;
`
const TemplateTable = styled(Table)`
	width: 360px;
	margin: 45px 0 0 0;
`
const Body = styled.div`
	margin-top: 20px;
	width: 260px;
	width: max-content;
`
const Template = styled.tr`
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`
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
	& > button {
		display: flex;
	}
`
