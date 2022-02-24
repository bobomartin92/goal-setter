import { useDispatch } from "react-redux"
import {deleteGoal} from '../features/goals/goalSlice'

const GoalItem = ({goal, handleUpdate}) => {

    const dispatch = useDispatch()

  return (
    <div className="goal">
        <div>{new Date(goal.createdAt).toLocaleString('en-us')}</div>
        <h2 className="update" onClick={() => handleUpdate(goal)}>{goal.text}</h2>
        <button className="close" onClick={() => dispatch(deleteGoal(goal._id))}>x</button>
    </div>
  )
}

export default GoalItem