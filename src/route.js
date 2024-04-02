import { Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import Regle from './pages/regle/regle';

import './index.css'

function MyRoute() {
    return (
        <div className="Route">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/regle' element={<Regle />} />


            </Routes>
        </div>
    )
}

export default MyRoute