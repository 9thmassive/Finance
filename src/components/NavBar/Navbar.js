//import { IconName } from 'react-icons/io';
//import { IconName } from 'react-icons/fa';
import React, { useState } from 'react'
import firebase from 'firebase'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as GrIcons from 'react-icons/gr'
import { Link, NavLink } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import './Navbar.css'
import { IconContext } from 'react-icons'
import Logo from './../leadingPage_proto/dist/images/logo.png'

function Navbar() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    const [isShown, setIsShown] = useState(false)

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar">
                    <img className="log" src={Logo} />
                    <button
                        className="btn butt"
                        onClick={() => {
                            firebase.auth().signOut()
                            window.location.href = '/'
                        }}
                    >
                        Log Out
                    </button>
                    <Link to="#" className="menu-bars"></Link>
                </div>

                <nav
                    className={!sidebar ? 'nav-menu active' : 'nav-menu'}
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                >
                    <ul className="nav-menu-items ulCl" onClick={showSidebar}>
                        {SidebarData.map((item, index) => {
                            return (
                                <>
                                    <NavLink
                                        key={index}
                                        className={`${item.cName} pos`}
                                        to={item.path}
                                       
                                        activeClassName="activeLink"
                                    >
                                        {item.icon}
                                        {isShown && (
                                            <span className="nav-bar-item">
                                                {item.title}
                                            </span>
                                        )}
                                    </NavLink>
                                </>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
