'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Header() {
    const [showHumburgerMenu, setshowHumburgerMenu] = useState(false)

    const navHamburger = [
        { title: 'Преимущества', path: '#advantages' },
        { title: 'Маршрут', path: '#route' },
        { title: 'Фото', path: '#photo' },
        { title: 'Условия', path: '#conditions' }
    ]
    function handelNav() {
        setshowHumburgerMenu(!showHumburgerMenu)
    }
    useEffect(() => {
        if (showHumburgerMenu) {
            document.body.style.overflowY = 'hidden'
        }
        return () => {
            document.body.style.overflowY = 'auto'
        }
    }, [showHumburgerMenu])
    function handleScroll(e, path) {
        e.preventDefault()

        const id = path.replace('#', '')
        const element = document.getElementById(id)

        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }

        setshowHumburgerMenu(false)
    }
    return (
        <div>
            <header className='header'>
                <Link href={`/`} className='LinkForLogo'>
                    <Image src={`лого.svg`} width={1} height={1} alt='логотип' className='logoIcon' />
                </Link>
                <button id='LinkForBurgerMenu' className={showHumburgerMenu ? 'open' : ''} onClick={handelNav}>
                    <Image src={`/Vector.svg`} width={1} height={1} alt='burgerIcon' className='burgerMenuIcon' />
                </button>
                <nav className={showHumburgerMenu ? 'mobileNav' : ''}>
                    {
                        navHamburger.map((item, id) => {
                            return (
                                <Link key={id} href={item.path} onClick={(e) => handleScroll(e, item.path)}>{item.title} </Link>
                            )
                        })
                    }
                </nav>
            </header>
        </div>
    )
}
