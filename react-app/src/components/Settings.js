import React, { useEffect } from "react";
import { useState } from 'react';
import axios from '../apis/coreApp';



const Settings = ({ session, setSession }) => {

    const [userTheme, setUserTheme] = useState(session.theme);
    const [userIcon, setUserIcon] = useState(session.icon);

    const changeTheme = async (theme, e) => {
        e.preventDefault();
        const reqBody = JSON.stringify({ settings: {theme: theme} })
        const url = "/create/settings/" + session.userId
        const response = await axios.patch(url, reqBody, {
            withCredentials: true,
            headers: {"Content-Type": "application/json",}
        })

        let newSession = session;
        newSession.theme = theme;

        setSession(newSession);
        setUserTheme(theme);
    }

    const changeProfilePic = async (pic, e) => {
        e.preventDefault();

        const reqBody = JSON.stringify({ settings: {icon: pic} })
        const url = "/create/settings/" + session.userId
        const response = await axios.patch(url, reqBody, {
            withCredentials: true,
            headers: {"Content-Type": "application/json",}
        })

        let newSession = session;
        newSession.icon = pic;

        setSession(newSession);
        setUserIcon(pic);
    }

    return (
        <div className="ui container">
            <div className="ui verticle stripe segment">
                <h3>{userTheme}</h3>
                <div className="ui buttons">
                    <button className={ userTheme == "classic" ? "ui button active" : "ui button"} onClick={(e) => changeTheme("classic", e)}>Classic</button>
                    <button className={ userTheme == "dark" ? "ui button active" : "ui button"} onClick={(e) => changeTheme("dark", e)}>Dark</button>
                    <button className={ userTheme == "bright" ? "ui button active" : "ui button"} onClick={(e) => changeTheme("bright", e)}>Bright</button>
                <button className={ userTheme == "monochrome" ? "ui button active" : "ui button"} onClick={(e) => changeTheme("monochrome", e)}>Monochrome</button>
                </div>
            </div>
            <div className="ui verticle stripe segment">
                <img className="ui avatar image" src={session.icon + ".png"}/>
                <div className="ui tiny images">
                    <div className={ userIcon == "alpha" ? "ui basic primary button active" : "ui basic button"} onClick={(e) => changeProfilePic("alpha", e)}><img className="ui image" src="alpha.png"/></div>
                    
                    <div className={ userIcon == "beta" ? "ui basic primary button active" : "ui basic button"} onClick={(e) => changeProfilePic("beta", e)}><img className="ui image" src="beta.png"/></div>
                    <div className={ userIcon == "delta" ? "ui basic primary button active" : "ui basic button"} onClick={(e) => changeProfilePic("delta", e)}><img className="ui image" src="delta.png"/></div>
                    <div className={ userIcon == "epsilon" ? "ui basic primary button active" : "ui basic button"} onClick={(e) => changeProfilePic("epsilon", e)}><img className="ui image" src="epsilon.png"/></div>
                    <div className={ userIcon == "gamma" ? "ui basic primary button active" : "ui basic button"} onClick={(e) => changeProfilePic("gamma", e)}><img className="ui image" src="gamma.png"/></div>
                    <div className={ userIcon == "zeta" ? "ui basic primary button active" : "ui basic button"} onClick={(e) => changeProfilePic("zeta", e)}><img className="ui image" src="zeta.png"/></div>
                </div>
            </div>
        </div>
    )
}

export default Settings