import { IDocumentPackageData } from '@api/documents'
import { useContext } from 'react'
import Table from 'react-bootstrap/esm/Table'
import { UserContext } from '../../../contexts'
import { PackageTable } from './Tables/PackageTable'

interface IPackageData {
	documentPackages: IDocumentPackageData[] | undefined
	setPackageId: React.Dispatch<React.SetStateAction<string | undefined>>
	setModalDetailsActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const PackageData = ({
	documentPackages,
	setPackageId,
	setModalDetailsActive,
}: IPackageData) => {
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
						/>
					)}
				</tbody>
			</Table>
		</>
	)
}
