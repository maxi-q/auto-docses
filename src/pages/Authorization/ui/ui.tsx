import { COLORS } from '@constants/style/COLORS'
import { Button } from '@ui/index'
import Card from 'react-bootstrap/Card'
import styled from 'styled-components'

const Errors = styled.div`
	color: red;
	display: flex;
	flex-direction: column;
`

const Body = styled.div`
	width: 100wh;
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${COLORS.blue100};
`

const Window = styled(Card)`
	min-width: 450px;
	min-height: 100px;
	width: max-content;
	height: min-content;
	padding: 40px;
	gap: 10px;
`
const RButton = styled(Button)`
	max-width: 150px;
	width: 100%;
	margin-left: auto;
`

export {Errors, Body, Window, RButton}