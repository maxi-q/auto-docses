import React from 'react';
import styled, { keyframes } from 'styled-components';

export const JumpWord = () => {
    return (
        <>
            <Gradient>
                <Waviy>
                <Waviyspan style={{"--i": 1}}>О</Waviyspan>
                <Waviyspan style={{"--i": 2}}>Х</Waviyspan>
                <Waviyspan style={{"--i": 3}}>Л</Waviyspan>
                <Waviyspan style={{"--i": 4}}>А</Waviyspan>
                <Waviyspan style={{"--i": 5}}>М</Waviyspan>
                <Waviyspan style={{"--i": 6}}>О</Waviyspan>
                <Waviyspan style={{"--i": 7}}>Н</Waviyspan>
                <Waviyspan style={{"--i": 8}}>И</Waviyspan>
                <Waviyspan style={{"--i": 9}}>С</Waviyspan>
                <Waviyspan style={{"--i": 10}}>Т</Waviyspan>
                </Waviy>
            </Gradient>
        </>
    );
};
const bouncing = keyframes`
            0%{background-position:76% 0%}
            50%{background-position:25% 100%}
            100%{background-position:76% 0%}
`

const Gradient = styled.div`
        height:100%;
        width:100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        background: linear-gradient(87deg, #2c4cd0, #f53329, #99479a, #819a4f);
        background-size: 800% 800%;

        -webkit-animation: AnimationName 60s ease infinite;
        -moz-animation: AnimationName 60s ease infinite;
        animation: ${bouncing} 60s ease infinite;

`

const Waviy = styled.div`
    margin-top: 16px;
    font-size: 2.5rem;
    position: relative;
    -webkit-box-reflect: below -20px linear-gradient(transparent, rgba(0,0,0,.2));
    font-size: 60px;

    `
const waviyframes = keyframes`
    0%,40%,100% {
        transform: translateY(0)
    }
    20% {
        transform: translateY(-20px)
    }
`
const Waviyspan = styled.span`
    font-family: 'Alfa Slab One', cursive;
    position: relative;
    display: inline-block;
    color: rgb(215, 200, 200);
    text-transform: uppercase;
    animation: ${waviyframes} 2s infinite;
    animation-delay: calc(.21s * var(--i));
    
`
