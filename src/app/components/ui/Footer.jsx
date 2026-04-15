'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    const navHamburger = [
        { title: 'Преимущества', path: '#advantages' },
        { title: 'Маршрут', path: '#route' },
        { title: 'Фото', path: '#photo' },
        { title: 'Условия', path: '#conditions' }
    ]
    function handleScroll(e, path) {
        e.preventDefault()

        const id = path.replace('#', '')
        const element = document.getElementById(id)

        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }
    return (
        <footer className='footer'>
            <div className="logoWithDesc">
                <Link href={`/`} className='LinkForLogo'>
                    <Image src={`лого.svg`} width={120} height={120} alt='логотип' className='logoIcon' />
                </Link>
                <p>«К+билет» — частные поездки c комфортом бизнес-класса и удобным онлайн бронированием </p>
            </div>
            <div className="navigation">
                <nav className='columnNav'>
                    <p>Навигация</p>
                    {navHamburger.map((item, id) => {
                        return (
                            <Link key={id} href={item.path} onClick={(e) => handleScroll(e, item.path)}>{item.title} </Link>
                        )
                    })}
                </nav>
                <nav className='contacts'>
                    <p>Контакты</p>
                    <div>
                        <Image src={`./phone.svg`} width={20} height={20} alt='phone' />
                        <p>89508540417</p>
                    </div>
                    <div>
                        <Image src={`./placeLoc.svg`} width={20} height={20} alt='email' />
                        <p>Ростов-на-Дону</p>
                    </div>
                    <div>
                        <Image src={`./vk (2).svg`} width={20} height={20} alt='vk' />
                        <a>https://vk.ru/club236584175</a>
                    </div>
                </nav>
            </div>
            <Image src={`./Line.svg`} width={400} height={70} alt='line' id='line' />
            <div className="allRightsReserved">
                <p>© 2026 К+билет. <br /> Все права защищены</p>
            </div>
        </footer>
    )
}
