import { IDocumentPackageData } from '@api/documents'
import { Button } from '@ui/Button'
import { useContext } from 'react'
import Table from 'react-bootstrap/esm/Table'
import { TbFileSearch } from 'react-icons/tb'
import { FaPen } from '@react-icons/all-files/Fa/FaPen'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { UserContext } from '../../../contexts'

interface IDetailPackage {
	documentPackage: IDocumentPackageData
	setIUpdating: React.Dispatch<
		React.SetStateAction<'check' | 'documentUpdate' | 'packageUpdate'>
	>
	setDocumentId: React.Dispatch<React.SetStateAction<string>>
}
const DetailPackage = ({
	documentPackage,
	setIUpdating,
	setDocumentId,
}: IDetailPackage) => {
	const userContext = useContext(UserContext)
	const navigate = useNavigate()

	const updateDocument = (documentId: string) => {
		setDocumentId(documentId)
		setIUpdating('documentUpdate')
	}
	const updatePackage = () => {
		setIUpdating('packageUpdate')
	}
	const ChangeDocument = (id: string, index: number) => {
		navigate(`/LoadPage/${id}/${index}`)
	}

	return (
		<>
			<Header>
				<Title>
					{documentPackage?.title}{' '}
					{userContext?.id == documentPackage?.author.id && (
						<FaPen
							onClick={updatePackage}
							style={{ fontSize: '10px', cursor: 'pointer' }}
						/>
					)}
				</Title>
				<div>Автор: {documentPackage?.author.username}</div>
			</Header>
			<Body>
				<Table style={{ width: '360px' }}>
					<tbody>
						{documentPackage?.documents.map((document, i) => (
							<DocumentRow>
								<Row>
									<DownloadRow>
										{document.title}
										<div>
											<Link>
												<Button
													onClick={() => ChangeDocument(documentPackage.id, i)}
												>
													<TbFileSearch />
												</Button>
											</Link>
											{userContext?.id == documentPackage.author.id && (
												<Link>
													<Button onClick={() => updateDocument(document.id)}>
														<FaPen />
													</Button>
												</Link>
											)}
										</div>
									</DownloadRow>
								</Row>
							</DocumentRow>
						))}
					</tbody>
				</Table>
			</Body>
		</>
	)
}
export { DetailPackage }

const DownloadRow = styled.div`
	width: 100%;
	display: flex;
	height: min-content;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`
const Row = styled.th`
	padding-left: '0';
	width: 360px;
`
const Header = styled.div`
	height: 50px;
	display: flex;
	flex-direction: column;
`
const Title = styled.div`
	font-size: 22px;
`
const Body = styled.div`
	margin-top: 20px;
	width: 360px;
`
const DocumentRow = styled.div``
const Link = styled.a`
	display: inline-block;
	margin-left: 5px;
	& > button {
		display: flex;
	}
`
