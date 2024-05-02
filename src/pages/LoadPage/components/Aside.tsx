import { Button } from '@ui/Button'
import styled from 'styled-components'

interface IAside {
	view: boolean
	documentPackageName?: string
	documentName: string
	formAction: string
	FormWithFills: React.ReactNode
	saveTemplateValues?: boolean
	onClickCheckBox?: () => void
	setView: (p: boolean) => void
	checkButton?: React.MutableRefObject<HTMLInputElement | null>
}
export const Aside = (props: IAside) => {
	return (
		<>
			<AsideStyled view={props.view}>
				<Title>{props.documentPackageName}</Title>
				<Title>{props.documentName}</Title>
				<ViewButton onClick={() => props.setView(true)}>
					Просмотреть документ
				</ViewButton>
				<Spacer />
				<StatusLoadKeys id='key-val-title'>{props.formAction}</StatusLoadKeys>

				{props.FormWithFills}
				{props.checkButton && (
					<UpdateValues>
						обновить данные по умолчанию?{' '}
						<input
							type='checkbox'
							ref={props.checkButton}
							checked={props.saveTemplateValues}
							onClick={props.onClickCheckBox}
						/>
					</UpdateValues>
				)}
			</AsideStyled>
		</>
	)
}

const UpdateValues = styled.div`
	margin: 1% 0 0 0;
`
const ViewButton = styled(Button)`
	@media (min-width: 576px) {
		display: none;
	}
`
const AsideStyled = styled('aside')<{ view: boolean }>`
	padding: 16px 16px 0 24px;
	line-height: 25px;
	width: 100%;
	height: 100vh;
	font-size: 0.9em;
	overflow-y: auto;
	display: ${props => (props.view ? 'none' : 'block')};

	@media (min-width: 576px) {
		display: block;
		width: 35%;
	}
`
const Title = styled.h2`
	margin-bottom: 0;
	font-size: 1.3em;
	font-weight: 500;
	color: #373737;
`
const StatusLoadKeys = styled.h1`
	margin-bottom: 15px;
	font-size: 1.3em;
	font-style: normal;
	color: #373737;
	font-size: 1.3em;
	font-style: bold;
	font-weight: 700;
`
const ActionLabel = styled.p`
	margin-bottom: 25px;
`
const Spacer = styled.div`
	height: 18px;
`
const FileStatus = styled('span')`
	margin-left: 10px;
	font-size: 1em;
`

// const CustomFileUpload = styled.div`
//     background-color: white;
//     cursor: pointer;
//     padding: 10px;
//     padding-bottom: 4px;
//     padding-top: 4px;
//     border-radius: 5px;
//     border: 2px solid #4990CD;
//     color: #4990CD;
//     font-size: 1.08em;
//     margin-top: 7px;
// `
