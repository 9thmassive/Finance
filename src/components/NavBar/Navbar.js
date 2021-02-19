import React, { useState } from 'react'
import firebase from 'firebase'
import { Link, NavLink } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import './Navbar.css'
import { IconContext } from 'react-icons'
import Logo from './../leadingPage/dist/images/logo.png'
import { nanoid } from 'nanoid'
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
                                <React.Fragment key={nanoid()}>
                                    <NavLink
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
                                </React.Fragment>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}
export default Navbar
