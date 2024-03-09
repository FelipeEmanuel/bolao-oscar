import {FaSignInAlt, FaSignOutAlt, FaUser, FaListOl} from 'react-icons/fa'
import { AiOutlineUser } from 'react-icons/ai'
import {Link, useNavigate} from 'react-router-dom'
import { logout } from '../../auth/authService'
import './Header.css'

function Header() {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))

    const onLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <>
        {user.role === 'user' ? 
        (<header className='header'>
            <div className='logo'>
                <ul>
                    <li>
                        <Link to='/home'>Palpites</Link>
                    </li>
                    <li>
                        <Link to='/ranking'>Ranking</Link>
                    </li>
                </ul>
            </div>
            <ul>
                <li>
                <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Sair
                </button>
                </li>
            </ul>
        </header>
        ) : (
            <header className='header'>
            <div className='logo'>
                <ul>
                    <li>
                        <Link to='/home'>Palpites</Link>
                    </li>
                    <li>
                        <Link to='/ranking'>Ranking</Link>
                    </li>
                    <li>
                        <Link to='/categorias'>Categorias</Link>
                    </li>
                </ul>
            </div>
            <ul>
                <li>
                    <button className='btn' onClick={onLogout}>
                    <FaSignOutAlt /> Sair
                    </button>
                </li>
            </ul>
            </header>
        )}
            
        </>
    )
}

export default Header