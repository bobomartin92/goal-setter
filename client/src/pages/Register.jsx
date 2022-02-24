import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData

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

        if(password !== password2) {
            toast.error('Password do not match')
        } else {
            const userData = {name, email, password}

            dispatch(register(userData))
        }
    }

    if(isLoading) {
        return <Spinner />
    }

  return (
    <>
        <section className="heading">
            <FaUser /> Register
            <p>Please complete form to register</p>
        </section>
        <section className="form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input className='form-control' type="text" name="name" id="name" value={name} placeholder='Enter your name' onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <input className='form-control' type="email" name="email" id="email" value={email} placeholder='Enter your email' onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <input className='form-control' type="password" name="password" id="password" value={password} placeholder='Enter password' onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <input className='form-control' type="password" name="password2" id="password2" value={password2} placeholder='Comfirm password' onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type='submit'>Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register