import Documents, { IDocumentPackageData } from '@api/documents'
import { COLORS } from '@constants/style/COLORS'
import { ChangeDocument } from '@helpers/navigation'
import { Button } from '@ui/Button'
import { RedButton } from '@ui/Button/RedButtion'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

interface IDocumentTable {
	documentPackages: Array<IDocumentPackageData>
	setPackageId: Function
	setModalDetailsActive: Function
	updateTable: () => void
}
export const PackageTable = ({
	documentPackages,
	setPackageId,
	setModalDetailsActive,
	updateTable,
}: IDocumentTable) => {
	const navigate = useNavigate()


	const DocumentsSerializer = new Documents()
	const deletePackage = (id: string) => {
		DocumentsSerializer.deletePackage({ id: id })
		updateTable()
	}
	const OpenRecords = (packageId: string) => {
		navigate(`/Records/${packageId}`)
	}

	return (
		<>
			{documentPackages &&
				documentPackages.map(documentPackage => {
					return (
						<>
							<Row>
								<td>{documentPackage.title}</td>
								<td>{documentPackage.author.username}</td>
								<ButtonsCol>
									<Button
										onClick={() => {
											setModalDetailsActive(true)
											setPackageId(documentPackage.id)
										}}
									>
										Подробности
									</Button>
									<Button
										onClick={() => {
											ChangeDocument(documentPackage.id, 0, navigate)
										}}
									>
										Заполнить
									</Button>
									<Button
										onClick={() => {
											 OpenRecords(documentPackage.id)
										}}
									>
										Данные
									</Button>
									<RedButton
										onClick={() => {
											deletePackage(documentPackage.id)
										}}
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											fill='currentColor'
											className='bi bi-trash3'
											viewBox='0 0 16 16'
										>
											<path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z' />
										</svg>
									</RedButton>
								</ButtonsCol>
							</Row>
						</>
					)
				})}
		</>
	)
}

const ButtonsCol = styled.td`
	display: flex;
	flex-direction: row;
	gap: 10px;
`
const Row = styled.tr`
	cursor: pointer;
	&:hover {
		background-color: ${COLORS.blue200};
	}
`
