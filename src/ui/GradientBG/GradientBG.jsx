import styled, { keyframes } from 'styled-components';

export const GradientBG = ({linearGradient, children}) => {
    const bouncing = keyframes`
            0%{background-position:76% 0%}
            50%{background-position:25% 100%}
            100%{background-position:76% 0%}
    `
    
    return (
        <>
        <Gradient bouncing={bouncing} linearGradient={linearGradient}>{children}</Gradient>
        </>
    )
}

// const bouncing = keyframes`
//             0%{background-position:76% 0%}
//             50%{background-position:25% 100%}
//             100%{background-position:76% 0%}
// `

 const Gradient = styled.div`
        height:100%;
        width:100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        background: ${props => props.linearGradient};
        background-size: 800% 800%;

        -webkit-animation: AnimationName 60s ease infinite;
        -moz-animation: AnimationName 60s ease infinite;
        animation: ${props => props.bouncing} 60s ease infinite;
`