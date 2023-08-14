import { IDocumentPackageData } from '@api/documents'
import { Button } from '@ui/Button'
import { useContext } from 'react'
import Table from 'react-bootstrap/esm/Table'

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
						<svg
							onClick={updatePackage}
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							fill='currentColor'
							className='bi bi-pencil'
							viewBox='0 0 16 16'
							style={{ fontSize: '10px', cursor: 'pointer' }}
						>
							<path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
						</svg>
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
													<svg
														xmlns='http://www.w3.org/2000/svg'
														width='16'
														height='16'
														fill='currentColor'
														className='bi bi-search'
														viewBox='0 0 16 16'
													>
														<path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
													</svg>
												</Button>
											</Link>
											{userContext?.id == documentPackage.author.id && (
												<Link>
													<Button onClick={() => updateDocument(document.id)}>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width='16'
															height='16'
															fill='currentColor'
															className='bi bi-search'
															viewBox='0 0 16 16'
														>
															<path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
														</svg>
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
