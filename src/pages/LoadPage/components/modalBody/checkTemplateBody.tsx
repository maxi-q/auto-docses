import {
	IDocumentPackageData,
	IOneDocumentData,
	TemplateInDocumentType,
} from '@api/documents'
import { Button } from '@ui/Button'
import { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/esm/Table'
import { FaPen } from 'react-icons/Fa'
import { AiOutlineDelete } from 'react-icons/ai'
import styled from 'styled-components'
import { UserContext } from '../../../../contexts'

interface ICheckTemplateBody {
	document: IOneDocumentData
	documentPackage: IDocumentPackageData
	setTemplate: React.Dispatch<
		React.SetStateAction<TemplateInDocumentType | undefined>
	>
	setModalStatus: React.Dispatch<
		React.SetStateAction<'check' | 'update' | 'delete' | 'add'>
	>
	closeModal: Function
}

const CheckTemplateBody = ({
	document,
	documentPackage,
	setTemplate,
	setModalStatus,
	closeModal,
}: ICheckTemplateBody) => {
	const [templates, setTemplates] = useState<Array<TemplateInDocumentType>>()
	const userContext = useContext(UserContext)

	useEffect(() => {
		const _templates: Array<TemplateInDocumentType> = []
		_templates.push(...document.templates)
		setTemplates(_templates)
	}, [document])

	useEffect(() => {
		console.log(templates)
	}, [templates])

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
					<tbody>
						{templates &&
							templates.map((template, i) => {
								return (
									<DocumentRow>
										<Row>
											<DownloadRow>
												{template.title}
												<div>
													<Link>
														<Button>
															<AiOutlineDelete
																onClick={() => {
																	deleteTemplate(template.id)
																}}
															/>
														</Button>
													</Link>
													{userContext?.id == documentPackage.author.id && (
														<Link>
															<Button>
																<FaPen
																	onClick={() => {
																		changeTemplate(template.id)
																	}}
																/>
															</Button>
														</Link>
													)}
												</div>
											</DownloadRow>
										</Row>
									</DocumentRow>
								)
							})}
					</tbody>
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
