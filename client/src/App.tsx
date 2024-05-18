import {Route, Routes} from "react-router-dom"
import Events from "./views/events";
import Registration from "./views/registration";
import Participants from "./views/participants";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Events/>}/>
                <Route path="/registration/:eventId" element={<Registration/>}/>
                <Route path="/participants/:eventId" element={<Participants/>}/>
            </Routes>
        </>
    )
}
export default App
