import styled from 'styled-components'

export const Aside = props => {
	return (
		<>
			<AsideStyled>
				<Title>{props.documentPackageName}</Title>
				<Title>{props.documentName}</Title>
				<Spacer />
				<Spacer />
				<StatusLoadKeys id='key-val-title'>{props.formAction}</StatusLoadKeys>
				<ActionLabel>{props.actionLabel}</ActionLabel>

				{props.FormWithFills}
				сохранить изменения?  {' '}<input
						type="checkbox"
						ref={props.checkButton}
						checked={props.saveTemplateValues}
						onClick={props.onClickCheckBox}
					/>
			</AsideStyled>
		</>
	)
}

const FormFills = styled.form`
	max-height: 90vh;
	overflow: auto;
`
const AsideStyled = styled('aside')`
	padding: 16px 16px 0 24px;
	line-height: 25px;
	width: 288px;
	height: 100vh;
	font-size: 0.9em;
	overflow-y: auto;
`
const Title = styled.h2`
	margin-bottom: 0;
	font-size: 1.3em;
	font-weight: 500;
	color: #373737;
`
const StatusLoadKeys = styled.h1`
	margin-bottom: -15px;
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
const SendGroup = styled.div`
	display: ${props => (props.autofillHidden ? 'none' : 'block')};
`
const Spacer = styled.div`
	height: 9px;
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
