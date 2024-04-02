import './header.css'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <header className="App-header">

            <ul >
                <li>
                    <NavLink className="link-menu" to='/'>Accueil vide</NavLink>
                </li>
                <li>
                    <NavLink className="link-menu" to='/regle'>Règles Spéciales</NavLink>
                </li>
                <li>
                    <NavLink className="link-menu" to='/actions'>Action heroïques</NavLink>
                </li>


            </ul>
        </header>
    );
}

export default Header;