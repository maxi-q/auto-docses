import { IDocumentPackageData } from '@api/documents'
import { COLORS } from '@constants/style/COLORS'
import { ChangeDocument } from '@helpers/navigation'
import { Button } from '@ui/Button'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface IDocumentTable {
	documentPackages: Array<IDocumentPackageData>
	setPackageId: Function
	setModalDetailsActive: Function
}
export const DocumentTable = ({
	documentPackages,
	setPackageId,
	setModalDetailsActive,
}: IDocumentTable) => {
	const navigate = useNavigate()
	
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
