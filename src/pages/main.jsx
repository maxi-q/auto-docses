import React from "react";
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
  myButton: {
    color: 'green',
    margin: {
      top: 5, 
      right: 0,
      bottom: 0,
      left: '1rem'
    },
    '& span': {
      fontWeight: 'bold' // jss-plugin-camel-case turns this into 'font-weight'
    }
  },
  myLabel: {
    fontStyle: 'italic'
  }
})

const Main = () => {
    const classees = useStyles  

    return (
       <div className="d-flex w-75 mx-auto"  style={all}>
        <div className="p-2 flex-grow-1 bd-highlight">Flex item</div>
        <div className="p-2 w-25 flex-shrink-1 bd-highlight bg-black">Flex item</div>
       </div>
    );
  }

export default Main;