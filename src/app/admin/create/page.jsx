'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { createRouteWithTrips } from '../lib/serverActions'


export default function CreateRoutePage() {
    const [city, setCity] = useState([
        { id: 1, name: "Ростов-на-Дону" },
        { id: 2, name: "Волгодонск" },
    ])

    const [selectedDay, setSelectedDay] = useState(null)
    const [timeInput, setTimeInput] = useState('')
    const [schedule, setSchedule] = useState({})

    function replaceCity() {
        setCity(prev => [prev[1], prev[0]])
    }

    function addTime() {
        if (selectedDay && timeInput) {
            setSchedule(prev => ({
                ...prev,
                [selectedDay]: [...(prev[selectedDay] || []), timeInput].sort()
            }))
            setTimeInput('')
        }
    }

    function removeTime(day, timeToRemove) {
        setSchedule(prev => ({
            ...prev,
            [day]: prev[day].filter(time => time !== timeToRemove)
        }))
    }

    function removeDay(day) {
        setSchedule(prev => {
            const newSchedule = { ...prev }
            delete newSchedule[day]
            return newSchedule
        })
    }

    const days = Array.from({ length: 14 }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() + i)
        return d.toISOString().split('T')[0]
    })

    const formatDay = (dateStr) => {
        const d = new Date(dateStr)
        return d.toLocaleDateString('ru-RU', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        })
    }

    const formatDayFull = (dateStr) => {
        const d = new Date(dateStr)
        return d.toLocaleDateString('ru-RU', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        })
    }
    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData()

        formData.append('from', city[0].name)
        formData.append('to', city[1].name)

        formData.append('schedule', JSON.stringify(schedule))

        await createRouteWithTrips(formData)
    }
    return (
        <div className='createPage'>
            <motion.div
                className='formContainer'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className='adminTitle'>Новый маршрут</h1>

                {/* Выбор направления */}
                <div className='routeSelector'>
                    <div className='cityBlock'>
                        <div className='cityCard'>
                            <span className='cityLabel'>Откуда</span>
                            <span className='cityName'>{city[0].name}</span>
                        </div>

                        <button
                            className='swapButton'
                            onClick={replaceCity}
                            aria-label="Поменять направление"
                        >
                            <span>⇄</span>
                        </button>

                        <div className='cityCard'>
                            <span className='cityLabel'>Куда</span>
                            <span className='cityName'>{city[1].name}</span>
                        </div>
                    </div>
                </div>

                {/* Выбор дня - горизонтальный скролл для мобильных */}
                <div className='daysSection'>
                    <p className='adminLabel'>Выберите дату</p>
                    <div className='daysScroll'>
                        {days.map(day => (
                            <button
                                key={day}
                                className={`dayCard ${selectedDay === day ? 'active' : ''}`}
                                onClick={() => setSelectedDay(day)}
                            >
                                <span className='dayName'>
                                    {new Date(day).toLocaleDateString('ru-RU', { weekday: 'short' })}
                                </span>
                                <span className='dayNumber'>
                                    {new Date(day).getDate()}
                                </span>
                                <span className='dayMonth'>
                                    {new Date(day).toLocaleDateString('ru-RU', { month: 'short' })}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Добавление времени */}
                {selectedDay && (
                    <motion.div
                        className='timeSection'
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className='adminLabel'>
                            Время на {formatDayFull(selectedDay)}
                        </p>

                        {/* Удобный выбор времени для мобильных */}
                        <div className='timeInputBlock'>
                            <input
                                type="time"
                                value={timeInput}
                                onChange={(e) => setTimeInput(e.target.value)}
                                className='timeInput'
                                id="timeInput"
                            />
                            <button
                                className='addTimeBtn'
                                onClick={addTime}
                                disabled={!timeInput}
                            >
                                Добавить
                            </button>
                        </div>

                        {/* Быстрые кнопки времени */}
                        <div className='quickTimeButtons'>
                            {['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'].map(time => (
                                <button
                                    key={time}
                                    className='quickTimeBtn'
                                    onClick={() => setTimeInput(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>

                        {/* Список добавленных времён */}
                        {schedule[selectedDay]?.length > 0 && (
                            <div className='addedTimesList'>
                                {schedule[selectedDay].map((time, index) => (
                                    <div key={index} className='addedTimeItem'>
                                        <span>{time}</span>
                                        <button
                                            className='removeTimeBtn'
                                            onClick={() => removeTime(selectedDay, time)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Сводка расписания */}
                {Object.keys(schedule).length > 0 && (
                    <motion.div
                        className='scheduleSummary'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {/* Заголовок с направлением */}
                        <div className='scheduleHeader'>
                            <p className='adminLabel'>Готовое расписание</p>
                            <div className='scheduleRoute'>
                                <span className='scheduleFrom'>{city[0].name}</span>
                                <span className='scheduleArrow'>→</span>
                                <span className='scheduleTo'>{city[1].name}</span>
                            </div>
                        </div>

                        {Object.entries(schedule)
                            .sort(([a], [b]) => a.localeCompare(b))
                            .map(([day, times]) => (
                                times.length > 0 && (
                                    <div key={day} className='scheduleDayCard'>
                                        <div className='scheduleDayHeader'>
                                            <span className='scheduleDayDate'>{formatDayFull(day)}</span>
                                            <button
                                                className='deleteDayBtn'
                                                onClick={() => removeDay(day)}
                                                aria-label="Удалить день"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className='scheduleTimesList'>
                                            {times.sort().map((time, i) => (
                                                <span key={i} className='scheduleTimeBadge'>
                                                    {time.slice(0, 5)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                    </motion.div>
                )}

                {/* Кнопка создания */}
                <motion.button
                    className='mainButton submitButton'
                    whileTap={{ scale: 0.98 }}
                    disabled={Object.keys(schedule).length === 0}
                    onClick={handleSubmit}
                >
                    {Object.keys(schedule).length > 0
                        ? `Создать маршрут (${Object.keys(schedule).length} дн.)`
                        : 'Создать маршрут'}
                </motion.button>
            </motion.div>
        </div>
    )
}