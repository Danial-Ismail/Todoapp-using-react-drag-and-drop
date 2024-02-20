import { useState } from 'react'
import './App.css'
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import Column from './components/columns/Column'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import Input from './components/Input/Input'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "What is python?" },
    { id: 2, title: "How can we become a web developer?" },
    { id: 3, title: "How to become sucessfull?" }
  ])


  const addTask=(title) =>{
    setTasks(tasks=>[...tasks,{id:tasks.length + 1 , title}])
  }

  const getTaskPos = id => tasks.findIndex(task => task.id === id)

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id === over.id) return;

    setTasks(tasks => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks,originalPos,newPos);
    })
  }

const sensors=useSensors(
  useSensor(PointerSensor),
  useSensor(TouchSensor),
  useSensor(KeyboardSensor,{
    coordinateGetter:sortableKeyboardCoordinates
  })
)

  return (
    <div className='App'>
      <h1>Todo Tasks</h1>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} sensors={sensors}>
        <Input onSubmit={addTask} />
        <Column tasks={tasks} />
      </DndContext>
    </div>
  )
}

export default App
