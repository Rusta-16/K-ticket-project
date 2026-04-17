'use client'
import Image from 'next/image'
import React from 'react'

export default function StartPage() {
  function handleScroll(e) {
    e.preventDefault()
    const element = document.getElementById('route')

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <div className='startPage'>
      <div className='infoBlock'>
        <h1>Комфорт<br /> из Ростова в Волгодонск</h1>
        <button className='mainButton' onClick={handleScroll}>
          Купить билет от 2500 ₽
          <div className='backgroundForMainBut'></div>
        </button>
        <p>Бронируйте места в новом Haval M6</p>
      </div>

      <Image src={`/Havalm6-1.png`} width={150} height={150} alt='Hava m6' />
    </div>
  )
}
