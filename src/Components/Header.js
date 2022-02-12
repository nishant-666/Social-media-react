import React from "react";
import { topMenus } from './TopMenus';
import { useNavigate } from "react-router-dom";

export default function Header(){
    const navigate = useNavigate();
    const logout = () => {
        sessionStorage.removeItem('Token');
        navigate('/')
    }
    return (
        <div className="topbar-main">
            <ul className="top-menu">
                {topMenus.map((menuItem) => {
                    return (
                        <li 
                        onClick={menuItem.name === 'Log Out' ? logout : ''}
                        className="topmenu-items"
                        >{menuItem.name}</li>
                    )
                })}
            </ul>
        </div>
    )
}