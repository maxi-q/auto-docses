import { IDocumentPackageData } from '@api/documents'
import { ButtonCircle } from '@ui/ButtonCircle'
import Table from 'react-bootstrap/esm/Table'
import styled from 'styled-components'
import { PackageTable } from './Tables/PackageTable'
import { ModalDetailsDocumentPackage } from './modals/Package/ModalDetailsDocumentPackage'
import { useState } from 'react'

interface IPackageData {
	documentPackages: IDocumentPackageData[] | undefined
	setPackageId: React.Dispatch<React.SetStateAction<string | undefined>>
	addPackage: () => void
	packageId: string | undefined
	updateTable: () => void
}

export const PackageData = ({
	documentPackages,
	setPackageId,
	addPackage,
	packageId,
	updateTable
}: IPackageData) => {
	const [modalDetailsActive, setModalDetailsActive] = useState(false)
	
	return (
		<>
			<Table>
				<thead>
					<tr>
						<th style={{ paddingLeft: '20px' }}>Название</th>
						<th>Автор</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{documentPackages && (
						<PackageTable
							documentPackages={documentPackages}
							setModalDetailsActive={setModalDetailsActive}
							setPackageId={setPackageId}
							updateTable={updateTable}
						/>
					)}
				</tbody>
			</Table>
			<AddPackageBlock>
				<AddPackageButton onClick={addPackage}>+</AddPackageButton>
			</AddPackageBlock>

			<ModalDetailsDocumentPackage
				setModalActive={setModalDetailsActive}
				modalActive={modalDetailsActive}
				packageId={packageId}
			/>
		</>
	)
}

const AddPackageButton = styled(ButtonCircle)`
	width: 80px;
	height: 80px;
	font-size: 2rem;
	margin: 0 8px 0 0;
	position: absolute;
	bottom: 20px;
	right: 20px;
`
const AddPackageBlock = styled.div`
	display: absolute;
	down: 20px;
	right: 20px;
	margin: 1% 0 0 0;
`
