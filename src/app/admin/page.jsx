import Link from 'next/link'
import React from 'react'
import AllRoutes from './components/AllRoutes'

export default function page() {
  return (
    <div>
        <header>
            <div className="logo"></div>
            <Link href="/admin/">Все маршруты</Link>
            <Link href="/admin/create">Создать маршрут</Link>
        </header>
        <main>
            <AllRoutes></AllRoutes>
        </main>
    </div>
  )
}