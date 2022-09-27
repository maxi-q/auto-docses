import React from 'react';
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
     
    body: {
        width:'90%',
        maxWidth:'800px',
        minHeight:'30%',
        backgroundColor:'#fccff0',
        display: 'block',
        position: 'fixed',
        left:'50%',
        marginLeft:'-100px',
        textAlign: 'center',
        zIndex:'999'
      }
})
const Welcome = () => {
    const classees = useStyles()
    return (
        <div className={'' + classees.body}>
            werxxx
        </div>
    );
};

export default Welcome;