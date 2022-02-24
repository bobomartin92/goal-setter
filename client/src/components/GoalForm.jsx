

const GoalForm = ({text, setText, handleSubmit, update}) => {


  return (
    <section className="form">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="text">Goal</label>
                <input type="text" name="text" id="text" value={text} onChange={e => setText(e.target.value)} />
            </div>
            <div className="form-group">
                <button className="btn btn-block" type="submit">{update ? 'Update' : 'Add'}</button>
            </div>
        </form>
    </section>
  )
}

export default GoalForm