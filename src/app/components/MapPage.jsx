'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MapPage() {
    const [selectedlocation, setSelectedlocation] = useState([
        { location: 'Ростов-на-дону', time: [ '15:30', '20:00'] },
        { location: 'Волгодонск', time: ['12:00', '18:30'] }
    ])

    function changeCity() {
        setSelectedlocation(prev => [
            prev[1],
            prev[0]
        ])
    }
    const [isOpen, setIsOpen] = useState(false)
    const [step, setStep] = useState(1)
    const [selectedDay, setSelectedDay] = useState(null)
    const [selectedSeats, setSelectedSeats] = useState([])
    const [selectedTime, setSelectedTime] = useState(null)

    const [formData, setFormData] = useState({
        fio: '',
        email: '',
        phone: ''
    })

    const [errors, setErrors] = useState({
        fio: '',
        email: '',
        phone: ''
    })

    const days = Array.from({ length: 14 }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() + i)

        return {
            day: d.toLocaleDateString('ru-RU', { weekday: 'short' }),
            date: d.getDate()
        }
    })

    const toggleSeat = (seatId) => {
        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(s => s !== seatId)
                : [...prev, seatId]
        )
    }

    const seats = [
        { id: 'Переднее кресло', src: '/Переднее кресло.png', label: 'Пассажир', top: '42%', left: '51%' },
        { id: 'Заднее левое кресло', src: '/Заднее левое кресло.png', label: 'Заднее левое', top: '63.5%', left: '30%' },
        { id: 'Заднее правое кресло', src: '/Заднее правое кресло.png', label: 'Заднее правое', top: '63.5%', left: '51%' },
    ]

    const validateForm = () => {
        const newErrors = { fio: '', email: '', phone: '' }
        let isValid = true

        if (!formData.fio.trim()) {
            newErrors.fio = 'Введите ФИО'
            isValid = false
        } else if (formData.fio.trim().split(' ').length < 2) {
            newErrors.fio = 'Введите фамилию и имя'
            isValid = false
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.email.trim()) {
            newErrors.email = 'Введите email'
            isValid = false
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Неверный формат email'
            isValid = false
        }

        const phoneRegex = /^(\+7|7|8)?[\s\-]?(\(?\d{3}\)?)[\s\-]?[\d\s\-]{7,}$/
        if (!formData.phone.trim()) {
            newErrors.phone = 'Введите номер телефона'
            isValid = false
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Неверный формат телефона'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handlePayment = async () => {
        if (!validateForm()) return;

        const totalRub = selectedSeats.length * ticketPrice;
        const totalKopecks = totalRub * 100;

        const payload = {
            amount: totalKopecks,
            orderId: `ticket-${Date.now()}`,
            description: `Билет ${selectedlocation[0].location} → ${selectedlocation[1].location}`,
            email: formData.email,
            phone: formData.phone,
            from: selectedlocation[0].location,
            to: selectedlocation[1].location
        };

        try {
            const res = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP error! Status: ${res.status} - ${errorText}`);
            }

            const data = await res.json();

            if (data.success && data.paymentUrl) {
                window.location.href = data.paymentUrl;
            } else {
                alert('Ошибка от сервера: ' + (data.error || 'Неизвестная ошибка'));
            }
        } catch (err) {
            console.error('Ошибка платежа:', err);
            alert('Не удалось создать платёж.\n\nОткрой консоль (F12) и пришли мне всё красное, что там появилось.');
        }
    };
    const ticketPrice = 2500

    return (
        <div className='mapPage'>
            <Image src={`./Line.svg`} width={400} height={70} id='line' alt='line' />
            <div className="mapBlock">
                <div className="mapModule">
                    <p id='Route'>Выберете маршрут</p>
                    <div className='selectRoute'>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={selectedlocation[0].location}
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {selectedlocation[0].location}
                            </motion.p>
                        </AnimatePresence>

                        <button className='mainButton' id='arrow' onClick={changeCity}><span className="arrowIcon">⟷</span></button>

                        <AnimatePresence mode="wait">
                            <motion.p
                                key={selectedlocation[1].location}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {selectedlocation[1].location}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                    <div className="glass"></div>
                </div>
            </div>
            {/* <Image src={'/routeLine.png'} width={100} height={100} id='routeLine' alt='lineRoute' /> */}
            <div className="timeWithBut">

                <div className="timeWithPrice">
                    <Image src={`./time.svg`} width={10} height={10} alt='time' />
                    <p> 2 ч 30 мин • от 2500 ₽ </p>
                </div>
                <button className='mainButton' id='sellTicketBut' onClick={() => setIsOpen(prev => !prev)}>
                    Купить билет →
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="ticketPanel"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {step === 1 && (
                                <div className="step">
                                    <p>Выберите дату</p>
                                    <p>Апрель</p>
                                    <div className="calendarGrid">
                                        {days.map((item, i) => (
                                            <button
                                                key={i}
                                                className={`dayCard ${selectedDay === i ? 'active' : ''}`}
                                                onClick={() => setSelectedDay(i)}
                                            >
                                                <span className="day">{item.day}</span>
                                                <span className="date">{item.date}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        className="mainButton"
                                        id='sell'
                                        onClick={() => setStep(2)}
                                    >
                                        Купить билет →
                                    </button>
                                </div>
                            )}
                            {step === 2 && (
                                <div className="step">
                                    <p>Выберите время отправления из</p>
                                    <p>{selectedlocation[0].location}</p>
                                    {selectedlocation[0].time.map((item,id)=>(
                                        <button key={id} onClick={()=>setSelectedTime(item)} className='mainButton'>
                                            {item}
                                        </button>
                                    ))}
                                    <button
                                        className="mainButton"
                                        id='sell'
                                        onClick={() => setStep(3)}
                                    >
                                        Продолжить →
                                    </button>
                                    <button
                                        className="backButton"
                                        onClick={() => setStep(1)}
                                    >
                                        ← Назад к выбору даты
                                    </button>

                                </div>
                            )
                            }
                            {step === 3 && (
                                <div className="step">
                                    <p>Выберите места</p>

                                    <div className="seatMapContainer">
                                        <Image
                                            src="/Салон.png"
                                            alt="Салон"
                                            width={300}
                                            height={400}
                                            id='SalonW'
                                        />

                                        {seats.map(seat => (
                                            <motion.div
                                                key={seat.id}
                                                className={`seat ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                                                style={{
                                                    position: 'absolute',
                                                    top: seat.top,
                                                    left: seat.left,
                                                    transform: 'translate(-30%, -30%)',
                                                    cursor: 'pointer',
                                                    zIndex: 10,
                                                }}
                                                whileHover={{ scale: 1.1, y: -10, filter: 'brightness(1.15)' }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 45 }}
                                                onClick={() => toggleSeat(seat.id)}
                                            >
                                                <Image
                                                    src={seat.src}
                                                    alt={seat.label}
                                                    id='Seat'
                                                    width={200}
                                                    height={200}
                                                    style={{ filter: selectedSeats.includes(seat.id) ? 'drop-shadow(0 15px 20px rgba(178,143,66,0.6))' : 'none' }}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                        <p>Выбрано: <strong>{selectedSeats.length}</strong> мест</p>
                                    </div>

                                    <button
                                        className="mainButton"
                                        id='sell'
                                        onClick={() => setStep(4)}
                                        disabled={selectedSeats.length === 0}
                                    >
                                        Продолжить →
                                    </button>
                                    <button
                                        className="backButton"
                                        onClick={() => setStep(4)}
                                    >
                                        ← Назад к выбору даты
                                    </button>
                                </div>
                            )}
                            {step === 4 && (
                                <div className="step">
                                    <p>Оформление билета</p>

                                    <div className="bookingSummary">
                                        <h3>Ваш билет</h3>

                                        <div className="summaryInfo">
                                            <div><strong>Маршрут:</strong> {selectedlocation[0].location} → {selectedlocation[1].location}</div>

                                            <div>
                                                <strong>Дата:</strong> {
                                                    selectedDay !== null
                                                        ? `${days[selectedDay].day}, ${days[selectedDay].date} ${new Date().getFullYear()}`
                                                        : 'Не выбрана'
                                                }
                                            </div>

                                            <div><strong>Места:</strong> {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Не выбраны'}</div>
                                            <div>{selec}</div>
                                            <div><strong>Цена:</strong> {selectedSeats.length * ticketPrice} руб.</div>
                                        </div>
                                    </div>

                                    <div className="passengerForm">
                                        <div className="formGroup">
                                            <input
                                                type="text"
                                                name="fio"
                                                placeholder="ФИО полностью"
                                                className="input"
                                                value={formData.fio}
                                                onChange={handleInputChange}
                                            />
                                            {errors.fio && <span className="error">{errors.fio}</span>}
                                        </div>

                                        <div className="formGroup">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                className="input"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                            {errors.email && <span className="error">{errors.email}</span>}
                                        </div>

                                        <div className="formGroup">
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Номер телефона"
                                                className="input"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                            />
                                            {errors.phone && <span className="error">{errors.phone}</span>}
                                        </div>
                                    </div>

                                    <button
                                        className="mainButton"
                                        id='sell'
                                        onClick={handlePayment}
                                    >
                                        Оплатить билет
                                    </button>

                                    <button
                                        className="backButton"
                                        onClick={() => setStep(3)}
                                    >
                                        ← Назад к выбору мест
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}