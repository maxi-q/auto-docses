import React from 'react';

const JumpWord = (props) => {

    return (
        <>
            <div className={"css-selector " + props.cssSelector}>
                <div className={"waviy " + props.waviy}>
                <span style={{"--i": 1}}>О</span>
                <span style={{"--i": 2}}>Х</span>
                <span style={{"--i": 3}}>Л</span>
                <span style={{"--i": 4}}>А</span>
                <span style={{"--i": 5}}>М</span>
                <span style={{"--i": 6}}>О</span>
                <span style={{"--i": 7}}>Н</span>
                <span style={{"--i": 8}}>И</span>
                <span style={{"--i": 9}}>С</span>
                <span style={{"--i": 10}}>Т</span>
                </div>
            </div>
        </>
    );
};

export default JumpWord;