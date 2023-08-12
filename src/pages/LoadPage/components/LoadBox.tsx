import styled from 'styled-components'

import { ButtonCircle } from '@ui/ButtonCircle'
import { useNavigate, useParams } from 'react-router-dom'
import { COLORS } from '../../../constants/style/COLORS'
import { Button } from '../../../ui'

interface ILoadBox {
	viewer: any
	maxPage: number
}

export const LoadBox = ({ viewer, maxPage }: ILoadBox) => {
	const navigate = useNavigate()
	const params = useParams()

	const prodId = params.id
	const nowDocumentIndex = Number(params.index) || 0

	const Minus = () => {
		if (nowDocumentIndex > 0) {
			navigate(`/LoadPage/${prodId}/${nowDocumentIndex - 1}`)
		}
	}
	const Plus = () => {
		if (nowDocumentIndex < maxPage - 1) {
			navigate(`/LoadPage/${prodId}/${nowDocumentIndex + 1}`)
		}
	}
	return (
		<>
			<LoadDivStyled>
				<Title>Предпросмотр</Title>
				<ButtonsBlock>
					<ButtonCircle onClick={Minus}>-</ButtonCircle>
					<NowPage>
						{nowDocumentIndex + 1}/{maxPage}
					</NowPage>
					<ButtonCircle onClick={Plus}>+</ButtonCircle>
				</ButtonsBlock>

				<LoadBoxStyled>
					<Preview>
						<WebViewer ref={viewer}></WebViewer>
					</Preview>
				</LoadBoxStyled>
			</LoadDivStyled>
		</>
	)
}

const Title = styled.h3`
	margin: 0 0 0 15px;
`
const NowPage = styled.h5`
	margin: auto 5px;
`
const LoadDivStyled = styled.div`
	background: ${COLORS.blue100};
	padding: 4px;
	min-height: 100vh;
	border-radius: 12px;
	margin: 0 7%;
	flex: 1;
	display: flex;
	flex-direction: column;
`
const LoadBoxStyled = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`
const NoneInput = styled.input`
	display: none;
`
const ButtonsBlock = styled.div`
	display: flex;
	margin-left: 40px;
	align-items: center;
`
const OpenButton = styled(Button)`
	border-radius: 12px;
	margin-top: 20px;
	width: 140px;
`
const UploadButton = styled(Button)`
	border-radius: 12px;
	margin-left: 10px;
	margin-top: 20px;
	width: 140px;
`
const Preview = styled.div`
	display: flex;
	height: 900px;
	flex-wrap: wrap;
	justify-content: center;
	padding: 0.5rem;
`
const WebViewer = styled.div`
	width: 100%;
`
