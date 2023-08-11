import React, { useState, useEffect } from 'react'
import { UilTimes, UilBars, UilSun, UilMoon, UilSignOutAlt, UilCreateDashboard, UilInfoCircle, UilAt } from '@iconscout/react-unicons'
import './sidenav.scss'

export default function SideNav(props) {
    const [open, setOpen] = useState(false)
    const [dark, setDark] = useState(false)

    useEffect(() => {
        // Use window.innerWidth to get the current screen width
        const screenWidth = window.innerWidth;

        // Set the initial state of open based on screen width
        setOpen(screenWidth >= 769);
        setDark(localStorage.getItem('darkMode'))
    }, []);

    const toggleDarkMode = () => {
        if(dark) { // turn off dark mode
            localStorage.removeItem('darkMode')
            setDark(false)
        } else { // turn onn dark mode
            localStorage.setItem('darkMode', true)
            setDark(true)
        }
    }

    return (
        <div className='container'>
            <div className={`sidenav-view ${open ? 'open' : ''} ${dark ? 'dark' : ''}`}>
                <nav className={`${open ? "open" : "closed"}`}>
                    <header>MERN Dev</header>
                    <div className='nav-wrapper'>
                        <a href='/' className='active'>
                            <UilCreateDashboard />
                            <span className="nav-text">Dashboard</span>
                        </a>
                        <a href='/'>
                            <UilInfoCircle />
                            <span>About</span>
                        </a>
                        <a href='/'>
                            <UilAt />
                            <span>Contact</span>
                        </a>
                    </div>
                    <div className='nav-action'>
                        {dark && <UilSun onClick={() => toggleDarkMode()} />}
                        {!dark && <UilMoon onClick={() => toggleDarkMode()} />}
                        <UilSignOutAlt className="sign-off" />
                    </div>
                </nav>
            </div>
            <div className={`sidenav-toggler ${dark ? 'dark' : ''}`}>
                {!open && <UilBars size={14} className="on" onClick={() => setOpen(true)} />}
                {open && <UilTimes size={18} className="off" onClick={() => setOpen(false)} />}
            </div>
            <div className={`content-view ${open ? 'open' : ''} ${dark ? 'dark' : ''}`}>
                {props.children}
            </div>
        </div>
    )
}
