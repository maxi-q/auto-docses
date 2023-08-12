import { IDocumentPackageData, IOneDocumentData } from '@api/documents'
import { COLORS } from '@constants/style/COLORS'
import { Button } from '@ui/Button'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import userContext from '../../../contexts/user-context'

interface IDocumentPackageRow {
	documents: Array<IOneDocumentData>
	documentPackage: IDocumentPackageData
	setPackageId: Function
	setPackageDocuments: Function
	setModalDocumentActive: Function
	setDocumentId: Function
	setModalUpdateActive: Function
	setModalDeleteActive: Function
}
export const DocumentPackageRow = ({
	documents,
	documentPackage,
	setPackageId,
	setPackageDocuments,
	setModalDocumentActive,
	setDocumentId,
	setModalUpdateActive,
	setModalDeleteActive
}: IDocumentPackageRow) => {
	const [active, setActive] = useState(false)
	const user = useContext(userContext)

	const navigate = useNavigate()

	const ChangeDocument = (id: string, index: number) => {
		navigate(`/LoadPage/${id}/${index}`)
	}

	const addDocument = (id: string, documents: Array<IOneDocumentData>) => {
		setPackageId(id)
		setPackageDocuments(documents.map(x => x.id))
		setModalDocumentActive(true)
	}

	const updateDocument = (id: string) => {
		setDocumentId(id)
		setModalUpdateActive(true)
	}

	const deleteDocument = (id: string) => {
		setDocumentId(id)
		setModalDeleteActive(true)
	}

	return (
		<>
			<Row>
				<td>{documentPackage.title}</td>
				<td>{documentPackage.author.username}</td>
				<td>
					<Button
						onClick={() => {
							setActive(!active)
						}}
					>
						{active ? 'Закрыть' : 'Посмотреть'}
					</Button>
				</td>
				{user.username == documentPackage.author.username && (
					<td>
						<Button
							onClick={() => {
								addDocument(documentPackage.id, documentPackage.documents)
							}}
						>
							добавить документ
						</Button>
					</td>
				)}
			</Row>
			{active &&
				documents.map((document, i) => (
					<Row
						onClick={() => {
							ChangeDocument(documentPackage.id, i)
						}}
					>
						<td>{document.title}</td>
						<td>{document.description}</td>
						<td>
							{document.templates.map(
								template => template.name_in_document + ' '
							)}
						</td>
						<td>
							{user.username == documentPackage.author.username && (
								<td>
									<Button
										onClick={e => {
											e.stopPropagation()
											updateDocument(document.id)
										}}
									>
										изменить
									</Button>
									<Button
										onClick={e => {
											e.stopPropagation()
											deleteDocument(document.id)
										}}
									>
										удалить
									</Button>
								</td>
							)}
						</td>
					</Row>
				))}
		</>
	)
}

const Row = styled.tr`
	cursor: pointer;
	&:hover {
		background-color: ${COLORS.blue200};
	}
`
