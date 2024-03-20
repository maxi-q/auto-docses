import { COLORS } from '@constants/style/COLORS'
import { CSSProperties, ReactNode } from 'react'
import styled from 'styled-components'

interface IComponentWithChild {
	children: ReactNode
	style?: CSSProperties
}

interface ICard extends IComponentWithChild {}
interface ITitle extends IComponentWithChild {}
interface IContent extends IComponentWithChild {}

const ProfileCard = ({ children, style }: ICard) => {
	return <CardBody style={style}>{children}</CardBody>
}
const Header = ({ children }: ITitle) => {
	return (
		<HeaderBox>
			<Title>{children}</Title>
			<Confirm>Подтверждённая учётная запись</Confirm>
		</HeaderBox>
	)
}
const Content = ({ children }: IContent) => {
	return <ContentBox>{children}</ContentBox>
}

const Field = ({ children }: IContent) => {
	return (
		<FieldBox>
			{children} <FieldClickedLink> Изменить </FieldClickedLink>
		</FieldBox>
	)
}
const Link = ({ children }: IContent) => {
	return <ClickedLink>{children}</ClickedLink>
}
ProfileCard.Header = Header
ProfileCard.Content = Content
ProfileCard.Field = Field
ProfileCard.Link = Link

export { ProfileCard }

const CardBody = styled.div`
	width: auto;
	height: auto;
	box-shadow: 0 1px 4px #e3ebfc, 0 24px 48px rgba(230, 235, 245, 0.4);
	border-radius: 12px;
	& > * {
		padding: 24px;
	}
`
const HeaderBox = styled.div`
	border-bottom: 1px solid #e4ecfd;
`
const ContentBox = styled.div`
display: flex;
flex-direction: column;
	gap: 24px;
`
const Title = styled.h5``
const Confirm = styled.span`
	font-size: 1rem;
	line-height: 24px;
	font-weight: 400;
	color: #66727f;
`
const FieldBox = styled.div`
	display: flex;
	flex-direction: row;
`
const ClickedLink = styled.h6`
	cursor: pointer;
	color: ${COLORS.gos_blue};
	font-size: 1rem;
	line-height: 24px;
	font-weight: 400;

`
const FieldClickedLink = styled(ClickedLink)`
	margin: 0 0 0 24px;
`
