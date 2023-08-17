import { IDocumentPackageData } from '@api/documents'
import { COLORS } from '@constants/style/COLORS'
import { Button } from '@ui/Button'
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
											setModalDetailsActive(true)
											setPackageId(documentPackage.id)
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
