import React, { useState, useEffect, useCallback } from 'react'
import './ToDoView.css'
const ToDoView = () => {
  const [data, setData] = useState([])
  const [newItem, setNewItem] = useState('')

  const fetchToDoItems = useCallback(async () => {
    let toDoData = await fetch('https://jsonplaceholder.typicode.com/todos/')
    let dataToSave = await toDoData.json()
    setData(dataToSave)
  }, [])

  useEffect(() => {
    fetchToDoItems()
    return () => {
      setData([])
    }
  }, [fetchToDoItems])

  const handleChecklist = (item, i) => {
    let updatedData = {
      ...item,
      completed: item.completed ? false : true
    }
    setData([...data.slice(0, i), updatedData, ...data.slice(i + 1)])
  }

  const handleNewItem = ev => {
    ev.preventDefault()
    let updatedData = data
    updatedData.unshift({
      id: Date.now(),
      completed: false,
      title: newItem
    })
    setData(updatedData)
    setNewItem('')
  }

  return (
    <div className='app'>
      <form className='form'>
        <input
          type='text'
          value={newItem}
          placeholder='Enter text'
          onChange={ev => setNewItem(ev.target.value)}
        />
        <button onClick={handleNewItem}>Add</button>
      </form>
      {data.map((item, i) => (
        <div key={item.id} className='list'>
          <p
            className={item.completed ? 'itemDone' : ''}
            onClick={() => handleChecklist(item, i)}
          >
            <input
              id={item.id}
              type='checkbox'
              checked={item.completed}
              onChange={() => handleChecklist(item, i)}
            />
            {item.title}
          </p>
        </div>
      ))}
    </div>
  )
}

export default ToDoView
