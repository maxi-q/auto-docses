import React from "react";
import {createUseStyles} from 'react-jss'
import JumpWord from "../components/JumpWord";

const useStyles = createUseStyles({
  
  body: {
    padding:{
      top:'20px'
    },
    backgroundColor:'transparent',
    minHeight:'500px'
  },
  first_item: {
    backgroundColor:'#6495ED'
  },
  second_item: {
    backgroundColor:'#EE2C2C'
  },
  gradient: {
    height:"100%",
    width:"100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  waviy: {
    marginTop: "16px",
    fontSize: "2.5rem"
  }
})

const Main = () => {
    const classees = useStyles()

    return (
       <div className={"d-flex w-100 mx-auto " + classees.body}>
          <div className={" flex-grow-1 bd-highlight " + classees.first_item}>
            <JumpWord cssSelector={classees.gradient} waviy={classees.waviy}/>
          </div>
          <div className={"p-2 w-25 flex-shrink-1 bd-highlight " + classees.second_item}>
            <div>

            </div>
          </div>
       </div>
    );
  }

export default Main;