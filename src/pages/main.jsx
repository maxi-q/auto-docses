import React from "react";
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
  
  body: {
    padding: {
      top:'50px'
    },
    backgroundColor:'transparent',
    minHeight:'500px'
  },
  first_item: {
    backgroundColor:'#6495ED'
  },
  second_item: {
    backgroundColor:'aquamarine'
  },
  gradient: {
    height:"100%",
    width:"100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  waviy: {
    marginTop: "16px"
  }
})

const Main = () => {
    const classees = useStyles()

    return (
       <div className={"d-flex w-75 mx-auto " + classees.body}>
        <div className={" flex-grow-1 bd-highlight " + classees.first_item}>
          <div className={"css-selector " + classees.gradient}>
            <div className={"waviy " + classees.waviy}>
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
        </div>
        <div className={"p-2 w-25 flex-shrink-1 bd-highlight " + classees.second_item}></div>
       </div>
    );
  }

export default Main;