'use client'
import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

export default function PhotoPage() {
    const gallery = [
        { title: 'Просторный салон', path: '/gallery/фото_салона.png', id: 1 },
        { title: 'Мультимедиа', path: '/gallery/мультимедиа.png', id: 2 },
        { title: 'USB-зарядка в салоне', path: '/gallery/usb.png', id: 3 },
        { title: 'Высоко-скоростной WI-FI', path: '/gallery/wifi.png', id: 4 },
        { title: 'Вместительный багажник', path: '/gallery/багажник.png', id: 5 },
        { title: 'Современная эргономика', path: '/gallery/эргономика.png', id: 6 }
    ]

    return (
        <div className='photoPage'>
            <Image src="/Line.svg" width={400} height={70} id='line' alt='line' />

            <div className="photoBlock">
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        prevEl: '#arrowLeft',
                        nextEl: '#arrowRight',
                    }}
                    spaceBetween={20}       
                    slidesPerView={1}
                    breakpoints={{
                        600: { slidesPerView: 2 },
                        900: { slidesPerView: 3 },
                        1200: { slidesPerView: 3 },
                    }}
                    loop={true}                 // бесконечная прокрутка
                    className="mySwiper"
                >
                    {gallery.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="slide">
                                <div className="imageWrapper">
                                    <Image
                                        src={item.path}
                                        fill
                                        alt={item.title}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <h2>{item.title}</h2>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className='glass'></div>
            </div>

            <button className='mainButton' id='arrowLeft'>⭠</button>
            <button className='mainButton' id='arrowRight'>⭢</button>
        </div>
    )
}