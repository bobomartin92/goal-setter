import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import {FaSignInAlt} from 'react-icons/fa'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, message, isSuccess, navigate, dispatch])

    const handleChange = (e) => {
        setFormData(prev => (
            {...prev, 
            [e.target.name]: e.target.value
            }
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const userData = {email, password}

        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner />
    }

  return (
    <>
        <section className="heading">
            <FaSignInAlt /> Login
            <p>Please complete form to login</p>
        </section>
        <section className="form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input className='form-control' type="email" name="email" id="email" value={email} placeholder='Enter your email' onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <input className='form-control' type="password" name="password" id="password" value={password} placeholder='Enter password' onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type='submit'>Login</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login