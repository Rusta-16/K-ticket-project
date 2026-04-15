'use client'
import MapPage from "./components/MapPage";
import PhotoPage from "./components/PhotoPage";
import ServicePage from "./components/ServicePage";
import StartPage from "./components/StartPage";
import ConditionsPage from "./components/СonditionsPage";

export default function Home() {
    
    return (
        <div>
            <StartPage />
            <div className="ellipse" id="el1"></div>
            <section id="advantages"><ServicePage></ServicePage></section>
            <div className="ellipse" id="el2"></div>
            <section id="route"><MapPage></MapPage></section>
            <section id="photo"><PhotoPage></PhotoPage></section>
            <section id="conditions"><ConditionsPage></ConditionsPage></section>
        </div>
    )
}
