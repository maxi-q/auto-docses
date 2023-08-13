import { IDocumentPackageData } from '@api/documents'
import { COLORS } from '@constants/style/COLORS'
import styled from 'styled-components'
import { DocumentPackageRow } from '../components/PackageRow'

interface IDocumentTable {
	documentPackage: Array<IDocumentPackageData>
	setPackageDocuments: Function
	setPackageId: Function
	setModalDocumentActive: Function
	setDocumentId: Function
	setModalUpdateActive: Function
	setModalDeleteActive: Function
	setModalDetailsActive:Function
}
export const DocumentTable = ({
	setModalDocumentActive,
	documentPackage,
	setPackageId,
	setPackageDocuments,
	setDocumentId,
	setModalUpdateActive,
	setModalDeleteActive,
	setModalDetailsActive
}: IDocumentTable) => {

	return (
		<>
			{documentPackage &&
				documentPackage.map(d => {
					return (
						<DocumentPackageRow
							setModalDocumentActive={setModalDocumentActive}
							setPackageId={setPackageId}
							setPackageDocuments={setPackageDocuments}
							documents={d.documents}
							setDocumentId={setDocumentId}
							documentPackage={d}
							setModalUpdateActive={setModalUpdateActive}
							setModalDeleteActive={setModalDeleteActive}
							setModalDetailsActive={setModalDetailsActive}
						/>
					)
				})}
		</>
	)
}

const Row = styled.tr`
	cursor: pointer;
	&:hover {
		background-color: ${COLORS.blue200};
	}
`
