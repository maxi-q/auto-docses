import {
	IDocumentPackageData,
	IOneDocumentData,
	TemplateInDocumentType,
} from '@api/documents'
import { Button } from '@ui/Button'
import { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/esm/Table'
import styled from 'styled-components'
import { UserContext } from '../../../../contexts'
import { modalStatusType } from '../../modules/ModalUpdateTemplate'

interface ICheckTemplateBody {
	document: IOneDocumentData
	documentPackage?: IDocumentPackageData
	setTemplate: React.Dispatch<
		React.SetStateAction<TemplateInDocumentType | undefined>
	>
	setModalStatus: React.Dispatch<React.SetStateAction<modalStatusType>>
	closeModal: Function
	authorId: string
}

const CheckTemplateBody = ({
	document,
	documentPackage,
	setTemplate,
	setModalStatus,
	closeModal,
	authorId
}: ICheckTemplateBody) => {
	const [templates, setTemplates] = useState<Array<TemplateInDocumentType>>()
	const userContext = useContext(UserContext)

	useEffect(() => {
		const _templates: Array<TemplateInDocumentType> = []
		_templates.push(...document.templates)
		setTemplates(_templates)
	}, [document])

	const changeTemplate = (templateId: string) => {
		setTemplate(templates?.find(x => x.id == templateId))
		setModalStatus('update')
	}
	const deleteTemplate = (templateId: string) => {
		setTemplate(templates?.find(x => x.id == templateId))
		setModalStatus('delete')
	}
	const addTemplate = () => {
		setModalStatus('add')
	}
	return (
		<>
			<Header>
				<Title>{documentPackage?.title}</Title>
				<div>Автор: {documentPackage?.author.username}</div>
			</Header>
			<Body>
				<Table style={{ width: '360px' }}>
					<div>
						{templates &&
							templates.map((template, i) => {
								return (
									<DocumentRow key={i}>
										<Row>
											<DownloadRow>
												<TitleBlock>{template.title}</TitleBlock>
												<EditCheckButtonBlock>
													<Link>
														<Button
															onClick={() => {
																deleteTemplate(template.id)
															}}
														>
															<svg
																xmlns='http://www.w3.org/2000/svg'
																width='16'
																height='16'
																fill='currentColor'
																className='bi bi-trash'
																viewBox='0 0 16 16'
															>
																<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
																<path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
															</svg>
														</Button>
													</Link>
													{userContext?.id == authorId && (
														<Link>
															<Button
																onClick={() => {
																	changeTemplate(template.id)
																}}
															>
																<svg
																	xmlns='http://www.w3.org/2000/svg'
																	width='16'
																	height='16'
																	fill='currentColor'
																	className='bi bi-pencil'
																	viewBox='0 0 16 16'
																>
																	<path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
																</svg>
															</Button>
														</Link>
													)}
												</EditCheckButtonBlock>
											</DownloadRow>
										</Row>
									</DocumentRow>
								)
							})}
					</div>
				</Table>
				<ButtonBlock>
					<Button onClick={addTemplate}>Добавить шаблон</Button>
					<Button onClick={() => closeModal()}>Сохранить</Button>
				</ButtonBlock>
			</Body>
		</>
	)
}

export { CheckTemplateBody }
const TitleBlock = styled.div`
	width: 230px;
`
const EditCheckButtonBlock = styled.div`
	width: 112px;
`
const ButtonBlock = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`
const DownloadRow = styled.div`
	width: 100%;
	display: flex;
	height: min-content;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`
const Row = styled.div`
	padding-left: '0';
	width: 360px;
`
const Header = styled.div`
	height: 50px;
	display: flex;
	flex-direction: column;
`
const Title = styled.div`
	font-size: 1.2rem;
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
