import PhotoPage from "./components/PhotoPage";
import ServicePage from "./components/ServicePage";
import StartPage from "./components/StartPage";
import TimeTrip from "./components/TimeTrip";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
import ConditionsPage from "./components/СonditionsPage";

export default function Home() {
    
    return (
        
        <div>
            <Header></Header>
            <StartPage />
            <div className="ellipse" id="el1"></div>
            <section id="advantages"><ServicePage></ServicePage></section>
            <div className="ellipse" id="el2"></div>
            <section id="route"><TimeTrip></TimeTrip></section>
            <section id="photo"><PhotoPage></PhotoPage></section>
            <section id="conditions"><ConditionsPage></ConditionsPage></section>
            <Footer></Footer>
        </div>
    )
}
