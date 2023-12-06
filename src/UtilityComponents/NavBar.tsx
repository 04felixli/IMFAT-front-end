// This component returns a hamburger drop down menu for mobile screens instead of nav bar 
import React from 'react';
import './Styles/NavBar.css';
import { Link } from 'react-router-dom';

import { useState } from "react";

const NavBar = () => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

    return (
        <div className="nav-bar">
            <a href="/" className='logo'>
                <img src='/images/logo.png' alt="logo" />
            </a>
            <nav>
                <section className="MOBILE-MENU flex lg:hidden">
                    <button
                        className="HAMBURGER-ICON space-y-2"
                        onClick={() => setIsNavOpen((prev) => !prev)}
                    >
                        <span className="menu"></span>
                        <span className="menu"></span>
                        <span className="menu"></span>
                    </button>

                    <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                        <button
                            className="absolute top-0 right-0 px-8 py-8"
                            onClick={() => setIsNavOpen(false)}
                        >
                            <svg
                                className="h-8 w-8 text-gray-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                        <ul className="menu-options">

                            <li className="menu-option">
                                <a href="/Profile">Profile</a>
                            </li>

                            <li className="menu-option">
                                <a href="/History">History</a>
                            </li>

                            <li className="menu-option">
                                <a href="/StartWorkout">StartWorkout</a>
                            </li>

                            <li className="menu-option">
                                <a href="/Schedule">Schedule</a>
                            </li>

                            <li className="menu-option">
                                <a href="/Nutrition">Nutrition</a>
                            </li>

                        </ul>
                    </div>
                </section>

                <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/portfolio">Portfolio</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar; 

