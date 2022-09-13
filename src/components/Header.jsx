import React from "react";
import logo from '../images/logo.png';

const Head = () => {
    return(
        <div className="header">
            <div className="header_logo">
                <img className="header_logo_img" src={logo}/>
            </div>
            <div className="header_home"></div>
            <div className="header_about"></div>
        </div>
    )
}

export default Head;