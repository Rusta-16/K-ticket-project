import Image from 'next/image'
import React from 'react'

export default function ServicePage() {

    const arrServises = [
        {
            title: 'Страховка',
            description: 'Защита каждого пассажира. Ваша безопасность — наш приоритет',
            path: '/serviceCards/Страховка.svg'
        },
        {
            title: 'Вода',
            description: 'Бесплатная питьевая вода в салоне. Утолите жажду в любой момент',
            path: '/serviceCards/Вода.svg'
        },
        {
            title: 'Чистота',
            description: 'Идеальный порядок в автомобиле. Мы убираем салон перед каждой поездкой',
            path: '/serviceCards/Чистота.svg'
        },
        {
            title: 'WiFi',
            description: 'Высокоскоростной интернет на всем маршруте. ',
            path: '/serviceCards/wifi.svg'
        },
        {
            title: 'Мультимедиа',
            description: 'Фильмы, музыка и развлечения в дороге. Сделайте поездку интереснее',
            path: '/serviceCards/мультимедиа.svg'
        },
        {
            title: 'Комфорт',
            description: 'Индивидуальный подход для каждого пассажира',
            path: '/serviceCards/кресло.svg'
        }

    ]

    return (
        <div className='servicePage'>
            <Image src={`/Line.svg`} width={400} height={50} id='line' alt='line' />
            <div className="servicesTable">
                {
                    arrServises.map((card, id) => {
                        return (
                            <div key={id} className='serviceCard'>
                                <Image src={card.path} width={80} height={80} alt={card.title} />
                                <div className="titleWithDisc">
                                    <h3>{card.title}</h3>
                                    <p>{card.description}</p>
                                </div>  
                                <div className="glass"></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
