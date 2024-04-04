import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo } from './Slice';
import './App.css'
import { Button } from 'react-bootstrap';

function App() {




  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const handleAddTodo = () => {

    if (text.trim() !== '') {
      dispatch(addTodo({
        id: Date.now(),
        text,
        completed: false,
      }));
      setText('');
    }
  };

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  };

  const handleToggleTodo = id => {
    dispatch(toggleTodo(id));
  };

  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <div>
      <h1> My Todo List</h1>
      <input className='todoinput'
        type="text" 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="What is the task today ??"
      />
      <Button className='addtodobtn' onClick={handleAddTodo}><b>Add Todo</b></Button>
      <p>Add your List here !!!</p>
      
      <div className='tododiv'>
        {todos.map(todo => (
          <div key={todo.id} style={{backgroundColor: todo.completed ? 'lightgray' : 'transparent', padding: '3px', marginBottom: '3px'}}>
         
             
              <div className='box'>
           <div>  <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => handleToggleTodo(todo.id)} 
              />
                
                 {todo.text}</div>
               <div> <button className='dltbtn' onClick={() => handleDeleteTodo(todo.id)}><b>Delete</b></button></div>
              </div>
            </div>
         
        ))}
      </div>
      
      {completedTodosCount > 0 && <p>Total Complete ToDos: {completedTodosCount}</p>}
    </div>
  );
}

export default App;