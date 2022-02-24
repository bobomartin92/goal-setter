import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
    
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const naviagte = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        naviagte('/')
    }

  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>GoalSetter</Link>
        </div>
        <ul> 
            {user ? (
                <button className="btn" onClick={handleLogout}>
                    <FaSignOutAlt/> Logout
                </button>
            ) : (<>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt/> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser/> Register
                    </Link>
                </li>
            </>)}
        </ul>
    </header>
  )
}

export default Header