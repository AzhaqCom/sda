import { Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import Regle from './pages/regle/regle';
import Actions from "./pages/actions/actions";
import Jeu from "./pages/jeu/jeu";
import './index.css'
import Test from "./pages/test";
import Test2 from "./pages/test2";
function MyRoute() {
    return (
        <div className="Route">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/regle' element={<Regle />} />
                <Route path='/actions' element={<Actions />} />
                <Route path='/jeu' element={<Jeu />} />
                <Route path='/test' element={<Test />} />
                <Route path='/test2' element={<Test2 />} />

            </Routes>
        </div>
    )
}

export default MyRoute