import { COLORS } from '../../../../constants/style/COLORS'
import styled from 'styled-components'

export const ClassFromInputs = styled.select`
	display: block;
	background-color: ${COLORS.gray300};

	width: 100%;
	padding: 3px 20px;

	border: 2px solid ${COLORS.gray400};
	border-radius: 5px;
	border-width: 0px;

	font-size: 1.08em;
	cursor: pointer;

	transition: all 0.1s linear;

	color: ${COLORS.gray900};

	&::-webkit-input-placeholder {
		color: ${COLORS.gray900};
	}
	&:focus {
		outline: none;
		padding-bottom: 8px;
		padding-top: 5px;
		background-color: ${COLORS.gray500};
		border-color: ${COLORS.gray500};
	}
	&:hover {
		background-color: ${COLORS.gray800};
		border-color: ${COLORS.gray800};
		color: ${COLORS.gray100};
		&::-webkit-input-placeholder {
			color: ${COLORS.gray100};
		}
	}
`
