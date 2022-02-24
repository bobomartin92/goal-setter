import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { getGoals, reset, createGoal, updateGoal } from '../features/goals/goalSlice'
import GoalItem from '../components/GoalItem'

function Dashboard() {

  const [text, setText] = useState('')
  const [updateId, setUpdateId] = useState(null)

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const {user} = useSelector(state => state.auth)
  const {goals, isError, isLoading, message} = useSelector(state => state.goals)
  


  const handleUpdate = (goal) => {
    setText(goal.text)
    setUpdateId(goal._id)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if(updateId) {
      dispatch(updateGoal({updateId, text}))
      setText('')
      setUpdateId(false)
    } else {
      dispatch(createGoal({text}))
      setText('')
    }
    
  }

  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if(!user){
      navigate('/login')
    } 

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch, isError, message])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome, {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm setText={setText} text={text} handleSubmit={handleSubmit} update={updateId}/>

      <section className="content">
        <div className="goals">
          {goals.length > 0 ? (
            goals.map(goal => (
              <GoalItem key={goal._id} goal={goal} handleUpdate={handleUpdate} />
            ))) : (
              <h3>You have not set goals yet</h3>
              )}
        </div>
      </section>
    </>
  )
}

export default Dashboard