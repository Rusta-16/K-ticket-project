import Image from 'next/image'
import { title } from 'process'
import React, { useState } from 'react'

export default function ConditionsPage() {
    const conditions = [{
        id: 1,
        title: "Фиксированное время отправления",
        icon: "./Line/time.svg"
    }, {
        id: 2,
        title: "Чемодан размером L (75-100л)",
        icon: "./Line/bag.svg"
    },
    {
        id: 3,
        title: "Правила поведения во время поездки",
        icon: "./Line/table.svg"
    },
    {
        id: 4,
        title: "Воздержитесь от курения в салоне",
        icon: "./Line/noSmoking.svg"
    },
    {
        id: 5,
        title: "Просим воздержаться от поездки в нетрезвом виде",
        icon: "./Line/alcogolic.svg"
    },
    {
        id: 6,
        title: "При перевозке детей до 12 лет выкупаются все места в салоне.",
        icon: "./Line/baby.svg"
    },
    {
        id: 7,
        title: "Перевозка животных запрещена",
        icon: "./Line/pets.svg"
    }
    ]
    const [showAll, setShowAll] = useState(false)
    return (
        <div className='conditionsPage'>
            <Image src="./Line.svg" width={400} height={70} alt='line' id='line' />

            <div className='textWithIcon' id='t1'>
                <img src={conditions[0].icon} alt="" />
                <h1>{conditions[0].title}</h1>
            </div>

            <svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                <path
                    d="M50,0 C50,150 380,90 390,200"
                    fill="none"
                    stroke="#FFB52E"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                />
            </svg>

            <div className='textWithIcon' id='t2'>
                <h1>{conditions[1].title}</h1>
                <img src={conditions[1].icon} alt="" />
            </div>

            <svg viewBox="0 0 440 190" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                <path
                    d="M390,0 C380,110 70,90 50,190"
                    fill="none"
                    stroke="#FFB52E"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                />
            </svg>

            <div className='textWithIcon' id='t3'>
                <img src={conditions[2].icon} alt="" />
                <h1>{conditions[2].title}</h1>
            </div>

            <svg id={showAll ? 'svgFinal' : null} viewBox="0 0 440 190" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                <path
                    d="M50,0 C50,150 230,90 220,190"
                    fill="none"
                    stroke="#FFB52E"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                />
            </svg>
            <div className={`additional-conditions ${showAll ? 'show' : ''}`}>
                <svg viewBox="0 0 440 190" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <path
                        d="M50,0 C50,150 380,90 390,200"
                        fill="none"
                        stroke="#FFB52E"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                    />
                </svg>
                <div className='textWithIcon' id='t4'>
                    <h1>{conditions[3].title}</h1>
                    <img src={conditions[3].icon} alt="" />
                </div>
                <svg viewBox="0 0 440 190" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <path
                        d="M390,0 C380,110 70,90 50,190"
                        fill="none"
                        stroke="#FFB52E"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                    />
                </svg>
                <div className='textWithIcon' id='t5'>
                    <img src={conditions[4].icon} alt="" />
                    <h1>{conditions[4].title}</h1>
                </div>
                <svg viewBox="0 0 440 190" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <path
                        d="M50,0 C50,150 380,90 390,200"
                        fill="none"
                        stroke="#FFB52E"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                    />
                </svg>
                <div className='textWithIcon' id='t6'>
                    <h1>{conditions[5].title}</h1>
                    <img src={conditions[5].icon} alt="" />
                </div>
                <svg viewBox="0 0 440 190" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <path
                        d="M390,0 C380,110 70,90 50,190"
                        fill="none"
                        stroke="#FFB52E"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                    />
                </svg>
                <div className='textWithIcon' id='t7'>
                    <img src={conditions[6].icon} alt="" />
                    <h1>{conditions[6].title}</h1>
                </div>
            </div>

            <button
                className='mainButton'
                id='m1'
                onClick={() => setShowAll(!showAll)}
            >
                {showAll ? 'Скрыть' : 'Подробнее'}
            </button>

        </div>
    )
}